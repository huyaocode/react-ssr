const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const PORT = 8899;
const loginFile = path.join(__dirname, './isLogin.json');
const transitionFile = path.join(__dirname, './assert/transition.json');

app.get('/api/newsList', (req, res) => {

  try {
    fs.readFile(path.join(__dirname + '/assert/news.json'), (err, data) => {
      res.send(JSON.parse(data))
    })
  } catch (e) {
    res.send('')
  }
})

// 判读是否登陆成功
app.get('/api/isLogin', (req, res) => {
  let data = readFile(loginFile);
  res.json(data);
})

// 登陆
app.get('/api/login', (req, res) => {
  let isLogin = {
    success: true,
    data: {
      login: true,
    }
  };
  isLogin = JSON.stringify(isLogin);
  writeFile(loginFile, isLogin);
  res.send(isLogin);
})

// 退出
app.get('/api/logout', (req, res) => {
  let isLogin = {
    success: true,
    data: {
      login: false,
    }
  };
  isLogin = JSON.stringify(isLogin);
  writeFile(loginFile, isLogin);
  res.send(isLogin)
})

// 翻译接口
app.get('/api/translationList', (req, res) => {
  let data = JSON.parse(JSON.stringify(readFile(loginFile)));
  let readData = data.data;
  if (readData.login) {
    let transitionInfo = readFile(transitionFile);
    res.json({
      success: true,
      data: transitionInfo
    });
  } else {
    res.json({
      success: false,
      data: { login: false }
    });
  }
});

app.get('/', (req, res) => {
  res.send('来啦~老弟!')
})

function readFile(fileName) {
  let data = fs.readFileSync(fileName, 'utf-8');
  return JSON.parse(data);
}

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, 'utf-8', err => {
    if (err) {
      console.log(err);
    } else {
      return true;
    }
  });
}

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}!`))