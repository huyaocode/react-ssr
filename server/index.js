const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.get('/assert/*', (req, res) => {
  const filename = path.basename(req.path)
  try {
    fs.readFile(path.resolve('./assert/' + filename), (err, data) => {
      res.send(JSON.parse(data))
    })
  } catch (e) {
    res.send('')
  }
})

app.listen(8520, () => console.log('Example app listening on port 8520!'))
