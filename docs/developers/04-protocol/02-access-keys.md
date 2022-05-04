---
title: Access Keys
---

In order for a transaction to be applied to the blockchain, it must be cryptographically signed by a valid key. NEAR accounts may have any number of access keys attached to them, with optional permissions. A valid transaction must contain a signature from one of these keys.

## Full-Access Keys

An access key attached to an account with "full-access" permissions is allowed to sign any outbound transaction from the account. Individuals should always maintain control over at least one set of full-access keys for their accounts.

An individual should be very careful about giving an application full access keys, since that application can do literally anything with them. The vast majority of applications should work fine with just function call access keys. The notable exception to this rule is custodial wallets (i.e. applications that you use to manage an account itself).

## Function Call Keys

Function call access keys are limited in what transactions the network will allow them to sign.

First, function call access keys are only allowed to sign transactions that call functions on smart contracts. That means they cannot transfer tokens (directly; payments to functions must still be authorized), add or delete access keys, create or delete accounts, deploy contracts, etc.

Second, function call access keys are restricted to only calling functions on a particular account ID. For example, if a function call access key were issued to `wrap.near`, that key would only be allowed to sign function call transactions with a recipient of `wrap.near`.

These keys can also optionally specify a limited set of functions that the key is allowed to call. If such a list is not specified, the key is allowed to sign any function call to the contract.

Since calling a function also costs a nominal amount of NEAR in gas, each key is assigned a small allowance earmarked for gas fees only (usually 0.25 NEAR). This amount is not immediately removed from the balance of the account when the access key is created; it is merely a number attached to the key which will be updated whenever the key is used. Once the number reaches zero the key will not be allowed to sign further transactions.

Function call access keys are usually issued to dapps to allow them to sign transactions for the user without requiring explicit confirmation from the user (using a full-access key) every time the dapp wishes to make an on-chain transaction. Since the block time of NEAR Protocol is on the order of 1 second, this allows for dapps to make near-real-time transactions on the blockchain without delaying the user with a relatively (~15 second) confirmation/signing process.
