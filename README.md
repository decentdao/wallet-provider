# Decent Wallet Provider

Easily connect a dApp to a web3 wallet. Built with the help of [web3modal](https://web3modal.com) and [ethers](https://docs.ethers.io/v5/)s' providers, this package quickly gets a dApp connected and interacting with an EVM compaitble blockchain with just a few props and 2 components.

## Supported Wallets

### Injected Wallets

Metamask, Frame etc

### WalletConnect
WalletConnect Provider allows connection to mobile and supported desktop apps

## Installation

#### Versions
##### React
This package uses react hooks and the Context API. `react@16` or greater is required.
##### React-scripts


if using `react-scripts` version `5.0.0` or greater, [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) will be needed, along with `process`, `buffer`, `util` packages.

```
npm install react-app-rewired process buffer util
```

and then add `config-overrifdes.js` from the `sandbox` to allow for these `node` packages to be added to webpack.


### Provider
`Web3Provider` is uses [React Context API](https://reactjs.org/docs/context.html) to pass the wallet provider's state to the rest of the dApp. Simply Wrap the component tree you wish to have access to the wallet provider's state.
```tsx
import { Web3Provider } from '@decent-org/wallet-provider'

ReactDOM.render(
  <Web3Provider config={config} theme={theme}>
    <App />
  </Web3Provider>
);
```


`<Web3Provider>` accepts 2 props.

| name | default | type | required | description |
| ---- | :-------: | ----: | --------: | -----------: |
| config | - | [DWPConfig](./src/types/index.ts) | `true` | Provider configurations |
| theme | 'light' | `string` \| [ModalTheme](./src/types/index.ts) | `false` | [Web3Modal](https://github.com/Web3Modal/web3modal) theme settings |

<br />

#### DWPConfig

Configuration for the wallet-provider.

| name | default | type | required | description |
| ---- | :-------: | ----: | --------: | -----------: |
| providerKeys | - | [ProviderKeys](./src/types/index.ts) | At least one key is required. | Node api keys for fallback provider |
| localChainId | `undefined` | `string` | `false` | Chain id for local node |
localProviderURL | `undefined` | `string` | `false` | providerURL for local node |
| fallbackChainId | - | `string` | `true` | Chain Id for when wallet is not connected |
| supportedChainIds | - | `string` | `true` | Supported main/test net chain ids. Should be formatted as `1,3,4,42` |

<br />

#### Theme

This property is optional. See [web3modal](https://github.com/Web3Modal/web3modal) for more details.


## Usage
The `useWeb3Provider()` hook allows access to the Wallet Provider and connection information within state. For typed definitions see [types](./src/types/index.ts)

```ts
export interface IWeb3ProviderContext {
  state: InitialState;
  connect: ConnectFn;
  disconnect: DisconnectFn;
}
```

```tsx
import { useWeb3Provider } from '@decent-org/wallet-provider';

function Component() {
  const { state: { account, chaindId, network, connectionType } } = useWeb3Provider();

  console.log(account)
  // if connected 0x.... 
  // if not connected null
  console.log(chainId)
  // 0x04
  console.log(network)
  // 'rinkeby'
  console.log(connectionType)
  // 'injected provider'
  ... 
}
```

### Connecting and Disconnect to Wallet

```tsx
import { useWeb3Provider } from '@decent-org/wallet-provider';

function Component() {
  const { state: { account },  connect, disconnect } = useWeb3Provider();

  if(!account) {
    return (
      <button onClick={connect}>Connect</button>
    )
    return (
      <button onClick={disconnect}>Disconnect</button>
    )
  }
}
```

### Interacting with the blockchain

```tsx
function Component() {
  const { state: { provider, signer } } = useWeb3Provider();

  // When retreiving information use provider
    provider.on('block',  (block: number) => {
      setBlockNumber(block);
    };);

  // When broadcasting a transaction or interacting with a contract use Signer
  ontract.connect(daoData.moduleAddresses[1], signer);
}
```

## Utilities
Coming soon

## Local Development
Some scripts have been created to help get going quickly


### Node 

`nvm use` to change to node version `16.15.1`

<br />

### Scripts
#### install:packages
removes `node_modules` from root and `sandbox` directories before installing packages.

```
npm run install:packages
```

#### build:link

Cleans, builds and then re-establishes a local npm link between the packages `dist` directory and a package within the `node_modules` of the `sandbox`.

```
npm run build:link
```

#### build:start

> Note: There currently is not a hotloader to automatically build when files are updated. after running `npm run build:start`, you will need to restart your development server. It's recommended you spilt your terminal to run these commands as needed.


This script will do all of the above and restart sever. currently quickest way to update sandbox with more recent build.
```
npm run build:start
```

#### start
From the root directory you can start the development server directly, no need to `cd` into `sandbox`

```
npm run start
```



