const express = require('express');
const path = require('path');
const router = express.Router();
const api = require('./api');
const multer = require('multer');

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/');
    },
    filename: function (req, file, cb) {
      var changedName = (new Date().getTime()) + '-' + file.originalname;
      cb(null, changedName);
    }
  })
});

//单个文件上传
router.post('/single', upload.single('file'), (req, res) => {
  console.log(req.file);

  res.send({
    state: 0,
    type: 'single',
    originalname: req.file.originalname,
    path: req.file.path
  })
});
//多个文件上传
router.post('/multer', upload.array('multerFile'), (req, res) => {
  console.log(req.files);
  let fileList = [];
  req.files.map((elem) => {
    fileList.push({
      originalname: elem.originalname
    })
  });
  res.json({
    code: '0000',
    type: 'multer',
    fileList: fileList
  });
});

router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});

router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next);
});
router.get('/login', (req, res, next) => {
  console.log('get')
  api.getLoginInfo(req, res, next);
});
router.post('/login', (req, res, next) => {
  // api.getAllUsers(req, res, next);
  console.log('post')
  api.setLoginInfo(req, res, next);
});
// 注册
router.post('/sign', (req, res, next) => {
  // api.getAllUsers(req, res, next);
  console.log('post')
  api.setSignInfo(req, res, next);
});
router.get('/myway', (req, res, next) => {
  console.log('get')
  api.getMyWayInfo(req, res, next);
});

// home路由（个人麦味小屋）
router.get('/home?userId', (req, res, next) => {
  console.log('get')
  // api.getMyWayInfo(req, res, next);
});
// 获取用户个人相关信息
router.get('/setting', (req, res, next) => {
  console.log('setting')
  api.getSettingInfo(req, res, next);
});
router.post('/setting', (req, res, next) => {
  console.log('setting')
  // api.getMyWayInfo(req, res, next);
});
// 设置用户基本信息
router.post('/setBaseInfo', (req, res, next) => {
  console.log('setBaseInfo')
  api.setSettingBaseInfo(req, res, next);
});
// 设置用户头像
router.post('/setAvatar', (req, res, next) => {
  console.log('setAvatar')
  api.setSettingAvatar(req, res, next);
});
// 设置用户密码
router.post('/setPassword', (req, res, next) => {
  console.log('setPassword')
  api.setSettingPwd(req, res, next);
});

/**
 * 游记模块
 */
// 插入游记
router.post('/addArticle', (req, res, next) => {
  console.log('addArticle')
  api.addArticle(req, res, next);
});
router.get('/getAllArticle', (req, res, next) => {
  console.log('getAllArticle')
  api.getAllArticle(req, res, next);
});

/**
 * 关注与粉丝模块
 */
 // 查询某一用户的关注和粉丝数
router.get('/getUser_Follow_fans', (req, res, next) => {
  console.log('getUser_fans')
  api.getUser_Follow_fans(req, res, next);
});
 // 查询某一用户的关注简要信息
router.get('/getFocusInfo', (req, res, next) => {
  console.log('getFocusInfo')
  api.getUse_followInfo(req, res, next);
});
 // 查询某一用户的关注详细信息
router.get('/getFocusDetailInfo', (req, res, next) => {
  console.log('getFocusDetailInfo')
  api.getUse_focusDetailInfo(req, res, next);
});
router.post('/setUser_follow', (req, res, next) => {
  console.log('setUser_follow')
  api.setUser_follow(req, res, next);
});

module.exports = router;
