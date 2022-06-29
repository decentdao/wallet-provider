export interface WalletProviderEvent {
  type: 'error' | 'warn' | 'info';
  title: string;
  message: string;
}
