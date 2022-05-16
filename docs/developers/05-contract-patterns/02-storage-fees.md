---
title: Storage Fees
---

As accounts consume more storage on the NEAR blockchain, more and more of their NEAR token balance is locked through the storage staking mechanism. Smart contract accounts may wish to pass this cost off to their users.

There are two primary methods used to accomplish this.

## Attached Deposits

The most straightforward way to implement storage fees is to require a function caller to attach the required amount of NEAR tokens to every storage-consuming function call in the form of a deposit.

The NEAR Rust SDK provides a few functions that are useful for calculating storage fees:

- [`env::storage_usage`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.storage_usage.html)
- [`env::storage_byte_cost`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.storage_byte_cost.html)

By calculating the `env::storage_usage` delta bounding a data storage event, a smart contract can calculate the bytes consumed by a particular action. Multiplying by `env::storage_byte_cost` gives the number of locked NEAR tokens.

The [`near-contract-tools`](https://crates.io/crates/near-contract-tools) crate provides [an implementation of this pattern](https://docs.rs/near-contract-tools/latest/near_contract_tools/utils/fn.apply_storage_fee_and_refund.html).

### Snippet

```rust showLineNumbers
// Storage consumption before storage event
let storage_usage_start = env::storage_usage();
// Other fees required by current function (should not credit storage)
let other_fees: u128 = 0;

//
// <actions that may consume storage>
//

// Storage consumption after storage event
let storage_usage_end = env::storage_usage();

// Storage fee incurred by storage event, clamped >= 0
let storage_fee = Balance::from(storage_usage_end.saturating_sub(storage_usage_start))
    * env::storage_byte_cost();

let total_required_deposit = storage_fee + other_fees;

let attached_deposit = env::attached_deposit();

require!(
    attached_deposit >= total_required_deposit,
    format!(
        "Insufficient deposit: required: {} yoctoNEAR; received: {} yoctoNEAR",
        &total_required_deposit, &attached_deposit
    )
);

let refund = attached_deposit - total_required_deposit;

// Send refund transfer if required
if refund > 0 {
    Promise::new(env::predecessor_account_id()).transfer(refund);
}
```

A similar strategy can be employed to implement storage fee refunds when tokens are unlocked after storage is freed.

### Advantages

- Simplicity. It's easy and intuitive for the developer to implement, and it makes sense to users what they're supposed to do and what they're paying for.
- Atomicity & precision. If the transaction succeeds, the user pays exactly what is necessary for the storage a call consumes. Otherwise, everything fails.

### Disadvantages

- Every storage-consuming function call will require a full-access signature.
- It can be a little complex to correctly calculate storage fees if the function in question requires a deposit for another reason.
- Callers might not be able to exactly calculate the amount of storage that a function call will take, therefore requiring callers to attach more tokens than necessary and trust contracts to refund the difference.
- When the storage is released, it may not be obvious to whom the unlocked tokens should be returned.

## Storage Management (NEP-145)

The [NEP-145 standard](https://github.com/near/NEPs/blob/master/neps/nep-0145.md) describes an interface for registering and maintaining storage fee credit accounts on a smart contract.

The [`near-contract-standards`](https://crates.io/crates/near-contract-standards) crate provides [standard-compliant structs and traits](https://docs.rs/near-contract-standards/latest/near_contract_standards/storage_management/index.html) for use in your own contracts.

### Advantages

- Standard. Standard-compliant implementations act the same across the board.
- Separation of concerns. Users maintain a separate storage fee record, allowing them to not worry about paying for storage when performing other function calls.
- Safety. Storage-consuming function calls do not require deposits, so they can be mediated by a third party only holding a function-call access key.
- Accounts can fund storage credits for other accounts.

### Disadvantages

- Complexity of implementation.
- Complexity of use.
- Complexity of accounting in the case of a change to network storage byte cost.
