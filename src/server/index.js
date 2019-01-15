import express from 'express'
import { render } from './utils'

//因为webpack支持ES Module，所以可以改写为import这种形式，但是编译完成后还是使用的require()这种语法
const app = express()
//只要express发现请求了一个静态资源文件，那么express就会帮你去‘/public’下找
app.use(express.static('public'))

app.get('*', function(req, res) {
  res.send(render(req))
})

const server = app.listen(3000)
