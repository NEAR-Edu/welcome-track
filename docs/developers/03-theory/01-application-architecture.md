---
title: Application Architecture
---

Decentralized applications (a.k.a. **dapps** or **dApps**) built on NEAR typically consist of the following primary components.

## Smart Contract

Of course, in order to run trustless logic, it must be deployed to the blockchain in the form of a smart contract. Most smart contracts are written in Rust or AssemblyScript, which are then compiled into a WebAssembly binary and uploaded to an account.

Smart contracts may not be necessary for applications that act as a custodial wallet or key manager.

## Backend

Most dapps are web applications accessible at some URL and hosted by a server. A custom backend may be necessary for applications that perform a lot of heavy data processing, store large amounts of data, operate on private data, or interact with non-blockchain applications (e.g. Discord, email, Google).

If a dapp doesn't need to interface with much (or any) data off-chain, it could conceivably make do with a minimal backend hosting only static content, like GitHub Pages (or something similar).

## Frontend

Web applications usually interface with the NEAR blockchain through use of a [NEAR RPC endpoint](https://docs.near.org/docs/api/rpc) (a service of a NEAR node), and sometimes through use of an [indexer](https://github.com/near/near-indexer-for-explorer).

The RPC interface allows applications to broadcast signed transactions to nodes, as well as query the current state of the blockchain (account balances, access keys, view function calls, etc.).

Web applications can leverage [the `near-api-js` library](https://www.npmjs.com/package/near-api-js), which provides helpful structures around the RPC interface and make communication with the blockchain significantly easier.

:::note
`near-api-js` can be used on both server-side and client-side JavaScript applications.
:::
