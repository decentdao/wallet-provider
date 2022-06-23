# Decent Wallet Provider
Built on top of [Web3 Modal](https://web3modal.com) to connect Ethereum (EVM) wallets.

## Supported Wallets
<br />

### Injected Wallets

Metamask, Frame etc

<br />


### WalletConnect
Using WalletConnect Provider, allows connection to mobile and supported desktop apps

<br />


## Getting Started

### Installation

<br />

#### React Versions
This component uses react hooks and the Context API. `react@16` or greater is required.

<br />


#### react-scripts
if using `react-scripts` version `5.0.0` or greater, `react-app-rewired` will be needed to add `process`, `buffer`, `util` packages.

```
npm install react-app-rewired process buffer util
```

and then add `config-overrifdes.js` from the `sandbox` to allow for these `node` packages to be added to webpack.

<br />

### Provider Context
`Web3Provider.tsx` exports an `Context.provider` that will pass provider state data through the component tree.

```tsx
ReactDOM.render(
  <Web3Provider config={config} theme={theme}>
    <App />
  </Web3Provider>
);
```

<br />


There are 2 props that can be be passed to `<Web3Provider>`

| name | default | type | required | description |
| ---- | ------- | ---- | -------- | ----------- |
| config | * | [DWPConfig](./src/types/) | `true` | Provider configurations |
| theme | 'light' | `string` \| [ModalTheme](./src/types/) | `false` | [Web3Modal](https://github.com/Web3Modal/web3modal) theme settings |

<br />

#### Config

This prop excepts the following properties

| name | default | type | required | description |
| ---- | ------- | ---- | -------- | ----------- |
| providerKeys | * | [ProviderKeys](./src/types/) | At least one key is required. | Node api keys for fallback provider |
| localChainId | `undefined` | `string` | `false` | Chain id for local node |
localProviderURL | `undefined` | `string` | `false` | providerURL for local node |
| fallbackChainId | * | `string` | `true` | Chain Id for when wallet is not connected |
| supportedChainIds | * | `string` | `true` | Supported main/test net chain ids. Should be formatted as `1,3,4,42` |

<br />

#### Theme

This property is optional. See [web3modal](https://github.com/Web3Modal/web3modal) for more details.

<br />



## Usage
using the `useWeb3Provider()` hook in `hooks/useWeb3Provider.ts` you now have access to the Wallet Provider and connection information within state. For Typed Definition see `types.ts`

```ts
export interface IWeb3ProviderContext {
  state: InitialState;
  connect: ConnectFn;
  disconnect: DisconnectFn;
}
```

```tsx
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

<br />


### Connecting and Disconnect to Wallet

```tsx
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

<br />

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

<br />

## Local Development
Some scripts have been created to help get going quickly

<br />


### Node 

`nvm use` to change to node version `16.15.1`

<br />

### Install packages

```
npm run install:packages
```

First removes `node_modules` from root and `sandbox` directories before installing packages.

<br />

### Build Wallet Provider package

```
npm run build:link
```

Builds and then establish a local link between the packages `dist` directory and a package within the `node_modules` of the `sandbox`.

> Note: There currently is not a hotloader to automatically build when files are updated. after running `npm run build:link`, you will need to restart your development server. It's recommended you spilt your terminal to run these commands as needed.

<br />

### Start development server

```
npm run start
```

From the root directory you can start the development server, no need to `cd` into `sandbox`


