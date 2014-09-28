_ = require 'lodash'
express = require 'express'
fs = require 'fs'
http = require 'http'
path = require 'path'

app = express()
target = fs.readlinkSync '../target'

app.use express.logger 'dev'
app.set 'json spaces', 0
app.use '/static', express.static path.join __dirname, '../public'
app.use '/target', express.static target
app.get '/dir', (req, res) ->
  res.json
    target: target,
    files: scanDir target + '/'
app.get '/', (req, res) ->
  res.sendfile path.join __dirname, "../public/index.html"

http.createServer(app).listen 3000

scanDir = (path) ->
  _.map fs.readdirSync(path), (name) ->
    item = name: name
    if fs.statSync(path + name).isDirectory()
      item.children = scanDir path + name + '/'
    item
