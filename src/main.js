import App from './App.svelte';

const isUpdateAvailable = new Promise(resolve => {
  if (!('serviceWorker' in navigator)) {
    resolve(false);
    return;
  }
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        };
      };
    })
    .catch(err => console.error('[SW ERROR]', err));
});

function setViewHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
let throttler;
let final = false;
window.addEventListener('resize', () => {
  if (!throttler) {
    setViewHeight();
    throttler = setTimeout(() => {
      throttler = null;
      if (final) {
        setViewHeight();
        final = false;
      }
    }, 100);
  } else {
    final = true;
  }
});
setViewHeight();

const app = new App({
  target: document.body,
  props: {
    update: isUpdateAvailable
  }
});

export default app;