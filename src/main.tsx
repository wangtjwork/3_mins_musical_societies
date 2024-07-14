import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
  registerSW({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRegistered(r: any) {
      r && setInterval(() => {
        console.log('Updating worker...');
        r.update();
      }, 1000 * 60 * 10)
    }
  });
}
