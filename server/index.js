// const path = require('path');
// const express = require('express');
// const app = express();

// app.get('/api/getArticle', (req, res, next) => {
//   res.json({
//       data: '后台返回结果 getArticle'
//     })
// })

// // 监听端口
// app.listen(3000);
// console.log('success listen at port:3000......');

const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要
const express = require('express');
const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',
extended: true}));


// 后端api路由
app.use('/api', routerApi);


// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
