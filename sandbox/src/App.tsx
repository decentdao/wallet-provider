import './components/styles/main.css';
import { Container } from './components/Container';
import { ConnectionProperty } from './components/ConnectionProperty';
import { Button } from './components/Button';
import { useWeb3Provider, PROVIDER_EVENT, WalletProviderEvent } from '@decent-org/wallet-provider';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

function App() {
  const {
    state: { account, chainId, connectionType, network, provider, signerOrProvider },
    connect,
    disconnect,
  } = useWeb3Provider();

  const isMountedRef = useRef(false)

  useEffect(() => {
    if(isMountedRef.current) {
      window.addEventListener(PROVIDER_EVENT, (event: CustomEventInit<WalletProviderEvent>) => {
        toast.warn(event.detail!.message)
        return
      })
    }
    isMountedRef.current = true
    return () => {
      window.removeEventListener(PROVIDER_EVENT, () => {})
    }
  }, [])

  const signMessage = async () => {
    const msg = 'Hello World!'
      const signature = await (signerOrProvider as any)!.signMessage(msg);
      console.info("Signature", signature)
  }
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
          label="Connect"
          onClick={connect}
          disabled={!!account}
        />
        <Button
          label="Sign Message"
          onClick={signMessage}
          disabled={!account}
        />
        <Button
          className="disconnect-button"
          label="Disconnect"
          onClick={disconnect}
          disabled={!account}
        />
      </div>
    </div>
  );
}

export default App;
