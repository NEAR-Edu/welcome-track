---
title: Ownership
---

The contract ownership pattern involves designating an account ID as the "owner" of a contract, allowing it to have special permissions. These permissions may include calling certain functions or withdrawing contract funds, among others.

There is not an NEP standard for contract ownership and management.

## Example code

```rust showLineNumbers
use near_sdk::{env, near_bindgen, AccountId};

#[near_bindgen]
struct MyContract {
    pub owner_id: AccountId,
}

#[near_bindgen]
impl MyContract {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
        }
    }

    fn require_owner(&self) {
        require!(
            &env::predecessor_account_id() == self.owner_id,
            "Owner only",
        );
    }

    pub fn get_owner(&self) -> AccountId {
        self.owner_id.clone()
    }

    pub fn set_owner(&mut self, owner_id: AccountId) {
        // Only the owner is allowed to call this function
        self.require_owner();

        self.owner_id = owner_id;
    }
}
```

## Packages

The [`near-contract-tools`](https://crates.io/crates/near-contract-tools) Rust crate provides a full macro implementation of an ownership pattern.

```rust showLineNumbers
use near_contract_tools::{impl_ownership, ownership::Ownership};
use near_sdk::{assert_one_yocto, near_bindgen, AccountId};

#[near_bindgen]
struct Contract {
    ownership: Ownership,
}

impl_ownership!(Contract, ownership);

impl Contract {
    // Protected function
    pub fn owner_only(&self) {
        self.ownership.require_owner();

        // ...
    }
}
```
