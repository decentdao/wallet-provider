import { useEffect, useRef } from "react";
import { useWeb3Provider } from '@decent-org/wallet-provider'
const appIframeSandbox = [
  'allow-downloads',
  'allow-forms',
  'allow-popups',
  'allow-popups-to-escape-sandbox',
  'allow-scripts',
].join(' ')

export function IFrame() {
  const { state: {provider} } = useWeb3Provider()
  const isMountedRef = useRef(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (isMountedRef.current) {
      window.addEventListener("message", async (message) => {
        const data = message.data
        if (data.jsonrpc && data.jsonrpc === '2.0') {
          const response = await (provider as any).send(data.method, data.params)
          iframeRef!.current!.contentWindow!.postMessage({...data, result: response}, '*')
        }
      })
    }
    isMountedRef.current = true
    return () => {
      window.removeEventListener("message", () => { })
    }
  })
  return <iframe 
    title="appiframe"  
    src="http://localhost:8080" 
    name="AppIFrame"
    allow="camera *; microphone *"
    frameBorder="0"
    ref={iframeRef}
    sandbox={appIframeSandbox} />
}