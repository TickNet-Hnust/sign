if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>l(s,r),o={module:{uri:r},exports:u,require:a};e[r]=Promise.all(i.map((s=>o[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-f51ab5e4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/_...all_.44f025e0.js",revision:null},{url:"assets/_...all_.993e7f23.css",revision:null},{url:"assets/_name_.1a8bcb71.css",revision:null},{url:"assets/_name_.566181be.js",revision:null},{url:"assets/404.2c08f91e.js",revision:null},{url:"assets/404.a9d4f0d8.css",revision:null},{url:"assets/app.0e14bfb0.css",revision:null},{url:"assets/app.f64822d2.js",revision:null},{url:"assets/assist.5fda91f9.js",revision:null},{url:"assets/assist.80f6bd5e.css",revision:null},{url:"assets/detail.78d2e73a.js",revision:null},{url:"assets/detail.d0bdf83a.css",revision:null},{url:"assets/help.7daf25ba.js",revision:null},{url:"assets/help.8b12900a.css",revision:null},{url:"assets/home.150c27e3.css",revision:null},{url:"assets/home.92bb5919.js",revision:null},{url:"assets/index.0941a4e7.js",revision:null},{url:"assets/index.11c6a253.css",revision:null},{url:"assets/index.1db7c900.css",revision:null},{url:"assets/index.27f4edfb.js",revision:null},{url:"assets/index.3c0eef93.js",revision:null},{url:"assets/index.44781762.css",revision:null},{url:"assets/index.49d304ca.js",revision:null},{url:"assets/index.5340d4a4.css",revision:null},{url:"assets/index.5b0e5121.css",revision:null},{url:"assets/index.5c51608b.css",revision:null},{url:"assets/index.623e08a1.js",revision:null},{url:"assets/index.6260ec15.css",revision:null},{url:"assets/index.686884a5.js",revision:null},{url:"assets/index.6a3c2358.js",revision:null},{url:"assets/index.78c43b59.css",revision:null},{url:"assets/index.7f4592a0.css",revision:null},{url:"assets/index.7f5fa88f.css",revision:null},{url:"assets/index.81bf999a.css",revision:null},{url:"assets/index.87fe9158.css",revision:null},{url:"assets/index.8c2f787a.css",revision:null},{url:"assets/index.905e6813.css",revision:null},{url:"assets/index.93c8339d.css",revision:null},{url:"assets/index.95b45ec0.js",revision:null},{url:"assets/index.986415e4.css",revision:null},{url:"assets/index.a085dcb9.js",revision:null},{url:"assets/index.a326dd03.js",revision:null},{url:"assets/index.adf58019.js",revision:null},{url:"assets/index.b772298e.js",revision:null},{url:"assets/index.bd46821f.js",revision:null},{url:"assets/index.bdc17aaa.js",revision:null},{url:"assets/index.c219a209.js",revision:null},{url:"assets/index.cab24990.js",revision:null},{url:"assets/index.cde88213.js",revision:null},{url:"assets/index.d7d70209.js",revision:null},{url:"assets/index.e782fbfc.js",revision:null},{url:"assets/index.e93dd251.js",revision:null},{url:"assets/index.e99bf92f.css",revision:null},{url:"assets/index.f2a6c00a.js",revision:null},{url:"assets/index.f334f72a.js",revision:null},{url:"assets/index.f81f5d33.css",revision:null},{url:"assets/index.fcdcf0e1.js",revision:null},{url:"assets/modify.0a57e944.css",revision:null},{url:"assets/modify.19e507dd.js",revision:null},{url:"assets/plugin-vue_export-helper.21dcd24c.js",revision:null},{url:"assets/random.1a7e4a8a.css",revision:null},{url:"assets/random.46813512.css",revision:null},{url:"assets/random.919d0e26.js",revision:null},{url:"assets/random.c014388b.js",revision:null},{url:"assets/recording.c249b582.css",revision:null},{url:"assets/recording.e5d111ec.js",revision:null},{url:"assets/RecordsList.07db8424.js",revision:null},{url:"assets/RecordsList.476c95f1.css",revision:null},{url:"assets/teacher_space.05ab921c.css",revision:null},{url:"assets/teacher_space.a9186cf3.js",revision:null},{url:"assets/virtual_pwa-register.04637613.js",revision:null},{url:"index.html",revision:"977eb2a78982461f334a0430db6010f5"},{url:"favicon.svg",revision:"505fc25048cd39e43f4913849a1c62e0"},{url:"safari-pinned-tab.svg",revision:"21a5632e21f7421e63e58f3a8a3e205e"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"37e8d18026b05432f623fc5efac2b4b1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
