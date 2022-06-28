import { useRef, useEffect } from "react"
import { toast } from "react-toastify"
import {  PROVIDER_EVENT, WalletProviderEvent } from '@decent-org/wallet-provider';

export function useEvents() {
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
}