const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
const API_URL = process.env.API_URL || 'http://apollo:4000/graphql'

export default function(req, res, next) {
  proxy.web(req, res, {
    target: API_URL,
    changeOrigin: true
  })
}
