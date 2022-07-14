import { useEvents } from "../examples/useEvents"
import { Button } from "./Button"
import { ConnectionProperty } from "./ConnectionProperty"
import { Container } from "./Container"
import { useWeb3Provider } from '@decent-org/wallet-provider';

export function ModuleApp() {
  const {
    state: { account, chainId, connectionType, network, provider, signerOrProvider },
    connect,
    disconnect,
  } = useWeb3Provider()

  useEvents()

  const signMessage = async () => {
    const msg = "Hello World!"
    const signature = await (signerOrProvider as any)!.signMessage(msg)
    console.info("Signature", signature)
  }
  return (
    <div className="app-wrapper">
      <h1 className="title">Iframe Sandbox</h1>
      <Container>
        <ConnectionProperty label="Connection Type" value={connectionType} />
        <ConnectionProperty label="account" value={!!account ? account : "not connected"} />
        <ConnectionProperty label="chainId" value={chainId ? chainId : "not connected"} />
        <ConnectionProperty label="network" value={!!network ? network : "not connected"} />
        <ConnectionProperty label="provider connected" value={!!provider ? "true" : "false"} />
        <ConnectionProperty
          label="signerOrProvider connected"
          value={!!signerOrProvider ? "true" : "false"}
        />
      </Container>
      <div className="button-flex-container">
        <Button label="Connect" onClick={connect} disabled={!!account} />
        <Button label="Sign Message" onClick={signMessage} disabled={!account} />
        <Button
          className="disconnect-button"
          label="Disconnect"
          onClick={disconnect}
          disabled={!account}
        />
      </div>
    </div>
  )
}
