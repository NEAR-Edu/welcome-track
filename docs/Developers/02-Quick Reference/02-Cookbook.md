## Provider

If you want to use NEAR throughout your React app, you would probably want to add a provider
to wrap your component tree in to serve the NEAR connection object in it's context.

Here is an example of how to do this.

```js title="src/lib/near-provider.js"
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

    setup().catch(console.error);
  }, []);

  const isConnected = Boolean(near && wallet);

  return (
    <NearContext.Provider value={{ near, wallet }}>
      {isConnected && children}
    </NearContext.Provider>
  );
};
```

And then use it to wrap your entire app.

```js title="src/App.jsx"
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
  </React.StrictMode>,
);
```

## Hooks

You might want to create custom hooks to use common functionality across your app.

Here are some example hooks you can use:

:::note
All of these hooks need to be inside of the `NearProvider` component subtree in order to access the NEAR connection.
:::

### useNear

```js title="src/lib/useNear.js"
import { useContext } from 'react';
import { NearContext } from './lib/near-provider';

export const useNear = () => {
  const { near } = useContext(NearContext);

  return near;
};
```

### useWallet

```js title="src/lib/useWallet.js"
import { useContext } from 'react';
import { NearContext } from './lib/near-provider';

export const useWallet = () => {
  const { wallet } = useContext(NearContext);

  return wallet;
};
```

### useContract

```js title="src/lib/useContract.js"
import { useContext } from 'react';
import { NearContext } from './lib/near-provider';

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
