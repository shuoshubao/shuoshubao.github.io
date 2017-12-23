const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')

const projectConfig = require('./project.config')

const app = new Koa()

app.use(bodyParser())
app.use(serve(`${__dirname}/dist`))

app.listen(projectConfig.port)
