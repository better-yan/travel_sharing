const express = require('express');
const path = require('path');
const router = express.Router();
const api = require('./api');
const backApi = require('./backApi');
const multer = require('multer');

const backMenuList = require('./backMenuList');

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
  console.log("==============================================");
  console.log(req.file);
  // res.statusCode = 404;
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

// 注册
router.post('/sign', (req, res, next) => {
  console.log('post')
  api.setSignInfo(req, res, next);
});
router.get('/myway', (req, res, next) => {
  console.log('get')
  api.getMyWayInfo(req, res, next);
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
router.delete('/delArticle/:Id', (req, res, next) => {
  console.log('/delArticle/:Id')
  api.delArticle(req, res, next);
});
// 文章点击
router.post('/addArticleClick', (req, res, next) => {
  console.log('addArticleClick')
  api.addArticleClick(req, res, next);
});
router.get('/getAllArticle', (req, res, next) => {
  console.log('getAllArticle')
  api.getAllArticle(req, res, next);
});
router.get('/getArticleCountOfUser', (req, res, next) => {
  console.log('getArticleCountOfUser')
  api.getArticleCountOfUser(req, res, next);
});
router.get('/getOneArticleInfo', (req, res, next) => {
  console.log('getOneArticleInfo')
  api.getOneArticleInfo(req, res, next);
});
router.post('/addOneArticleLike', (req, res, next) => {
  console.log('addOneArticleLike')
  api.addOneArticleLike(req, res, next);
});
router.post('/delOneArticleLike', (req, res, next) => {
  console.log('delOneArticleLike')
  api.delOneArticleLike(req, res, next);
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
// 查询某一用户的关注详细信息
router.get('/getFansDetailInfo', (req, res, next) => {
  console.log('getFansDetailInfo')
  api.getUse_fansDetailInfo(req, res, next);
});
// 进行关注
router.post('/setUser_follow', (req, res, next) => {
  console.log('setUser_follow')
  api.setUser_follow(req, res, next);
});
// 取消关注
router.post('/deleteUser_follow', (req, res, next) => {
  console.log('deleteUser_follow')
  api.deleteUser_follow(req, res, next);
});
/**
 * 问答模块
 */
router.post('/addQuestion', (req, res, next) => {
  console.log('addQuestion')
  api.addQuestion(req, res, next);
});
router.post('/addAnswer', (req, res, next) => {
  console.log('addAnswer')
  api.addAnswer(req, res, next);
});
// 问题详情浏览人数加一
router.post('/addQuestionClick', (req, res, next) => {
  console.log('addQuestionClick')
  api.addQuestionClick(req, res, next);
});
// 我的回答状态信息变为已看
router.post('/setQuestionStatus', (req, res, next) => {
  console.log('setQuestionStatus')
  api.setQuestionStatus(req, res, next);
});

router.get('/getUserInfoOfReply', (req, res, next) => {
  console.log('getUserInfoOfReply')
  api.getUserInfoOfReply(req, res, next);
});
router.get('/getAllanswerInfo', (req, res, next) => {
  console.log('getAllQuesInfo')
  api.getAllQuesInfo(req, res, next);
});
router.get('/getHotanswerInfo', (req, res, next) => {
  console.log('getHotanswerInfo')
  api.getHotanswerInfo(req, res, next);
});
router.get('/getNewanswerInfo', (req, res, next) => {
  console.log('getNewanswerInfo')
  api.getNewanswerInfo(req, res, next);
});
router.get('/getUnanswerInfo', (req, res, next) => {
  console.log('getUnanswerInfo')
  api.getUnanswerInfo(req, res, next);
});
// 得到详细的问题信息（通过qid查找）
router.get('/getQuesDelInfo', (req, res, next) => {
  console.log('getQuesDelInfo')
  api.getQuesDelInfo(req, res, next);
});
// 获取问题回答相关信息
router.get('/getReplyInfo', (req, res, next) => {
  console.log('getReplyInfo')
  api.getReplyInfo(req, res, next);
});
// 查看用户收到的回答消息
router.get('/getReplyMsgOfUser', (req, res, next) => {
  console.log('getReplyMsgOfUser')
  api.getReplyMsgOfUser(req, res, next);
});
// 查看用户的问题或回答信息
router.get('/getQuesOrAnsInfo', (req, res, next) => {
  console.log('getQuesOrAnsInfo')
  api.getQuesOrAnsInfo(req, res, next);
});

/**
 * 私信模块
 */
// 添加一条私信消息
router.post('/addOnePrivateMsg', (req, res, next) => {
  console.log('addOnePrivateMsg')
  api.addOnePrivateMsg(req, res, next);
});
// 查看私信消息
router.get('/getPriMsgOfUser', (req, res, next) => {
  console.log('getPriMsgOfUser')
  api.getPriMsgOfUser(req, res, next);
});
//按发送者查询新消息数
router.get('/getNewInfoOfUser', (req, res, next) => {
  console.log('getNewInfoOfUser')
  api.getNewInfoOfUser(req, res, next);
});
//查询当前登录用户与某用户的新消息
router.get('/getEachPriMsgOfUser', (req, res, next) => {
  console.log('getEachPriMsgOfUser')
  api.getEachPriMsgOfUser(req, res, next);
});

/**
 * 留言模块
 */
// 添加一条留言消息
router.post('/addOneLeaveMsg', (req, res, next) => {
  console.log('addOneLeaveMsg')
  api.addOneLeaveMsg(req, res, next);
});
router.get('/getLeaveMsgOfUser', (req, res, next) => {
  console.log('getLeaveMsgOfUser')
  api.getLeaveMsgOfUser(req, res, next);
});

/**
 * 搜索模块
 */
router.get('/getSearchContent', (req, res, next) => {
  console.log('getSearchContent')
  api.getSearchContent(req, res, next);
});
// 用户旅游地图模块
router.post('/userTravelMap', (req, res, next) => {
  console.log('userTravelMap')
  api.setUserTravelMap(req, res, next);
});
router.get('/userTravelMap', (req, res, next) => {
  console.log('userTravelMap')
  api.getUserTravelMap(req, res, next);
});

// ==================================后台管理===========================================
/**
 * 后台页面基础数据
 */
// 获取菜单内容
router.get('/backMemu', (req, res, next) => {
  console.log('backMemu')
  var adType = req.query.adType;
  console.log(adType)
  if (adType == 1) {
    res.send({
      state: 0,
      result: backMenuList.mwAd,
      message: '查询菜单成功!'
    })
  } else if (adType == 2) {
    res.send({
      state: 0,
      result: backMenuList.sysAd,
      message: '查询菜单成功!'
    })
  } else {
    res.send({
      state: 1,
      message: '查询菜单失败!'
    })
  }
});
// 获取角色下列列表内容
router.get('/roles', (req, res, next) => {
  console.log('roles')

  res.send({
    state: 0,
    result: backMenuList.rolesList,
    message: '查询下列列表成功!'
  })
});
/**
 * 登录模块
 */
router.get('/backLogin', (req, res, next) => {
  console.log('backLogin')
  backApi.getLoginInfo(req, res, next);
});
router.get('/myWayNumInfo', (req, res, next) => {
  console.log('myWayNumInfo')
  backApi.getMyWayNumInfo(req, res, next);
});

/**
 * 管理员管理
 */
router.get('/adminList', (req, res, next) => {
  console.log('adminList')
  backApi.getAdminList(req, res, next);
});
router.post('/addAdmin', (req, res, next) => {
  console.log('addAdmin')
  backApi.AddAdminInfo(req, res, next);
});
router.put('/admin/:AdId/role', (req, res, next) => {
  console.log('/admin/:AdId/role')
  backApi.setAdminRole(req, res, next);
});

router.put('/admin/:AdId', (req, res, next) => {
  console.log('/admin/:AdId/role')
  backApi.setAdminInfo(req, res, next);
});
router.delete('/admin/:AdId', (req, res, next) => {
  console.log('/admin/:AdId')
  backApi.delAdminInfo(req, res, next);
});
/**
 * 管理员中心
 */
router.get('/getAdminInfo', (req, res, next) => {
  console.log('getAdminInfo')
  backApi.getAdminInfo(req, res, next);
});
// 修改密码
router.post('/setAdminPassword', (req, res, next) => {
  console.log('setAdminPassword')
  backApi.setSettingPwd(req, res, next);
});
/**
 * 用户管理
 */
// 查询用户
router.get('/users', (req, res, next) => {
  console.log('users')
  backApi.getUserList(req, res, next);
});
router.delete('/users/:userId', (req, res, next) => {
  console.log('/users/:userId')
  backApi.delUserInfo(req, res, next);
});
/**
 * 游记管理
 */
// 查询游记
router.get('/searchNote', (req, res, next) => {
  console.log('searchNote')
  backApi.getNoteList(req, res, next);
});
// 审核游记
router.put('/searchNote/:Id/:state', (req, res, next) => {
  console.log('searchNote/:Id')
  backApi.setNoteListOfState(req, res, next);
});
/**
 * 问答管理
 */
// 查询问题
router.get('/searchQA', (req, res, next) => {
  console.log('searchQA')
  backApi.getQAList(req, res, next);
});
// 设置热门
router.put('/searchQA/:Id/:state', (req, res, next) => {
  console.log('searchQA/:Id')
  backApi.setQuestionListOfState(req, res, next);
});
// 查询回答
router.get('/searchAnswer', (req, res, next) => {
  console.log('searchAnswer')
  backApi.getAnswerList(req, res, next);
});


module.exports = router;
