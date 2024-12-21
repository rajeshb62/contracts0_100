import { type StatsEventName } from './stats.js';
/** How a metric is grouped in benchmarks: by block size, by length of chain processed, or by circuit name. */
export type MetricGroupBy = 'threads' | 'block-size' | 'chain-length' | 'protocol-circuit-name' | 'app-circuit-name' | 'classes-registered' | 'leaf-count' | 'fee-payment-method';
/** Definition of a metric to track in benchmarks. */
export interface Metric {
    /** Identifier. */
    name: string;
    /** What dimension this metric is grouped by. */
    groupBy: MetricGroupBy;
    /** Description */
    description: string;
    /** Events used for generating this metric. */
    events: readonly StatsEventName[];
}
/** Metric definitions to track from benchmarks. */
export declare const Metrics: readonly [{
    readonly name: "public_db_access_time_ms";
    readonly groupBy: "chain-length";
    readonly description: "Time to access a database.";
    readonly events: readonly ["public-db-access"];
}, {
    readonly name: "avm_simulation_time_ms";
    readonly groupBy: "app-circuit-name";
    readonly description: "Time to simulate an AVM program.";
    readonly events: readonly ["avm-simulation"];
}, {
    readonly name: "avm_simulation_bytecode_size_in_bytes";
    readonly groupBy: "app-circuit-name";
    readonly description: "Uncompressed bytecode size for an AVM program.";
    readonly events: readonly ["avm-simulation"];
}, {
    readonly name: "proof_construction_time_sha256_ms";
    readonly groupBy: "threads";
    readonly description: "Time needed to generate a proof of an ACIR program.";
    readonly events: readonly ["proof_construction_time"];
}, {
    readonly name: "proof_construction_time_sha256_30_ms";
    readonly groupBy: "threads";
    readonly description: "Time needed to generate a proof of an ACIR program.";
    readonly events: readonly ["proof_construction_time"];
}, {
    readonly name: "proof_construction_time_sha256_100_ms";
    readonly groupBy: "threads";
    readonly description: "Time needed to generate a proof of an ACIR program.";
    readonly events: readonly ["proof_construction_time"];
}, {
    readonly name: "proof_construction_time_poseidon_hash_ms";
    readonly groupBy: "threads";
    readonly description: "Time needed to generate a proof of an ACIR program.";
    readonly events: readonly ["proof_construction_time"];
}, {
    readonly name: "proof_construction_time_poseidon_hash_30_ms";
    readonly groupBy: "threads";
    readonly description: "Time needed to generate a proof of an ACIR program.";
    readonly events: readonly ["proof_construction_time"];
}, {
    readonly name: "proof_construction_time_poseidon_hash_100_ms";
    readonly groupBy: "threads";
    readonly description: "Time needed to generate a proof of an ACIR program.";
    readonly events: readonly ["proof_construction_time"];
}, {
    readonly name: "proof_construction_time_eddsa_poseidon_ms";
    readonly groupBy: "threads";
    readonly description: "Time needed to generate a proof of an ACIR program.";
    readonly events: readonly ["proof_construction_time"];
}, {
    readonly name: "l1_rollup_calldata_size_in_bytes";
    readonly groupBy: "block-size";
    readonly description: "Size in bytes of the tx calldata posted to L1 when submitting a block.";
    readonly events: readonly ["rollup-published-to-l1"];
}, {
    readonly name: "l1_rollup_calldata_gas";
    readonly groupBy: "block-size";
    readonly description: "Estimated gas cost of the tx calldata when posting a block to L1.";
    readonly events: readonly ["rollup-published-to-l1"];
}, {
    readonly name: "l1_rollup_execution_gas";
    readonly groupBy: "block-size";
    readonly description: "Total gas used in a tx when submitting a block to L1.";
    readonly events: readonly ["rollup-published-to-l1"];
}, {
    readonly name: "l2_block_processing_time_in_ms";
    readonly groupBy: "block-size";
    readonly description: "Time for the state synchronizer to process an L2 block that was not built by its own sequencer.";
    readonly events: readonly ["l2-block-handled"];
}, {
    readonly name: "note_successful_decrypting_time_in_ms";
    readonly groupBy: "block-size";
    readonly description: "Time for the PXE to decrypt all notes in a block where they belong to a registered account.";
    readonly events: readonly ["note-processor-caught-up"];
}, {
    readonly name: "note_trial_decrypting_time_in_ms";
    readonly groupBy: "block-size";
    readonly description: "Time for the PXE to try decrypting all notes in a block where they do not belong to a registered account.";
    readonly events: readonly ["note-processor-caught-up"];
}, {
    readonly name: "l2_block_building_time_in_ms";
    readonly groupBy: "block-size";
    readonly description: "Total time for the sequencer to build an L2 block from a set of txs.";
    readonly events: readonly ["l2-block-built"];
}, {
    readonly name: "l2_block_rollup_simulation_time_in_ms";
    readonly groupBy: "block-size";
    readonly description: "Time for the sequencer to run the rollup circuit simulation when assembling a block.";
    readonly events: readonly ["l2-block-built"];
}, {
    readonly name: "l2_block_public_tx_process_time_in_ms";
    readonly groupBy: "block-size";
    readonly description: "Time for the sequencer to execute public function calls for txs in a block.";
    readonly events: readonly ["l2-block-built"];
}, {
    readonly name: "node_history_sync_time_in_ms";
    readonly groupBy: "chain-length";
    readonly description: "Time for a node without a sequencer to sync chain history";
    readonly events: readonly ["node-synced-chain-history"];
}, {
    readonly name: "note_history_successful_decrypting_time_in_ms";
    readonly groupBy: "chain-length";
    readonly description: "Time for a PXE to decrypt all notes in the chain where they belong to a registered account.";
    readonly events: readonly ["note-processor-caught-up"];
}, {
    readonly name: "note_history_trial_decrypting_time_in_ms";
    readonly groupBy: "chain-length";
    readonly description: "Time for a PXE to try decrypting all notes in the chain where they do not belong to a registered account.";
    readonly events: readonly ["note-processor-caught-up"];
}, {
    readonly name: "node_database_size_in_bytes";
    readonly groupBy: "chain-length";
    readonly description: "Size on disk of the leveldown database of a node after syncing all chain history.";
    readonly events: readonly ["node-synced-chain-history"];
}, {
    readonly name: "pxe_database_size_in_bytes";
    readonly groupBy: "chain-length";
    readonly description: "Estimated size in memory of a PXE database after syncing all notes that belong to it in the chain.";
    readonly events: readonly ["note-processor-caught-up"];
}, {
    readonly name: "protocol_circuit_simulation_time_in_ms";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Time to run a circuit simulation.";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "protocol_circuit_witness_generation_time_in_ms";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Time to generate the partial witness for a circuit";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "protocol_circuit_proving_time_in_ms";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Time to prove circuit execution.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "protocol_circuit_input_size_in_bytes";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Size of the inputs to a circuit simulation.";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "protocol_circuit_output_size_in_bytes";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Size of the outputs (ie public inputs) from a circuit simulation.";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "protocol_circuit_proof_size_in_bytes";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Size of the proof produced by a circuit.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "protocol_circuit_num_public_inputs";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Number of public inputs.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "protocol_circuit_size_in_gates";
    readonly groupBy: "protocol-circuit-name";
    readonly description: "Size of the proof produced by a circuit.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "app_circuit_simulation_time_in_ms";
    readonly groupBy: "app-circuit-name";
    readonly description: "Time to run a circuit simulation.";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "app_circuit_input_size_in_bytes";
    readonly groupBy: "app-circuit-name";
    readonly description: "Size of the inputs to a circuit simulation.";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "app_circuit_output_size_in_bytes";
    readonly groupBy: "app-circuit-name";
    readonly description: "Size of the outputs (ie public inputs) from a circuit simulation.";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "app_circuit_proof_size_in_bytes";
    readonly groupBy: "app-circuit-name";
    readonly description: "Size of the proof produced by a circuit.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "app_circuit_witness_generation_time_in_ms";
    readonly groupBy: "app-circuit-name";
    readonly description: "Time to generate the partial witness for a circuit";
    readonly events: readonly ["circuit-simulation"];
}, {
    readonly name: "app_circuit_proving_time_in_ms";
    readonly groupBy: "app-circuit-name";
    readonly description: "Duration of proving an app circuit.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "app_circuit_size_in_gates";
    readonly groupBy: "app-circuit-name";
    readonly description: "Size of an app circuit.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "app_circuit_num_public_inputs";
    readonly groupBy: "app-circuit-name";
    readonly description: "Number of public inputs.";
    readonly events: readonly ["circuit-proving"];
}, {
    readonly name: "tx_size_in_bytes";
    readonly groupBy: "classes-registered";
    readonly description: "Size of txs received in the mempool.";
    readonly events: readonly ["tx-added-to-pool"];
}, {
    readonly name: "tx_with_fee_size_in_bytes";
    readonly groupBy: "fee-payment-method";
    readonly description: "Size of txs after fully processing them (including fee payment).";
    readonly events: readonly ["tx-added-to-pool"];
}, {
    readonly name: "batch_insert_into_append_only_tree_16_depth_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Time to insert a batch of leaves into an append-only tree";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_append_only_tree_16_depth_hash_count";
    readonly groupBy: "leaf-count";
    readonly description: "The number of hashes necessary to insert a batch of leaves into";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_append_only_tree_16_depth_hash_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Average duration for a hash operation";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_append_only_tree_32_depth_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Time to insert a batch of leaves into an append-only tree";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_append_only_tree_32_depth_hash_count";
    readonly groupBy: "leaf-count";
    readonly description: "The number of hashes necessary to insert a batch of leaves into";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_append_only_tree_32_depth_hash_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Average duration for a hash operation";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_indexed_tree_20_depth_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Time to insert a batch of leaves into an indexed tree";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_indexed_tree_20_depth_hash_count";
    readonly groupBy: "leaf-count";
    readonly description: "The number of hashes necessary to insert a batch of leaves into";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_indexed_tree_20_depth_hash_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Average duration for a hash operation";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_indexed_tree_40_depth_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Time to insert a batch of leaves into an indexed tree";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_indexed_tree_40_depth_hash_count";
    readonly groupBy: "leaf-count";
    readonly description: "The number of hashes necessary to insert a batch of leaves into";
    readonly events: readonly ["tree-insertion"];
}, {
    readonly name: "batch_insert_into_indexed_tree_40_depth_hash_ms";
    readonly groupBy: "leaf-count";
    readonly description: "Average duration for a hash operation";
    readonly events: readonly ["tree-insertion"];
}];
/** Metric definitions to track from benchmarks. */
export type Metrics = typeof Metrics;
/** Type of valid metric names. */
export type MetricName = Metrics[number]['name'];
//# sourceMappingURL=metrics.d.ts.map