import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { web3ProviderConfig } from './providerConfig';
import { Web3Provider } from '@decent-org/wallet-provider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3Provider config={web3ProviderConfig()} theme="light">
      <>
        <ToastContainer
                position="bottom-center"
                closeButton={false}
                newestOnTop={false}
                pauseOnFocusLoss={false}
                />
        <App />
      </>
    </Web3Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
