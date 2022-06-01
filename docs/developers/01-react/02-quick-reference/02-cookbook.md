---
title: Cookbook
---

## Provider

If you want to use NEAR throughout your React app, you would probably want to add a provider
to wrap your component tree in to serve the NEAR connection object in it's context.

Here is an example of how to do this.

```js title="src/lib/near-provider.js" showLineNumbers
import { createContext, useState, useEffect } from 'react';
import { connect, WalletConnection } from 'near-api-js';

export const NearContext = createContext({});

export const NearProvider = ({ children, config }) => {
  const [near, setNear] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    async function connectNear() {
      const near = await connect(config);

      setNear(near);
      setWallet(new WalletConnection(near));
    }

    connectNear().catch(console.error);
  }, []);

  const isConnected = Boolean(near && wallet);

  return (
    <NearContext.Provider value={{ near, wallet }}>
      {isConnected && children}
    </NearContext.Provider>
  );
};
```

## Config

```jsx title="src/config.js" showLineNumbers
import { keyStores } from 'near-api-js';

/**
 * Function that returns a NEAR connection configuration object based on the given networkId.
 *
 * @param  {string} networkId='testnet'
 * @return {object}
 */
export const getConfig = (networkId = 'testnet') => {
  return {
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    explorerUrl: `https://explorer.${networkId}.near.org`,
  };
};
```

And then use it to wrap your entire app.

```js title="src/index.js" showLineNumbers
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NearProvider } from './lib/near-provider';
import { getConfig } from './config';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NearProvider config={getConfig('testnet')}>
      <App />
    </NearProvider>
  </react.StrictMode>,
);
```

## Hooks

You might want to create custom hooks to use common functionality across your app.

Here are some example hooks you can use:

:::note
All of these hooks need to be inside of the `NearProvider` component subtree in order to access the NEAR connection.
:::

### useNear

```js title="src/lib/useNear.js" showLineNumbers
import { useContext } from 'react';
import { NearContext } from './lib/near-provider';

/**
 * Get the NEAR connection object from the context.
 */
export const useNear = () => {
  const { near } = useContext(NearContext);

  return near;
};
```

Example use case:

```jsx title="src/NearComponent.jsx" showLineNumbers
import React from 'react';
import { useNear } from './lib/useNear';

export const NearComponent = () => {
  const near = useNear();

  // This will display the current network we are connected to e.g. 'testnet' or 'mainnet'
  return <div>{near.connection.networkId}</div>;
};
```

### useWallet

```js title="src/lib/useWallet.js" showLineNumbers
import { useContext } from 'react';
import { NearContext } from './lib/near-provider';

/**
 * Get the NEAR wallet connection object from the context.
 */
export const useWallet = () => {
  const { wallet } = useContext(NearContext);

  return wallet;
};
```

Example use case:

```jsx title="src/WalletComponent.jsx" showLineNumbers
import React from 'react';
import { useWallet } from './lib/useWallet';

export const WalletComponent = () => {
  const wallet = useWallet();

  // This will display the address of the currently signed in account
  return wallet.isSignedIn() ? <div>{wallet.getAccountId()}</div> : null;
};
```

### useContract

```js title="src/lib/useContract.js" showLineNumbers
import { useContext } from 'react';
import { NearContext } from './lib/near-provider';
import { Contract } from 'near-api-js';

/**
 * Create a new contract object from the NEAR wallet object given the id and methods of
 * the smart contract.
 *
 * @param {Object} contractConfig The smart contract configuration.
 * @param {string} contractConfig.contractId The id of the smart contract.
 * @param {Object} contractConfig.contractMethods The methods of the smart contract.
 * @param {string[]} contractConfig.contractMethods.viewMethods The view methods of the smart contract.
 * @param {string[]} contractConfig.contractMethods.changeMethods The change methods of the smart contract.
 */
export const useContract = ({
  contractId,
  contractMethods: { viewMethods, changeMethods },
}) => {
  const wallet = useWallet();

  return new Contract(wallet.account(), contractId, {
    viewMethods,
    changeMethods,
  });
};
```

Example use case:

```jsx title="src/ContractComponent.jsx" showLineNumbers
import React, { useState, useEffect } from 'react';
import { useContract } from './lib/useContract';
import { useWallet } from './lib/useWallet';

export const ContractComponent = () => {
  // Here we define the contract configuration and get a contract object.
  const contract = useContract({
    contractId: 'wrap.testnet',
    contractMethods: {
      viewMethods: ['ft_balance_of'],
      changeMethods: [],
    },
  });
  // We use the `useWallet` hook to get the wallet connection object.
  const wallet = useWallet();
  // Since executing smart contract methods takes time we will use a `useState` hook to
  // store the result of the method execution.
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Calling smart contract methods is an async task so we create a async function to
    // execute the method.
    async function getBalance() {
      // We check to see if an account is signed in, otherwise we cannot get a balance of an unknown account.
      if (wallet.isSignedIn()) {
        // We store the return value of the smart contract call in the `balance` variable.
        setBalance(await contract.ft_balance_of(wallet.getAccountId()));
      }
    }

    getBalance().catch(console.error);
  }, [wallet, contract]);

  // This will display the available wNEAR balance of the currently signed in account
  return wallet.isSignedIn() ? <div>{balance}</div> : null;
};
```

## Examples

Here are some examples of common use cases:

### Sign in button

```jsx title="src/components/SignInButton.jsx" showLineNumbers
import React from 'react';
import { useWallet } from './lib/useWallet';

const SignInButton = ({ config }) => {
  const wallet = useWallet();

  const signIn = () => wallet.requestSignIn(config);

  return wallet.isSignedIn() ? (
    <p>{wallet.getAccountId()}</p>
  ) : (
    <button onClick={() => signIn()}>Sign in with NEAR</button>
  );
};

export default SignInButton;
```

### Sending tokens

```jsx title="src/components/SendTokens.jsx" showLineNumbers
import React, { useState, useEffect } from 'react';
import { utils } from 'near-api-js';
import { useWallet } from './lib/useWallet';

const {
  format: { parseNearAmount },
} = utils;

const SendTokens = () => {
  const wallet = useWallet();
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');

  if (!wallet.isSignedIn()) {
    return null;
  }

  const sendTokens = async () => {
    // The account object allows us to send tokens via the `sendMoney` method.
    // P.S. We need to call the `parseNearAmount` function to convert the amount of NEAR
    // the user wants to send to yoctoNEAR (1e-24 NEAR) because the network stores values
    // in yoctoNEAR.
    await wallet.account().sendMoney(recipient, parseNearAmount(amount));
  };

  return (
    <div>
      <label>
        Amount:{' '}
        <input
          type="number"
          value={amount}
          onChange={({ target: { value } }) => setAmount(value)}
        />
      </label>
      <label>
        Recipient:{' '}
        <input
          type="text"
          value={recipient}
          onChange={({ target: { value } }) => setRecipient(value)}
        />
      </label>
      <button onClick={() => sendTokens()}>Send</button>
    </div>
  );
};
```
