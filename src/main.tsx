import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from 'react-router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
  registerSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      if (r === undefined) {
        return;
      }
      setInterval(() => {
        console.log('Updating worker...');
        r.update();
      }, 1000 * 60 * 10)
    }
  });
}
