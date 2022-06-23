import './components/styles/main.css';
import { Container } from './components/Container';
import { ConnectionProperty } from './components/ConnectionProperty';
import { Button } from './components/Button';
import { useWeb3Provider } from '@decent-dao/wallet-provider';

function App() {
  const {
    state: { account, chainId, connectionType, network, provider, signerOrProvider },
    connect,
    disconnect,
  } = useWeb3Provider();
  return (
    <div className="app-wrapper">
      <h1 className="title">Decent Wallet Provider</h1>
      <Container>
        <ConnectionProperty
          label="Connection Type"
          value={connectionType}
        />
        <ConnectionProperty
          label="account"
          value={!!account ? account : 'not connected'}
        />
        <ConnectionProperty
          label="chainId"
          value={chainId ? chainId : 'not connected'}
        />
        <ConnectionProperty
          label="network"
          value={!!network ? network : 'not connected'}
        />
        <ConnectionProperty
          label="provider connected"
          value={!!provider ? 'true' : 'false'}
        />
        <ConnectionProperty
          label="signerOrProvider connected"
          value={!!signerOrProvider ? 'true' : 'false'}
        />
      </Container>
      <div className="button-flex-container">
        <Button
          className="connect-button"
          label="Connect"
          onClick={connect}
        />
        <Button
          className="disconnect-button"
          label="Disconnect"
          onClick={disconnect}
        />
      </div>
    </div>
  );
}

export default App;
