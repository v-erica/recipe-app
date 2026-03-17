import app from '#app'
import { createServer } from 'vite'
import express from 'express'
import path from 'node:path'
import fs from 'node:fs'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const HOST = process.env.HOST || '127.0.0.1'
const isProd = process.env.NODE_ENV === 'production'
const parsedPort = Number.parseInt(process.env.PORT || '', 10)
const PORT = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort < 65536 ? parsedPort : 5173
const parsedHmrPort = Number.parseInt(process.env.HMR_PORT || '', 10)
const HMR_PORT =
  Number.isInteger(parsedHmrPort) && parsedHmrPort > 0 && parsedHmrPort < 65536
    ? parsedHmrPort
    : 24678

if (!isProd) {
  const vite = await createServer({
    server: {
      middlewareMode: true,
      host: HOST,
      hmr: {
        host: HOST,
        clientPort: HMR_PORT,
        port: HMR_PORT,
      },
    },
    appType: 'spa',
  })

  app.use(vite.middlewares)

  app.use(async (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next()
    }

    try {
      const template = await fs.promises.readFile(
        path.resolve(process.cwd(), 'index.html'),
        'utf8'
      )
      const page = await vite.transformIndexHtml(req.originalUrl, template)
      res.status(200).setHeader('Content-Type', 'text/html')
      res.send(page)
    } catch (error) {
      vite.ssrFixStacktrace(error)
      next(error)
    }
  })
} else {
  app.use(express.static(path.resolve(process.cwd(), 'dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'))
  })
}

app.listen(PORT, HOST, () => {
  console.log(`Recipe server running: http://${HOST}:${PORT}`)
})
