---
title: assert_one_yocto (Forced Confirmation)
---

# `assert_one_yocto` (Forced Confirmation)

When reading NEAR smart contracts, you may see references to [`assert_one_yocto`](https://docs.rs/near-sdk/latest/near_sdk/utils/fn.assert_one_yocto.html) scattered around. This function requires the sender to attach one&mdash;_exactly one_&mdash;yoctoNEAR (1e-24 NEAR) to the function call.

Why would a smart contract developer care about such a thing?

Recall that attaching a deposit to a function call requires the call to be signed by a full-access key? This technique merely ensures that the function call is signed by a full-access key holder.

Lots of different applications may be function call key holders. If a dapp developer isn't especially conscientious (or worse&mdash;malicious!) and fails to specify a list of methods when they request an access key, he obtains a key that is allowed to call _any_ function on the contract. If the smart contract developer wants to make sure that _every time_ a particular function is called, a veritable owner of the account manually approves the call, the developer can use `assert_one_yocto` to ensure that occurs.

(Be sure to mark all functions that use `assert_one_yocto` as `#[payable]`!)
