## Command-line Interface

### Installation

```txt
npm install -g near-cli
```

[`near-cli` on npmjs.com](https://www.npmjs.com/package/near-cli)

### Network selection

The NEAR CLI reads the `NEAR_ENV` environment variable to determine the RPC configuration to use when making network requests. Options include: `testnet`, `betanet`, `mainnet`.

Set the network for the current shell:

```txt
export NEAR_ENV=mainnet
```

Or for a single command:

```txt
NEAR_ENV=mainnet <command>
```

### Authentication

Create a full access key and add it to an account for use by the CLI.

```txt
near login
```

### Viewing stored keys

Keypairs are stored with the associated account ID in the following location:

- Mac & Linux: `~/.near-credentials/<network>/<account id>.json`
- Windows: `%USERPROFILE%/.near-credentials/<network>/<account id>.json`

### Sending tokens

:::tip
Make sure you have authenticated as the sending account using [`near login`](#authentication).
:::

```txt
near send <sender> <receiver> <# of NEAR>
```

### Executing functions

Smart contract functions can execute in two modes: **view** and **call** (or **change**).

#### View mode

View function calls are only allowed to read data from the smart contract. They do not:

- Make any on-chain modifications
- Have a signer
- Make cross-contract calls
- Transfer tokens
- Cost gas

```txt
near view <contract> <method> <JSON argumenst>
```

For example:

```txt
$ NEAR_ENV=mainnet near view wrap.near ft_balance_of '{"account_id":"root.near"}'
View call: wrap.near.ft_balance_of({ "account_id": "root.near" })
'1000000000000000000000000'
```

:::tip
If the arguments for your function call are long, complex, or are used often, you may want to put them in a separate `.json` file.

You can use them in a command like so:

```txt
near view <contract> <method> "$(<path/to/args.json)"
```

:::

#### Change mode

Regular function calls perform activity on-chain and require a signer to pay gas fees.

```txt
near call <contract> <method> <JSON arguments> --account-id <signer>
```

:::tip
Regular function calls can perform both change and view calls, but are required to pay gas fees regardless, so if you don't _have_ to perform a change, it's probably best to stick with view calls.
:::

## JavaScript API

[`near-api-js`](https://www.npmjs.com/package/near-api-js) works on both the browser and on server-side Node.js.

### Installation

Install the JavaScript API on an NPM project.

```txt
npm install --save near-api-js
```

### Connect to RPC

```js
import { connect, keyStores } as nearApi from 'near-api-js';

const networkId = 'testnet'; // or 'mainnet', 'betanet'

const near = await connect({
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  networkId,
  nodeUrl: `https://rpc.${networkId}.near.org`,
  walletUrl: `https://wallet.${networkId}.near.org`,
  helperUrl: `https://helper.${networkId}.near.org`,
  explorerUrl: `https://explorer.${networkId}.near.org`,
});
```

### Authenticate wallet

```js {12-15}
import { WalletConnection } from 'near-api-js';

const wallet = new WalletConnection(near);

const signIn = () => {
  // Creates a function call access key
  wallet.requestSignIn(
    {
      contractId: '<contract account ID>',

      // Optional properties
      methodNames: [
        'ft_transfer',
        // ...
      ],
      successUrl: '...',
      failureUrl: '...',
    },
    'App Name', // Optional
  );
};

const signOut = () => {
  wallet.signOut();
};
```

:::note
The `methodNames` list is optional. This is how function call access keys are limited in what methods they are allowed to call on a contract. If the list is specified, the only method names that must be included are those that will be called as _change_ methods.
:::

### Read Account Balance

```js
const account = await near.account('<account ID>');
const balance = await account.getAccountBalance();
```

### Send Tokens

```js
await wallet.account().sendMoney(
  '<receiver account ID>',
  '1000000000000000000000000', // amount in yoctoNEAR
);
```

### Instantiate Contract Object

```js {4-11}
import { Contract } from 'near-api-js';

const contract = new Contract(wallet.account(), '<contract account ID>', {
  viewMethods: [
    'view_method',
    // ...
  ],
  changeMethods: [
    'change_method',
    // ...
  ],
  sender: wallet.account(),
});
```

:::note
As opposed to the method names specified when [creating an access key](#authenticate-wallet), it is probably a good idea to specify as complete an interface of the contract as possible when instantiating a `Contract` object, particularly since view methods don't require an access key to call.
:::

### Call view method

```js
await contract.view_method({
  arg_name: 'arg_value',
});
```

### Call change method

```js
await contract.change_method({
  args: {
    arg_name: 'value',
  },
  // attached deposit in yoctoNEAR (optional)
  amount: '1000000000000000000000000',
  // attached gas (optional)
  gas: '300000000000000',
});
```
