import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // dev-only plugin: expose a simple endpoint to add users to data_users.js
    {
      name: 'dev-add-user',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.method === 'POST' && req.url === '/__add-user') {
            try {
              let body = ''
              for await (const chunk of req) body += chunk
              const payload = JSON.parse(body || '{}')
              const filePath = path.join(process.cwd(), 'src', 'datasource', 'data_users.js')
              // import current users by reading file and evaluating
              const module = await import('file://' + filePath + '?t=' + Date.now())
              const users = module.users || module.default || []
              // basic uniqueness check
              if (users.find(u => u.login === payload.login)) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'login_exists' }))
                return
              }
              if (users.find(u => u.email === payload.email)) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'email_exists' }))
                return
              }
              const maxId = users.reduce((m, u) => (u.id > m ? u.id : m), 0)
              const newUser = Object.assign({
                id: maxId + 1,
                name: payload.name || '',
                email: payload.email || '',
                login: payload.login || '',
                password: payload.password || '',
                role: payload.role || 'client',
                favorites: payload.favorites || [],
                registeredEvents: payload.registeredEvents || []
              }, payload)
              users.push(newUser)
              const out = 'const users = ' + JSON.stringify(users, null, 4) + '\n\nexport { users };\n'
              await fs.promises.writeFile(filePath, out, 'utf8')
              res.statusCode = 200
              res.end(JSON.stringify({ ok: true, user: newUser }))
            } catch (e) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: String(e) }))
            }
            return
          }
          next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
