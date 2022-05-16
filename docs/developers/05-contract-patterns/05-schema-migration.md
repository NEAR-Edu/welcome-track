---
title: Schema Migration
---

When you deploy a new version of your smart contract, the schema of the [default struct](https://www.near-sdk.io/contract-interface/contract-mutability#mutable-functions) in which the state of your contract is stored may change.

:::note
This guide only covers schema migrations in the Rust `struct` that is marked with `#[near_bindgen]`, sometimes called the "default struct". This guide does _not_ cover migration of other areas of your smart contract storage (e.g. prefixed collections).
:::

A common pattern for facilitating migration is to define an initialization function called `migrate` that converts the old schema into the new schema.

## Example code

```rust showLineNumbers
use near_sdk::{
    borsh::{self, BorshDeserialize},
    env,
    near_bindgen,
};

// Current (new) version of the schema
#[near_bindgen]
struct Contract {
    pub moved_key: u64,
    pub new_key: String,
}

#[near_bindgen]
impl Contract {
    // `migrate` doesn't strictly have to be `#[private]`, but some access
    // control should be applied, so that not just anybody can run the
    // migration. Additionally, some care should be taken that the migration
    // cannot run more than once. Though, for most migrations, the
    // deserialization step will fail outright if it's run more than once.
    #[private]
    // Functions marked with `#[init(ignore_state)]` will run without access to
    // `self`, even if the `"STATE"` key exists.
    #[init(ignore_state)]
    pub fn migrate() -> Self {
        // Specify the old schema (that from which the contract is migrating).
        #[derive(BorshDeserialize)]
        pub struct OldSchema {
            pub key: u64,
        }

        // Deserialize the old schema from raw state read
        let old: OldSchema = env::state_read().unwrap();

        // Return new schema, overwriting old schema
        Self {
            moved_key: old.key,
            new_key: "default".to_string(),
        }
    }
}
```
