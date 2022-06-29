import { useRef, useEffect } from "react"
import { toast } from "react-toastify"
import {  PROVIDER_EVENT, WalletProviderEvent } from '@decent-org/wallet-provider';

export function useEvents() {
  const isMountedRef = useRef(false)

  useEffect(() => {
    const providerEvent = (event: CustomEventInit<WalletProviderEvent>) => {
      toast[event.detail!.type](event.detail!.message)
    }
    if(isMountedRef.current) {
      window.addEventListener(PROVIDER_EVENT, providerEvent)
    }
    isMountedRef.current = true
    return () => {
      window.removeEventListener(PROVIDER_EVENT, providerEvent)
    }
  }, [])
}