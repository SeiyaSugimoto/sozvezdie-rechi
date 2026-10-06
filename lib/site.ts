/** No request-host trust: only explicit config or host-provided deployment values. */
export function getSiteUrl(): URL | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const hosted = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const value = explicit || (hosted ? `https://${hosted}` : undefined);
  if (!value) return process.env.NODE_ENV === 'development' ? new URL('http://localhost:3000') : undefined;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin without path or credentials.');
  }
  const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (process.env.NODE_ENV === 'production' && (url.protocol !== 'https:' || isLoopback)) {
    throw new Error('Production site URL must use HTTPS and a public hostname.');
  }
  return url;
}
export function isPreview(): boolean {
  return Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production');
}
