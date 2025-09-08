import { canUseDOM } from './canUseDOM'

export const getServerSideURL = () => {
  // In Production, prefer the canonical production domain
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Otherwise prefer the current deployment URL (Preview deployments)
  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL
    const isLocalHost =
      host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('::1')
    const proto = isLocalHost || process.env.VERCEL_ENV === 'development' ? 'http' : 'https'
    return `${proto}://${host}`
  }

  // Explicit override via env (useful for self-hosting or non-Vercel)
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }

  // Fallback to configured production domain in Vercel project settings
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Local development default
  return 'http://localhost:3000'
}

// Always return the canonical Production domain.
// Useful for SEO, canonical tags, OG images, and sitemaps where links
// should not point at Preview deployments.
export const getProductionURL = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  // Prefer the actual browser origin when running in the client
  if (canUseDOM) {
    return window.location.origin
  }

  // On the server, mirror getServerSideURL fallbacks
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL
    const isLocalHost =
      host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('::1')
    const proto = isLocalHost || process.env.VERCEL_ENV === 'development' ? 'http' : 'https'
    return `${proto}://${host}`
  }
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}
