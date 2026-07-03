// Server-side entry used only at build time by scripts/prerender.mjs.
// Renders the full app to an HTML string for a given URL path so every
// route ships real, crawlable content.
import { renderToString } from 'react-dom/server'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'

export { routeMeta, metaForPath } from './seo-meta'

export function render(path: string): string {
  ;(globalThis as { __SSR_PATH__?: string }).__SSR_PATH__ = path
  return renderToString(
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  )
}
