import localFont from 'next/font/local';

/** IBM Plex Sans (latin, 400–700), the file Google Fonts serves. Bundled because next/font/google can fail the build at random on Google's extensionless font URLs (vercel/next.js#99114). */
export const plexSans = localFont({src: './fonts/ibm-plex-sans-latin.woff2', weight: '400 700', display: 'swap', variable: '--font-plex-sans'});
