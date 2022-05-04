---
title: Shards
---

Blockchain sharding on NEAR is a concept inspired by [database sharding](https://www.digitalocean.com/community/tutorials/understanding-database-sharding). However, instead of partitioning tables, we're partitioning _blocks_.

:::note
You can read more about the specifics of NEAR's sharding algorithm, "Nightshade", in the [Nightshade Whitepaper](https://near.org/papers/nightshade/).
:::

## Why Sharding?

First, let's examine the problem that sharding is trying to solve. Most cryptocurrencies, like Bitcoin, Ethereum ([at the time of writing](https://trent.mirror.xyz/82eyq_NXZzzqFmCNXiKJgSdayf6omCW7BgDQIneyPoA)), etc. only have one single blockchain to which all transactions are added. Since every computer that is trying to use the cryptocurrency must use an up-to-date version of the blockchain, this can become a bottleneck very quickly. Trying to calculate consensus, state changes, transaction validity, and more while trying to stay up-to-date with the very latest information streams can be very difficult. This is one of the limiting factors in a network's maximum transactions-per-second (TPS) metric.

Sharding attempts to solve this problem by segmenting the state of the blockchain into different "shards", updates on which are applied to a blockchain that only affects that particular shard. For example, if a network has 2 shards, there will be 2 blockchains: one associated with each shard. If an account's state is assigned to shard #1, transactions affecting that account will appear on shard #1's blockchain.

Since there are now twice (or however many, depending on the number of shards) as many blockchains, each chain will only receive around half as many transactions, so it will be easier for the nodes validating each chain to keep up.

Of course, there must be some way to communicate between shards, otherwise you've essentially just forked the network, moving half of the users to a separate network. This is not acceptable, so the two shards are allowed to communicate with each other. In the NEAR Protocol, cross-shard transactions are completely transparent, so smart contract developers never have to worry about what shard their contract is on.

:::tip
If the concept of sharding is still a bit confusing, think of it like this: if the blockchain is a two-dimensional graph, _blocks_ segment the state changes _horizontally_ (over time), and _shards_ segment the state _vertically_ (over space).
:::

## Shard Synchronization

Each shard has its own distinct set of validators. It's possible that each shard's set of validators may not be completely in-sync with every other shard's validators, and they may not produce **chunks** for their respective shards at the same time. (Since shards only evaluate _some_ of the state changes that occur in a particular block, and not the whole block, the "partial blocks" produced by shard validators are called "chunks".) The NEAR Protocol allows for this by permitting every shard to contribute zero or one chunks per block.

What if a smart contract in shard #1 calls a smart contract in shard #2 and that shard doesn't produce a chunk in time?

Luckily, the NEAR blockchain actually doesn't require the shard to produce a chunk containing the response right away, because the NEAR blockchain is asynchronous. Transaction actions are converted into receipts, which are then evaluated by the relevant shard. This process can span multiple blocks, meaning that a transaction may also be executing for multiple blocks.

If you're familiar with cross-contract calls in an environment like Ethereum, you may be wondering how a smart contract can safely be suspended mid-execution to allow for another shard to process a cross-contract call.

Well, since NEAR's blockchain is asynchronous, cross-contract calls execute asynchronously in the code too. Instead of a synchronous call-return format, cross-contract calls on NEAR make use of the native asynchronous [Promise API](https://www.near-sdk.io/cross-contract/callbacks), which allows the caller to set up a chain of actions that will be executed, including an optional callback function if desired.

:::info
This makes smart contracts on NEAR less likely to be vulnerable to reentrancy attacks, since any cross-contract call can only re-enter the contract through a top-level function call.
:::
