mod NewAddressNote;
mod helpers;
use dep::aztec::macros::aztec;

#[aztec]
contract PrivateGroups {
    use aztec::{
        prelude::{Map, AztecAddress, PrivateImmutable, PrivateSet},
        encrypted_logs::encrypted_note_emission::encode_and_encrypt_note,
        keys::getters::get_public_keys,
        macros::{
            storage::storage, events::event,
            functions::{public, initializer, private, internal, view},
        },
    };
    use aztec::note::note_getter::NoteGetterOptions;
    use crate::NewAddressNote::NewAddressNote;
    use crate::helpers::{get_balance, membership_check};
    use value_note::{utils::{increment, decrement}, value_note::ValueNote};
    use std::hash::poseidon2;
    global ZERO_ADDRESS: AztecAddress = AztecAddress::from_field(
        0x0000000000000000000000000000000000000000000000000000000000000000,
    );
    //Contract Storage
    // - `admin`: The admin who creates and manages the group
    // - `group_members`: A map of group members, each with a private set of other group members so they can see all members
    // - `group_balances_credit`: A map of balances owed to the creditor, stored with a unique key for each creditor and debtor pair
    // - `group_balances_debt`: A map of balances owed by the debtor, stored with a unique key for each debtor and creditor pair
    #[storage]
    struct Storage<Context> {
        admin: PrivateImmutable<NewAddressNote, Context>,
        group_members: Map<AztecAddress, PrivateSet<NewAddressNote, Context>, Context>,
        group_balances_credit: Map<Field, PrivateSet<ValueNote, Context>, Context>,
        group_balances_debt: Map<Field, PrivateSet<ValueNote, Context>, Context>,
    }
    // Contract Constructor:
    // - The admin creates the group and initializes group members.
    // - Each group member is added to the private set, allowing them to see other members.
    // - This operation can be expensive due to encryption and note handling for each member.
    #[private]
    #[initializer]
    fn constructor(admin: AztecAddress, group_members: [AztecAddress; 3]) {
        //setting the admin address note
        let admin_keys = get_public_keys(admin);
        let mut admin_address_note = NewAddressNote::new(admin, admin_keys.npk_m.hash());
        storage.admin.initialize(&mut admin_address_note).emit(encode_and_encrypt_note(
            &mut context,
            admin_keys.ovpk_m,
            admin_keys.ivpk_m,
            admin,
        ));
        // this is for adding members to the private set, so they can see the other members, going to be expensive
        for i in 0..3 {
            let member = group_members[i as u32];
            if (member != ZERO_ADDRESS) {
                let member_keys = get_public_keys(member);
                for i in 0..3 {
                    let member_add = group_members[i as u32];
                    let mut memberNote = NewAddressNote::new(member_add, member_keys.npk_m.hash());
                    storage.group_members.at(member).insert(&mut memberNote).emit(
                        encode_and_encrypt_note(
                            &mut context,
                            admin_keys.ovpk_m,
                            member_keys.ivpk_m,
                            member,
                        ),
                    );
                }
            }
        }
    }
    // Retrieves the admin's address.
    // for testing purposes, only the admin can read this.
    #[private]
    #[view]
    fn get_admin() -> pub AztecAddress {
        let admin_note = storage.admin.get_note();
        admin_note.address
    }
    //For each group member, we have a private set of members so that they can see all of the members
    #[private]
    #[view]
    fn get_group_members(member: AztecAddress) -> [AztecAddress; 3] {
        let mut options = NoteGetterOptions::new();
        let member_note = storage.group_members.at(member).get_notes(options);
        let mut member_array: [AztecAddress; 3] = [ZERO_ADDRESS; 3];
        //if you call this and u are not part of the group, it will return the zero address
        for i in 0..3 {
            let note = member_note.get_unchecked(i);
            let address: AztecAddress = note.address;
            member_array[i] = address;
        }
        member_array
    }
    //Setting the balance for the creditor and debtor
    #[private]
    fn set_balance(creditor: AztecAddress, debtor: AztecAddress, amount: Field) {
        //This is just an assertion that the sender is part of the group.
        let sender = context.msg_sender();
        let location = storage.group_members.at(sender);
        assert(membership_check(location), "Sender is not in the group");
        //notes for the creditor
        let hash_inputs_credit = [creditor.to_field(), debtor.to_field()];
        let key_credit = poseidon2::Poseidon2::hash(hash_inputs_credit, 2);
        let loc_credit = storage.group_balances_credit.at(key_credit);
        increment(loc_credit, amount, creditor, debtor);
        // notes for the debtor
        let hash_inputs_debt = [debtor.to_field(), creditor.to_field()];
        let key_debt = poseidon2::Poseidon2::hash(hash_inputs_debt, 2);
        let loc_debt = storage.group_balances_debt.at(key_debt);
        increment(loc_debt, amount, debtor, creditor);
    }
    //can have a timestamp here for when the payment is made.
    #[private]
    fn make_payment(debtor: AztecAddress, creditor: AztecAddress, amount: Field) {
        let sender = context.msg_sender();
        let location = storage.group_members.at(sender);
        assert(membership_check(location), "Sender is not in the group");
        //notes for the creditor
        let hash_inputs_credit = [creditor.to_field(), debtor.to_field()];
        let key_credit = poseidon2::Poseidon2::hash(hash_inputs_credit, 2);
        let loc_credit = storage.group_balances_credit.at(key_credit);
        decrement(loc_credit, amount, creditor, debtor);
        // notes for the debtor
        let hash_inputs_debt = [debtor.to_field(), creditor.to_field()];
        let key_debt = poseidon2::Poseidon2::hash(hash_inputs_debt, 2);
        let loc_debt = storage.group_balances_debt.at(key_debt);
        decrement(loc_debt, amount, debtor, creditor);
    }
    #[private]
    fn setup_group_payments(creditor: AztecAddress, debtors: [AztecAddress; 2], amount: Field) {
        let sender = context.msg_sender();
        let location = storage.group_members.at(sender);
        assert(membership_check(location), "Sender is not in the group");
        //increase the credit for the creditor with each member
        let shared_amount: u32 = amount as u32 / (debtors.len() + 1);
        for i in 0..2 {
            let debtor = debtors[i];
            let hash_inputs_credit = [creditor.to_field(), debtor.to_field()];
            let key_credit = poseidon2::Poseidon2::hash(hash_inputs_credit, 2);
            let loc_credit = storage.group_balances_credit.at(key_credit);
            increment(loc_credit, shared_amount.to_field(), creditor, debtor);
        }
        //increase the debt for each member with the creditor
        for i in 0..2 {
            let debtor = debtors[i];
            let hash_inputs_debt = [debtor.to_field(), creditor.to_field()];
            let key_debt = poseidon2::Poseidon2::hash(hash_inputs_debt, 2);
            let loc_debt = storage.group_balances_debt.at(key_debt);
            increment(loc_debt, shared_amount.to_field(), debtor, creditor);
        }
    }
    #[private]
    #[view]
    fn read_balance_credit(creditor: AztecAddress, debtor: AztecAddress) -> u64 {
        let hash_inputs_credit = [creditor.to_field(), debtor.to_field()];
        let key_credit = poseidon2::Poseidon2::hash(hash_inputs_credit, 2);
        let location = storage.group_balances_credit.at(key_credit);
        let balance = get_balance(location);
        balance as u64
    }
    #[private]
    #[view]
    fn read_balance_debt(debtor: AztecAddress, creditor: AztecAddress) -> u64 {
        let hash_inputs_debt = [debtor.to_field(), creditor.to_field()];
        let key_debt = poseidon2::Poseidon2::hash(hash_inputs_debt, 2);
        let location = storage.group_balances_debt.at(key_debt);
        let balance = get_balance(location);
        balance as u64
    }
  
    #[private]
    #[view]
    fn read_total_balance(creditor: AztecAddress, debtor: AztecAddress) -> i64 {
        //going to have to hand type this, could not call the other private functions
        //keys to check in storage
        let hash_inputs_credit = [creditor.to_field(), debtor.to_field()];
        let key = poseidon2::Poseidon2::hash(hash_inputs_credit, 2);
        let location_credit = storage.group_balances_credit.at(key);
        let location_debt = storage.group_balances_debt.at(key);
        let credit = get_balance(location_credit);
        let debt = get_balance(location_debt);
        let credit_int = credit as i64;
        let debt_int = debt as i64;
        let total_balance = credit_int - debt_int;
        total_balance
    }
}