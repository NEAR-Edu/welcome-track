---
title: Storage Keys
---

Permanent smart contract storage on NEAR uses a key-value system through which smart contracts can put, get, and delete data.

When dealing with a lot of information in a smart contract, it is convenient to aggregate it in a data structure or collection. Traditional data structure implementations would require all of the data in the structure to be loaded in memory at once. However, when writing smart contracts on the blockchain, memory is a scarce resource, so the NEAR Rust SDK provides [a number of useful collections](https://www.near-sdk.io/contract-structure/collections) that are optimized for low gas cost.

Instead of loading all of the data in the collection at once (which would involve storing the entire collection under one storage key), these data structures store the data across multiple keys, and initially only load the minimum amount of metadata necessary to find those other keys.

This "minimum amount of metadata" includes a **storage key prefix**: a short string of bytes that acts like a namespace for all of the other keys the collection uses.

For example, a simple implementation of a vector data structure given the prefix `v` might store its length under key `vlength` and each item at index `#` under key `v-#` (`v-0`, `v-1`, `v-2`&hellip;).

:::warning
Great care should be taken to avoid accidentally duplicating storage key prefixes, since doing so will almost certainly produce unexpected behavior.
:::

:::info
The default struct is stored under the key `STATE`.
:::

## Automatic Generation

Use the [`BorshStorageKey`](https://docs.rs/near-sdk/latest/near_sdk/derive.BorshStorageKey.html) derive macro to implement `IntoStorageKey` on enum members.

```rust showLineNumbers
#[derive(BorshSerialize, BorshStorageKey)]
pub enum ContractStorageKey {
    NonFungibleToken,   // -> 0
    Metadata,           // -> 1
    TokenMetadata,      // -> 2
    // ...
}
```

## Complex Keys

Rust enum members can contain fields, which in turn can be serialized into storage keys:

```rust
#[derive(BorshSerialize, BorshStorageKey)]
pub enum MyVectorStorageKey {
    Length,
    Index(usize),
}

// Use MyVectorStorageKey::Index(42) as a storage key later
```

## Nesting

When writing your own gas-efficient data structures, you will probably accept a storage prefix of your own. [Complex keys](#complex-keys) won't work for this situation since struct field serializations are appended _after_ the enum member's (thus failing to act as a "namespace").

Instead, just do some bit-wrangling:

```rust
let prefix: Vec<u8> = [
  data_structure_prefix.into_storage_key(),
  member_prefix.into_storage_key(),
]
.concat();

// let member = LookupMap::new(prefix);
```
