import express from 'express';
import Home from './containers/Home';
import React from 'react';
import { renderToString } from 'react-dom/server';

//因为webpack支持ES Module，所以可以改写为import这种形式，但是编译完成后还是使用的require()这种语法
const app = express();
const content =  renderToString(<Home />);

app.get('/', function(req, res) {
  res.send(
  `<html>
    <head>
      <title>SSR</title>
    </head>
    <body>${content}</body>
  </html>`
  );
});

const server = app.listen(3000);