/* Noindex de estados no públicos; respaldo para hosting sin Edge Functions. */
(() => {
 const redirect = new URLSearchParams(location.search).has('q');
 const callback = /(?:^|[&#])(?:access_token|refresh_token|error_description)=/.test(location.hash);
 if (redirect) document.documentElement.classList.add('qr-redirect');
 window.avjIndexingState = privateState => {
  document.querySelector('meta[name="robots"]').content = privateState || redirect || callback ? 'noindex,nofollow,nosnippet' : 'index,follow,max-image-preview:large';
 };
 window.avjIndexingState(false);
 if (redirect) {
  document.querySelector('link[rel="canonical"]')?.remove();
  document.querySelector('script[type="application/ld+json"]')?.remove();
 }
})();
