import serverlessHttp from 'serverless-http'
import express from 'express'

import serverRender from '_server/ssr'

const app = express()

app.get('/', (_, res) => {
  const pageData = {
    notes: [{ id: '123', title: 'First note', description: 'Hello world' }],
  }
  res.send(serverRender(pageData))
})

const handler = serverlessHttp(app)

export const main = async (event: any, context: any) => {
  const result = await handler(event, context)
  return result
}
