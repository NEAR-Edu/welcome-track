---
title: Storage
---

Data. There's a lot of data to be had when it comes to blockchain applications. All NEAR accounts have some segment of the entire state of the blockchain (that is, the most up-to-date version of the data associated with the blockchain) assigned to them to manage. This includes balances, access keys, smart contract code, etc.

Storing immutable data on the blockchain has some cost associated with it. Luckily, on NEAR Protocol, that cost is pretty low, weighing in at [1 NEAR / 100kb](https://docs.near.org/docs/concepts/storage-staking#how-much-does-it-cost).

This cost is incurred when data is stored by locking some of the available balance of the account when the storage is used. The locked tokens are released when the storage is released as well. This means that the cost associated with storage can be recovered by freeing up used storage space.

:::note
This token locking strategy is called **storage staking**.
:::

## Smart Contract Storage

Smart contracts are allowed to manage a segment of nonvolatile (persistent) memory via the storage API.

At a low-level, the storage API provides a simple key-value storage system, but the SDKs provide a much more robust and friendly interface on top of it. For example, [`near-sdk-rs`](https://github.com/near/near-sdk-rs) provides a [`#[near_bindgen]`](https://www.near-sdk.io/contract-structure/near-bindgen) compile-time macro that performs some automatic state management, and some [efficient data structures](https://docs.near.org/docs/concepts/data-storage#rust-collection-types) that make good use of the API as well.

### Storage Prefixes

The collections operate using the concept of "storage prefixes," which are small, namespace-like byte arrays that are prefixed to the various keys a collection may put in storage. For example, a if a hashmap is storing some data using the prefix `"my_hashmap-"`, it may generate keys (for its internal use) that look like `"my_hashmap-0123456789abcdef"`.

When choosing a prefix, it should be distinct from any other prefixes used in your smart contract to avoid the possibility of storage collisions.

In the Rust SDK, there is a derive trait [`BorshStorageKey`](https://docs.rs/near-sdk/latest/near_sdk/derive.BorshStorageKey.html) that manages this unique generation for you:

```rust
#[derive(BorshSerialize, BorshStorageKey)]
pub enum StorageKey {
    NonFungibleToken,
    Metadata,
    TokenMetadata,
    // ...
}
```
