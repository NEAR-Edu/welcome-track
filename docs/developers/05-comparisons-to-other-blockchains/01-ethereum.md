---
title: Ethereum
---

## Account Identifiers

### Ethereum Addresses

Ethereum addresses are derived from the account's public key, through a process something like this:

```python
# public_key is a byte array
# keccak256() returns a 64-byte array
address = "0x" + keccak256(public_key)[12:].hex()
```

In other words: "the hexadecimal encoding of the last 40 bytes of the Keccak-256 hash of the account's public key, prepended with `0x`".

:::note
There is also a [mixed-case checksum encoding step (EIP-55)](https://eips.ethereum.org/EIPS/eip-55), but that is beyond the scope of this document.
:::

This results in an address that looks something like: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`

### NEAR Account IDs

NEAR account identifiers can be one of two types: human-readable and implicit.

Human-readable account IDs must be created by their immediate parent before they can be used. For example, the account identifier `app.example.near` can only be created by `example.near`.

Implicit accounts may be used before they are created. (Or, they are created if/when they are used.) They work similarly to Ethereum accounts in that the identifier of an implicit account is derived from the public key that controls the account.

## Keys

Externally-owned Ethereum accounts can only be controlled by the private key corresponding to the public key from which the account address is derived. The private key is used to sign every transaction the account initiates.

NEAR accounts can have any number of access keys attached to them. These keys may be full-access (allowed to sign any transaction from the account), or they may be permissioned, that is, allowed to sign only a subset of viable transactions.

## Storage

Storage costs incurred on Ethereum are calculated as a part of the transaction fee and charged to the transaction signer. State variables are stored consecutively in a contiguous space in memory, which is divided into 32-byte slots. State variables are stored in the order they are declared, and multiple state variables that take up less than 32 bytes of space may be packed into the same slot.

Permanent data storage on NEAR uses a key-value system which can only be accessed explicitly through the storage API. If a smart contract is written using a helper SDK like [`near-sdk-rs`](https://github.com/near/near-sdk-rs), the state of the main contract struct may be automatically managed in storage. Storage costs are charged to the _contract_ (as opposed to the transaction signer) by locking a certain quantity of NEAR tokens in the contract's wallet. (Of course, smart contracts can pass this cost on to the transaction signer if desired.) The tokens are unlocked when the storage space is released.

## Smart Contracts

The Ethereum smart contract execution environment is the Ethereum Virtual Machine (EVM). The most popular EVM programming language is [Solidity](https://soliditylang.org/), however, there are a few others like [Vyper](https://github.com/vyperlang/vyper) and [Reach](https://reach.sh/).

NEAR smart contracts run in a WebAssembly (WASM) virtual machine, meaning that [any language with a WASM compile target](https://github.com/appcypher/awesome-wasm-langs) could conceivably be used to write a smart contract for NEAR. Currently, Rust is the favored choice, especially since [NEAR core](https://github.com/near/nearcore) is written in Rust as well.

## Integration & Interoperability

Ethereum smart contracts can be deployed on NEAR via [Aurora](https://aurora.dev/), which is an EVM compatibility layer on NEAR. Simply using the Aurora RPC endpoint is sufficient to get started.

Assets can be transferred from one network to the other using the [Rainbow Bridge](https://rainbowbridge.app/).
