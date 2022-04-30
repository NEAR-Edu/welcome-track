Actions on the blockchain involve **actors**, that is, entities that perform behaviors. There are two primary types of actors that participate in on-chain activities: external actors and autonomous, on-chain actors.

Normal users, validators, oracles, etc. all fall in the category of external actor.

Smart contracts, on the other hand, are on-chain actors.

:::note
Although smart contracts are actors, they can only _react_ to actions initiated by other actors; they cannot independently initiate a new chain of actions.
:::

## What are smart contracts?

Let's break down the term "smart contract". At first, it might seem strange to compare a piece of software to a regular legal contract. However, they are more similar than they may first appear.

Smart contracts are pieces of software that execute in a special environment: the "blockchain". What this _actually_ means is that every computer (node) connected to the blockchain network will run the smart contract and report the results of its execution back to the network via the blockchain (or have another node run the smart contract and agree with the other node's results).

Since all the nodes on the network must agree on the results of the execution of the smart contract, that means that there can be no possibility for variation in the results of the execution. In other words, the execution of the smart contract must be [**deterministic**](https://en.wikipedia.org/wiki/Deterministic_algorithm). However, smart contracts are Turing-complete, meaning they can compute anything any other computer can. This is where the "smart" part of "smart contract" comes from.

What about the "contract" part? The logic governing the behavior of a smart contract must be published (publicly) on the blockchain in order for it to be used. This means that the "terms" of the contract are visible and immutable before they can be used, and by virtue of interacting with the smart contract, a user is implicitly "agreeing" to those terms.

:::caution
Since accounts can have contracts deployed to them multiple times (through the use of a full-access key), an account must have all access keys removed before the code deployed to the account can be declared immutable.
:::

In summary, smart contracts are deterministic programs that run in the context of a blockchain. They are allowed to manage some persistent [storage](./Storage) and perform interactions (i.e. send transactions) to other smart contracts.

## Smart contracts on NEAR

Many different blockchains implement different variations of smart contracts. Bitcoin smart contracts are very simple, and not even Turing-complete. Ethereum smart contracts run in the Ethereum Virtual Machine (EVM), and are usually written in the smart contract DSL Solidity.

NEAR appeals to traditional application developers by running smart contracts in a WebAssembly (WASM) virtual machine, meaning [any programming language with a WASM compile target](https://github.com/appcypher/awesome-wasm-langs) could conceivably be used to write a smart contract that runs on NEAR.

:::tip
That's actually not the only way to write smart contracts on NEAR! There are a few projects (most notably [Aurora](https://aurora.dev/)) that are working on **enclaved VMs**--programming language virtual machines that run as smart contracts on NEAR, so even languages _without_ a WASM compile target (e.g. scripting languages like JavaScript) could be used to write smart contracts.
:::

[Rust](https://www.rust-lang.org/) is a first-class citizen when it comes to smart contract support on NEAR. ([nearcore](https://github.com/near/nearcore) is written in Rust, so it was kind of a no-brainer.) Developers can use the [NEAR Rust SDK](https://www.near-sdk.io/) to write smart contracts, which takes care of much of the necessary boilerplate.

## Contract Interactions

Users usually interact with smart contracts through decentralized applications (dapps), which interact with smart contracts through use of the [RPC](https://docs.near.org/docs/api/rpc). The RPC is a component of a NEAR node, and it provides an easy interface to query the current state of the blockchain, as well as broadcast signed transactions to the rest of the network.

## Contract Standards

If you've heard of NFTs (non-fungible tokens) or FTs (fungible tokens) before, you may be familiar with the concept of "token standards".

Token standards are a subset of contract standards, which are a set of well-defined interfaces that a contract must implement (if the contract is to be compliant with the standard, that is). Contract standards typically specify function declarations, requirements of those functions' behavior, some invariants that must hold regarding that behavior, maybe some data structures, etc. Other contracts may then easily interact with standard-compliant contracts.

The [NEAR Contract Standards crate](https://crates.io/crates/near-contract-standards) provides a few ready-made [contract standard implementations](https://docs.rs/near-contract-standards/latest/near_contract_standards/#macros) that are easy to add to your Rust contracts.
