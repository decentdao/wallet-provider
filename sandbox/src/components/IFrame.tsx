import { useEffect, useRef } from "react"
import { useWeb3Provider } from "@decent-org/wallet-provider"
const appIframeSandbox = [
  "allow-downloads",
  "allow-forms",
  "allow-popups",
  "allow-popups-to-escape-sandbox",
  "allow-scripts",
].join(" ")

export function IFrame() {
  const {
    state: { account, provider },
  } = useWeb3Provider()
  const isMountedRef = useRef(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (isMountedRef.current && provider) {
      window.addEventListener("message", async (message) => {
        const data = message.data
        // @todo optimize
        // when an Account is connected the provider works as expected, when disconnected the FallbackProvider does not expose
        // a 'send' method and fails on this end.
        // currently the fix is using the INFURA provider and send the request through that particular provider.
        if (data.jsonrpc && data.jsonrpc === "2.0") {
          let response: any
          if (!!account) {
            response = await provider.send(data.method, data.params)
          } else {
            const fallbackProvider = provider.providerConfigs[0].provider
            response = await fallbackProvider.send(data.method, data.params)
          }
          iframeRef!.current!.contentWindow!.postMessage({ ...data, result: response }, "*")
        }
      })
    }
    isMountedRef.current = true
    return () => {
      window.removeEventListener("message", () => {})
    }
  })
  return (
    <iframe
      title="appiframe"
      src="http://localhost:8080"
      name="AppIFrame"
      allow="camera *; microphone *"
      frameBorder="0"
      ref={iframeRef}
      sandbox={appIframeSandbox}
    />
  )
}
