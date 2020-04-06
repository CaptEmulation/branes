import React from 'react'
import '@branes/www/styles/main.css'
import '@branes/www/styles/typography.css'
import 'react-calendar/dist/Calendar.css'
import '@branes/www/services/sentry'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}
