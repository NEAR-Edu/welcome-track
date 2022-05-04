---
title: Accounts
---

On-chain transactions represent a change to some portion of the state of the blockchain. Every account comprises a portion of the state. The state contains information like balances, [code](/developers/protocol/smart-contracts), [access keys](/developers/protocol/access-keys), and [smart contract storage](/developers/protocol/storage).

## Account Identifiers

Every account is identified by an account ID, of which there are two types: human-readable and implicit.

### Human-readable accounts

Human-readable account identifiers usually take the form of `<name>.near`. For example: `root.near`, `wrap.near`, `v2.ref-finance.near`.

You may notice that `v2.ref-finance.near` contains two `.` characters, and it's starting to look a little bit like a website domain name. Well, that's because it acts a little bit like a website domain name too!

A parent account (e.g. `ref-finance.near`) is the only account that is allowed to create its child accounts. Child accounts take the form of `<name>.<parent>`. In our example, the name of the child is `v2` and the parent is `ref-finance.near`, so the full name of the child account (or subaccount) is `v2.ref-finance.near`. After the account is created, however, the parent account doesn't have any more control over the subaccount than any other NEAR account (unless the subaccount is deleted; the parent is the only account that can create it again). Subaccounts have their own state: balance, keys, code, etc. are all separate.

Of course, all of these examples have actually been subaccounts themselves, too. They're all subaccounts of the top-level `near` account. There's a special smart contract deployed to the `near` account that allows anyone to create a `<name>.near` subaccount.

### Implicit Accounts

There's a catch to the above paragraph:

> that allows _anyone_ to create a `<name>.near` subaccount

Who is "anyone"?

Unfortunately, the answer is "anyone who already has a NEAR account," because you need a NEAR account in order to send the transaction to the `near` smart contract to tell it to create your new account in the first place!

Luckily, [implicit accounts](https://docs.near.org/docs/roles/integrator/implicit-accounts) are here to help!

If you're familiar with other cryptocurrency projects like Bitcoin or Ethereum, you are probably familiar with Bitcoin or Ethereum _addresses_. They look something like this:

| Bitcoin                              | Ethereum                                     |
| ------------------------------------ | -------------------------------------------- |
| `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` | `0xd8da6bf26964af9d7eed9e03e53415d37aa96045` |

These addresses are derived from the account's associated public key, since Bitcoin and Ethereum only support one key per account.

NEAR supports an arbitrary number (including zero) of associated keys per account. However, we've already seen that the account ID (of a human-readable account ID) has nothing to do with any associated keys. However, NEAR also supports implicit accounts, which act a lot like Bitcoin or Ethereum addresses.

To use an implicit account, one must first generate a keypair locally, and then transactions can be signed with the corresponding private key. Of course, due to the existence of gas fees, someone will need to send funds to the implicit account before any outgoing transactions can be submitted.

Implicit account IDs look something like this: `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`.

Once an implicit account is created, it works just like any other account.
