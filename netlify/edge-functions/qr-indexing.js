// Does not resolve destinations, modify Auth, or change existing QR addresses.
export default async function(request, context) {
 const url = new URL(request.url);
 if (!url.searchParams.has('q')) return;
 const response = await context.next();
 const headers = new Headers(response.headers);
 headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet');
 headers.set('Cache-Control', 'private, no-store');
 headers.set('Netlify-CDN-Cache-Control', 'no-store');
 return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
}
