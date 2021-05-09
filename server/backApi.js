const {
  call
} = require('file-loader');

const mysql = require('mysql');
const dbConfig = require('./db');
const backSqlMap = require('./backSqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true // 多语句查询
});
const jwt = require('jsonwebtoken');
const e = require('express');
const {
  query
} = require('express');
const jwtSecret = "travel"
module.exports = {

  /**
   * 网站运营员注册登录页面
   * @param {req} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 按分页查询所有管理员信息
  getAdminList(req, res, next) {
    var query = "%" + req.query.query + "%";
    var pagenum = req.query.pagenum;
    var pagesize = req.query.pagesize;
    var startNum = (pagenum - 1) * pagesize;
    var endIndex = pagenum * pagesize;
    var adminInfo;
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectAdminByPage;
      connection.query(sql, [query, query, query, startNum, endIndex], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          adminInfo = result;
          sql = backSqlMap.selectAdminTotal;
          connection.query(sql, [query, query, query], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              // console.log(result)
              res.send({
                state: 0,
                result: adminInfo,
                total: result[0].count,
                message: '查询成功!'
              })
            }
          })
        }
        connection.release();
      })
    })
  },
  //查询某一管理员的注册信息
  getLoginInfo(req, res, next) {
    var adName = req.query.adName;
    var adPassword = req.query.adPassword;
    console.log(adName, adPassword)
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectAdminInfo;

      connection.query(sql, [adName, adPassword], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '登录失败!'
          })
        } else {
          console.log('result', result)
          if (result.length == 0 || result == undefined) {
            res.send({
              state: -1,
              message: '用户名或密码错误!'
            })
          } else {
            res.send({
              state: 0,
              adName: result[0].adName,
              token: result[0].token,
              adType: result[0].adType,
              message: '登录成功!'
            })
          }
        }
        connection.release();
      })
    })
  },
  // 管理员注册
  AddAdminInfo(req, res, next) {

    adName = req.body.adName,
      adPassword = req.body.adPassword,
      email = req.body.email,
      mobile = req.body.mobile;
    var token = jwt.sign({
      adName,
      adPassword
    }, jwtSecret)

    pool.getConnection((err, connection) => {
      var sql = backSqlMap.insertAdmin;
      var createTime = new Date();
      connection.query(sql, [adName, adPassword, email, mobile, token, createTime], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '注册失败!'
          })
        } else {
          res.send({
            state: 0,
            message: '注册成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 修改管理员角色
  setAdminRole(req, res, next) {
    // console.log(req.params.AdId)
    var AdId = req.params.AdId,
      adType = req.body.adType;

    pool.getConnection((err, connection) => {
      var sql = backSqlMap.updateAdminRole;
      var updateTime = new Date();
      connection.query(sql, [AdId, updateTime, adType], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else {
          console.log(result)
          res.send({
            state: 0,
            message: '修改成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 修改管理员基本信息
  setAdminInfo(req, res, next) {

    console.log("112", req.body);
    var AdId = req.params.AdId,
      email = req.body.email;
    mobile = req.body.mobile;

    pool.getConnection((err, connection) => {
      var sql = backSqlMap.updateAdminBaseInfo;
      var updateTime = new Date();
      connection.query(sql, [email, mobile, updateTime, AdId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else {
          res.send({
            state: 0,
            message: '修改成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 获得管理员相关的信息
  getAdminInfo(req, res, next) {
    var adName = req.query.adName;
    console.log("getAdminInfo", adName)
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectAdminInfobyName;
      connection.query(sql, [adName], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        }
        res.send({
          state: 0,
          result: result[0],
          message: '查询成功!'
        })
        connection.release();
      })
    })
  },
  // 删除管理员
  delAdminInfo(req, res, next) {

    console.log("112", req.body);
    var AdId = req.params.AdId;

    pool.getConnection((err, connection) => {
      var sql = backSqlMap.deleteAdmin;
      connection.query(sql, [AdId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else {
          res.send({
            state: 0,
            message: '修改成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 修改管理员密码
  setSettingPwd(req, res, next) {

    var adName = req.body.adName;
    var adPassword = req.body.adPassword;
    var oldPwd = req.body.oldPwd;
    console.log(adPassword, adName, oldPwd)
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.updateAdminPwd;
      var updateTime = new Date();
      connection.query(sql, [adPassword, updateTime, adName, oldPwd], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else if (result['affectedRows'] === 0) {
          res.send({
            state: -1,
            message: '原密码错误!'
          })
        } else {
          res.send({
            state: 0,
            message: '修改成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 分页查询用户信息
  getUserList(req, res, next) {
    var query = "%" + req.query.query + "%";
    var pagenum = req.query.pagenum;
    var pagesize = req.query.pagesize;
    var startNum = (pagenum - 1) * pagesize;
    var endIndex = pagenum * pagesize;
    var userInfo;
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectUserByPage;
      connection.query(sql, [query, query, query, query, query, startNum, endIndex], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          userInfo = result;
          sql = backSqlMap.selectUserTotal;
          connection.query(sql, [query, query, query, query, query], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              console.log(result)
              res.send({
                state: 0,
                result: userInfo,
                total: result[0].count,
                message: '查询成功!'
              })
            }
          })
        }
        connection.release();
      })
    })
  },
  // 删除用户
  delUserInfo(req, res, next) {

    var userId = req.params.userId;
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.deleteAllInfoOfUser;
      connection.query(sql, [userId, userId, userId, userId, userId, userId, userId, userId, userId, userId, userId, userId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else {
          console.log(result)
          res.send({
            state: 0,
            message: '修改成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 分页查询游记信息
  getNoteList(req, res, next) {
    var query = "%" + req.query.query + "%";
    var pagenum = req.query.pagenum;
    var pagesize = req.query.pagesize;
    var startNum = (pagenum - 1) * pagesize;
    var endIndex = pagenum * pagesize;
    var userInfo;
    console.log(query)
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectAllArticlesByPage;
      connection.query(sql, [query, query,
        query, query, startNum, endIndex
      ], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          userInfo = result;
          sql = backSqlMap.selectArticlesTotal;
          connection.query(sql, [query, query,
            query, query
          ], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              console.log(result)
              res.send({
                state: 0,
                result: userInfo,
                total: result[0].count,
                message: '查询成功!'
              })
            }
          })
        }
        connection.release();
      })
    })
  },
  // 审核游记
  setNoteListOfState(req, res, next) {

    var state = req.params.state;
    var articleId = req.params.Id;
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.updateArticleState;
      var updateTime = new Date();
      connection.query(sql, [state, updateTime, articleId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else {
          console.log(result)
          res.send({
            state: 0,
            message: '修改成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 分页查询游记信息
  getQAList(req, res, next) {
    var query = "%" + req.query.query + "%";
    var pagenum = req.query.pagenum;
    var pagesize = req.query.pagesize;
    var startNum = (pagenum - 1) * pagesize;
    var endIndex = pagenum * pagesize;
    var userInfo;
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectAllQuestionByPage;
      connection.query(sql, [query, query,
        query, startNum, endIndex
      ], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          userInfo = result;
          userInfo.forEach(element => {
            element.tags = JSON.parse(element.tags)
          });
          sql = backSqlMap.selectQuestionTotal;
          connection.query(sql, [query, query,
            query
          ], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              console.log(result)
              res.send({
                state: 0,
                result: userInfo,
                total: result[0].count,
                message: '查询成功!'
              })
            }
          })
        }
        connection.release();
      })
    })
  },
  // 设置热门
  setQuestionListOfState(req, res, next) {

    var state = req.params.state;
    var qId = req.params.Id;
    console.log(state, qId)
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.updateQuestionType;
      var updateTime = new Date();
      connection.query(sql, [state, updateTime, qId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else {
          console.log(result)
          res.send({
            state: 0,
            message: '修改成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 分页查询回答信息
  getAnswerList(req, res, next) {
    var query = "%" + req.query.query + "%";
    var pagenum = req.query.pagenum;
    var pagesize = req.query.pagesize;
    var startNum = (pagenum - 1) * pagesize;
    var endIndex = pagenum * pagesize;
    var userInfo;
    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectAllAnswerByPage;
      connection.query(sql, [query, query,
        query, query, query, startNum, endIndex
      ], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          userInfo = result;
          sql = backSqlMap.selectAnswerTotal;
          connection.query(sql, [query, query, query, query,
            query
          ], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              console.log(result)
              res.send({
                state: 0,
                result: userInfo,
                total: result[0].count,
                message: '查询成功!'
              })
            }
          })
        }
        connection.release();
      })
    })
  },

  /**
   * 获取首页麦味网数据信息
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getMyWayNumInfo(req, res, next) {
    var date = new Date();
    var y = date.getFullYear()
    var m = (date.getMonth() + 1 + "").padStart(2, '0')
    var d = (date.getDate() + "").padStart(2, '0')
    var query = "%" + y + '-' + m + '-' + d + "%"

    pool.getConnection((err, connection) => {
      var sql = backSqlMap.selectMyWayNum;
      connection.query(sql, [query, query,
        query, query, query, query
      ], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          var oDataList = [];
          result.forEach(element => {
            oDataList.push(element["count"])
          });
          res.send({
            state: 0,
            result: oDataList,
            message: '查询成功!'
          })
        }
        connection.release();
      })
    })
  },

}
