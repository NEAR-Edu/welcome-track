---
title: Algorand
---

## Account Identifiers

### Algorand Addresses

Algorand addresses are derived from the account's original public key, appended with a checksum, and encoded in base 32: `IJ3G6V2QVF5FATT724TDL3FL6GJQ3OKMA3EWLB56EVRSPYMSUI4LL5P4YE`

### NEAR Account IDs

NEAR account identifiers can be one of two types: human-readable and implicit.

Human-readable account IDs must be created by their immediate parent before they can be used. For example, the account identifier `app.example.near` can only be created by `example.near`.

Implicit accounts may be used before they are created. (Or, they are created if/when they are used.) They work similarly to Algorand accounts in that the identifier of an implicit account is derived from the public key that controls the account.

## Keys

Whereas NEAR accounts may have any number of differently-permissioned keys attached at any given time, Algorand accounts may only have one key at a time. However, an Algorand account may be [rekeyed](https://developer.algorand.org/docs/get-details/accounts/rekey/) to allow another account to authorize transactions on its behalf. Rekeying revokes the account's original private key.

## Storage

There are two types of Algorand smart contract: stateful and stateless. As the name implies, stateless smart contracts (also known as smart signatures) do not have access to permanent storage.

Stateful smart contracts have access to key-value stores which can store two data types: unsigned 64-bit integers and byteslices (variable-length byte strings). There are two types of data store: the global data store is always available to its associated contract, and the local data stores are associated with an account-contract combination (the only local stores accessible to a contract during a transaction are those specified in the transaction).

NEAR smart contracts only have a contract-global key-value storage location which is always accessible. No account-specific storage location exists; account-specific information must be stored in the global store.

## Smart Contracts

Algorand smart contracts execute in the context of the Algorand Virtual Machine (AVM). The native code of the AVM is called the [Transaction Execution Approval Language (TEAL)](https://developer.algorand.org/docs/get-details/dapps/avm/teal/specification), which is a stack-based, assembly-like programming language. Since Algorand smart contracts tend to be smaller than those on other chains, many projects simply write TEAL code by hand.

There are some higher-level programming languages (or similar solutions) that produce TEAL output, namely [PyTEAL](https://pyteal.readthedocs.io/en/stable/) and [Reach](https://reach.sh/).

NEAR smart contracts run in a WebAssembly (WASM) virtual machine, meaning that [any language with a WASM compile target](https://github.com/appcypher/awesome-wasm-langs) could conceivably be used to write a smart contract for NEAR. Currently, Rust is the favored choice, especially since [NEAR core](https://github.com/near/nearcore) is written in Rust as well.

## Integration & Interoperability

There are no known interoperability solutions for Algorand-NEAR interaction at this time.
