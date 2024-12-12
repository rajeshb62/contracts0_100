use dep::aztec::prelude::{AztecAddress, PrivateContext, PrivateSet, NoteGetterOptions};
use crate::NewAddressNote::NewAddressNote;
use dep::value_note::{value_note::{ValueNote, VALUE_NOTE_LEN}};

global ZERO_ADDRESS: AztecAddress = AztecAddress::from_field(
        0x0000000000000000000000000000000000000000000000000000000000000000,
    );
    
pub fn membership_check(location: PrivateSet<NewAddressNote, &mut PrivateContext>) -> pub bool {
    let options = NoteGetterOptions::new();
    let member_note = location.get_notes(options);
    let mut member_array: [AztecAddress; 3] = [ZERO_ADDRESS; 3];
    for i in 0..3 {
        let note = member_note.get_unchecked(i);
        let address: AztecAddress = note.address;
        member_array[i] = address;
        assert(address != ZERO_ADDRESS, "Sender is not in the group");
    }
    true
}

pub fn get_balance(location: PrivateSet<ValueNote, &mut PrivateContext>) -> pub u64 {
    let options = NoteGetterOptions::new();
    let balance_notes: BoundedVec<ValueNote, 16> = location.get_notes(options);
    
    let mut total_balance = 0 as Field;
    for i in 0..balance_notes.max_len() {
        if i < balance_notes.len() {
            let note = balance_notes.get_unchecked(i);
            total_balance += note.value;
        }
    }
    total_balance as u64
}
