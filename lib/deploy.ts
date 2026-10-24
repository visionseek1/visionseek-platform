/**
 * Which deployment this build is. Vercel sets VERCEL_ENV at build and at request time.
 * Server code only: the browser bundle never sees VERCEL_ENV.
 */

/** The live site (visionseek.org). */
export const isLiveSite = () => process.env.VERCEL_ENV === 'production';

/**
 * Vercel previews and `next dev`. A build without VERCEL_ENV (CI, any other host) is treated like the live site,
 * so preview-only material can never leak there by accident.
 */
export const isPreviewBuild = () => process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';
