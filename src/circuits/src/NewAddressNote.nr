use dep::aztec::{
    protocol_types::{
        address::AztecAddress,
        traits::{Serialize, Deserialize},
        constants::GENERATOR_INDEX__NOTE_NULLIFIER,
        hash::poseidon2_hash_with_separator
    },
    macros::notes::note,
    note::{note_header::NoteHeader, note_interface::NullifiableNote, utils::compute_note_hash_for_nullify},
    oracle::random::random,
    keys::getters::get_nsk_app,
    context::PrivateContext
};

// Custom Address Note implementation, as the default one lacks serialization and the Eq trait.
#[note]
#[derive(Serialize)]    // Adds serialization support for the struct.
#[derive(Deserialize)]  // Adds deserialization support for the struct.
struct NewAddressNote {
    address: AztecAddress, // The AztecAddress for the note.
    // The nullifying public key hash is used with the nsk_app to ensure that the note can be privately spent.
    randomness: Field,
    npk_m_hash: Field,  
}

impl NullifiableNote for NewAddressNote {
    /**
     * Computes the nullifier for the note using the provided private context.
     * This is necessary to ensure that the note can be nullified (spent) privately.
     *
     * @param context - A mutable reference to the private context, used to retrieve the note's nullifying secret key.
     * @param note_hash_for_nullify - The precomputed note hash used as part of the nullifier.
     * @returns A `Field` value representing the nullifier for this note.
     */
    fn compute_nullifier(self, context: &mut PrivateContext, note_hash_for_nullify: Field) -> Field {
        // Retrieves the nullifying secret key from the context.
        let secret = context.request_nsk_app(self.npk_m_hash);
        
        // Uses Poseidon hashing to compute the nullifier, incorporating the note hash and the secret.
        poseidon2_hash_with_separator(
            [
                note_hash_for_nullify,
                secret
            ],
            GENERATOR_INDEX__NOTE_NULLIFIER as Field
        )
    }
    /**
     * Computes the nullifier for the note without needing the context.
     * This is an unconstrained function that allows generating the nullifier for use in tests or specific use cases
     * where the context is not required.
     *
     * @returns Field value representing the nullifier for this note, computed without context.
     */
    unconstrained fn compute_nullifier_without_context(self) -> Field {
        // Computes the note hash for nullification.
        let note_hash_for_nullify = compute_note_hash_for_nullify(self);
        // Retrieves the nullifying secret key directly without context.
        let secret = get_nsk_app(self.npk_m_hash);
        
        // Uses Poseidon hashing to compute the nullifier, incorporating the note hash and the secret.
        poseidon2_hash_with_separator(
            [
                note_hash_for_nullify,
                secret
            ],
            GENERATOR_INDEX__NOTE_NULLIFIER as Field
        )
    }
}

impl NewAddressNote {
    /**
     * Creates a new instance of `NewAddressNote` with the provided Aztec address and nullifying public key hash.
     * 
     * @param address - The AztecAddress associated with the note.
     * @param npk_m_hash - The nullifying public key hash, used to ensure private spending.
     * @returns A new `NewAddressNote` instance.
     */
    pub fn new(address: AztecAddress, npk_m_hash: Field) -> Self {
        // Initializes an empty note header (can be extended with more fields if necessary).
        let randomness = unsafe { random() };
        let header = NoteHeader::empty();
        NewAddressNote { address, randomness, npk_m_hash, header }
    }
}

impl Eq for NewAddressNote {
    /**
     * Custom equality implementation for `NewAddressNote`.
     * Compares the address and npk_m_hash fields to determine if two notes are equal.
     *
     * @param other - The other note to compare with.
     * @returns `true` if both notes are equal, `false` otherwise.
     */
    fn eq(self, other: Self) -> bool {
        (self.address == other.address) & (self.npk_m_hash == other.npk_m_hash) & (self.randomness == other.randomness)
    }
}