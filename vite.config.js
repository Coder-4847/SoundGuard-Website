import { defineConfig } from 'vite'
import { readdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Renders the page body from src/content.js so all copy is real HTML in the
// DOM (readable without JS) and editable from a single file.
function soundguardHtml() {
  const load = async (file) => import(pathToFileURL(resolve(root, file)).href + '?t=' + Date.now())
  return {
    name: 'soundguard-html',
    async transformIndexHtml(html) {
      const [{ content }, { renderBody, metaFor }] = await Promise.all([
        load('src/content.js'),
        load('src/render.js'),
      ])
      const assetsDir = resolve(root, 'public/assets')
      const assets = existsSync(assetsDir) ? readdirSync(assetsDir) : []
      const meta = metaFor(content)
      return html
        .replace(/<!--SG:(title|description|themeColor)-->/g, (_, k) => meta[k])
        .replace('<!--SG:body-->', () => renderBody(content, { assets }))
    },
    handleHotUpdate({ file, server }) {
      if (/src[\\/](content|render|svg)\.js$/.test(file)) {
        server.ws.send({ type: 'full-reload' })
        return []
      }
    },
  }
}

// Preload the (hashed) latin font file so text paints without a late swap.
function preloadFont() {
  return {
    name: 'soundguard-preload-font',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const file = Object.keys(ctx.bundle || {}).find((f) => /inter-latin-wght-normal.*\.woff2$/.test(f))
        if (!file) return html
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', href: './' + file, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [soundguardHtml(), preloadFont()],
  build: { target: 'es2020', cssMinify: true },
})
