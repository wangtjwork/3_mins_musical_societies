if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>s(e,o),l={module:{uri:o},exports:t,require:d};i[o]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BvaYrBBx.css",revision:null},{url:"assets/index-Da-0z5Yi.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"index.html",revision:"b6efe4b2a9b07175d078a9ce72da691d"},{url:"favicon.ico",revision:"3e44d7b52b7f9fca4b2843c7ea9220c3"},{url:"pwa-192x192.png",revision:"f9e67b25f9ebdd4cf06ef9d3de677ee7"},{url:"pwa-512x512.png",revision:"7f257c3aff3805fbbac8160df513fdec"},{url:"manifest.webmanifest",revision:"beb57a9a9954b65c067d0003098d4950"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
