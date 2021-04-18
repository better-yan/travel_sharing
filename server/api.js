const {
  call
} = require('file-loader');

const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

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
const jwtSecret = "travel"
module.exports = {

  getValue(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  setValue(req, res, next) {
    console.log(req.body);
    var id = req.body.id,
      name = req.body.name;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [name, id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  /**
   * 麦味主页获取数据集
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getMyWayInfo(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectAllArticlesOfUsers;
      connection.query(sql, [], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        }
        res.send({
          state: 0,
          result: result,
          message: '查询成功!'
        })
        connection.release();
      })
    })
  },
  /**
   * 用户注册登录页面
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 查询所有用户注册信息
  getAllUsers(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectAllUsers;
      connection.query(sql, [], (err, result) => {
        res.json(result);
        console.log("查询所有用户注册信息");
        connection.release();
      })
    })
  },
  //查询某一用户注册信息
  getLoginInfo(req, res, next) {
    var userId = req.query.userId;
    var password = req.query.password;
    console.log(userId, password)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectUserInfo;

      connection.query(sql, [userId, password], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '登录失败!'
          })
        } else {
          console.log('result', result)
          res.send({
            state: 0,
            username: result[0].username,
            userId: result[0].userId,
            token: result[0].token,
            message: '登录成功!'
          })
        }
        connection.release();
      })
    })
  },

  // 用户注册
  setSignInfo(req, res, next) {

    console.log(req.body);

    var userId = req.body.userId,
      username = req.body.username,
      password = req.body.password;
    var token = jwt.sign({
      userId,
      username
    }, jwtSecret)

    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertUser;
      // console.log(userId,password)
      // console.log(token)
      var createTime = new Date();
      connection.query(sql, [userId, username, password, token, createTime], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '注册失败!'
          })
        } else {
          sql = sqlMap.insertInitUserInfo;
          var avatar = "..\\uploads\\initAvatar.png"
          connection.query(sql, [userId, username, avatar, createTime], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '注册失败!'
              })
            }
            res.send({
              state: 0,
              username: username,
              userId: userId,
              token: token,
              message: '注册成功!'
            })
          })
        }
        connection.release();
      })
    })
  },
  // 获得用户相关的信息
  getSettingInfo(req, res, next) {
    var userId = req.query.userId;
    console.log(userId)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectUserSettingInfo;

      connection.query(sql, [userId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        }

        console.log(result)
        // console.log(result[0].username)
        res.send({
          state: 0,
          username: result[0].username,
          sex: result[0].sex,
          city: result[0].city,
          date: result[0].date,
          desc: result[0].description,
          avatar: result[0].avatar,
          message: '查询成功!'
        })
        connection.release();
      })
    })
  },
  // 修改用户基本信息
  setSettingBaseInfo(req, res, next) {

    console.log("112", req.body);

    var userId = req.body.userId,
      username = req.body.username,
      sex = req.body.sex,
      city = req.body.city,
      date = req.body.date,
      description = req.body.desc;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateUserBaseInfo;
      var updateTime = new Date();
      connection.query(sql, [username, sex, city, date, description, updateTime, userId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        } else {
          sql = sqlMap.updateUserName;
          connection.query(sql, [username, updateTime, userId], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '修改失败!'
              })
            }
            res.send({
              state: 0,
              message: '修改成功!'
            })
          })
        }
        connection.release();
      })
    })
  },
  // 修改用户头像
  setSettingAvatar(req, res, next) {

    console.log("112", req.body);
    var userId = req.body.userId;
    var avatar = req.body.avatarPath;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateUserAvatar;
      var updateTime = new Date();
      connection.query(sql, [avatar, updateTime, userId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '修改失败!'
          })
        }
        res.send({
          state: 0,
          message: '修改成功!'
        })
        connection.release();
      })
    })
  },
  // 修改用户密码
  setSettingPwd(req, res, next) {

    console.log("112", req.body);
    var userId = req.body.userId;
    var password = req.body.password;
    var oldPwd = req.body.oldPwd;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateUserPwd;
      var updateTime = new Date();
      connection.query(sql, [password, updateTime, userId, oldPwd], (err, result) => {
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
        console.log(result['affectedRows'])
        connection.release();
      })
    })
  },
  // 添加文章
  addArticle(req, res, next) {

    console.log("112", req.body);
    var userId = req.body.userId;
    var title = req.body.title;
    var text = req.body.text;
    var typeId = req.body.typeId;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertArticle;
      var createTime = new Date();
      connection.query(sql, [userId, title, text, typeId, createTime], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '插入失败!'
          })
        } else {
          res.send({
            state: 0,
            message: '插入成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 查询某一用户的所有文章
  getAllArticle(req, res, next) {

    var userId = req.query.userId;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectAllArticleOfUser;
      connection.query(sql, [userId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          res.send({
            state: 0,
            result: result,
            message: '查询成功!'
          })
        }
        connection.release();
      })
    })
  },
  /**
   * 关注与粉丝模块
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 查询某一用户的关注和粉丝数
  getUser_Follow_fans(req, res, next) {

    var userId = req.query.userId;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectFollow;
      var tempArr = new Array(2);
      connection.query(sql, [userId], (err, result) => {
        console.log(result)
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          tempArr[0] = result[0].follow;

          sql = sqlMap.selectFansId;
          connection.query(sql, [userId], (err, result) => {
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              console.log(result);
              tempArr[1] = result.length;
              res.send({
                state: 0,
                foucsNum: tempArr[0],
                fansNum: tempArr[1],
                fansIdList: result,
                message: '查询成功!'
              })
            }
          })

        }
        connection.release();
      })
    })
  },
  // 查询某一用户的关注简要信息
  getUse_followInfo(req, res, next) {

    var userId = req.query.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectFollowInfo;
      var tempArr = [];
      connection.query(sql, [userId], (err, result) => {
        console.log(result)
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          console.log(result);
          res.send({
            state: 0,
            result: result,
            message: '查询成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 查询某一用户的关注详细信息
  getUse_focusDetailInfo(req, res, next) {

    var userId = req.query.userId;
    console.log(userId)
    var userList = [];
    var dataMap = {};
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectFocusUserInfo;

      connection.query(sql, [userId], (err, result) => {
        console.log(result)
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          // res.send({
          //   state: 0,
          //   result: result,
          //   message: '查询成功!'
          // })
          dataMap.foucusInfo = result;
          for (var i = 0; i < result.length; i++) {
            userList.push(result[i].userId);
          }
          sql = sqlMap.selectFocusArticleInfo;
          connection.query(sql, [userList], (err, result) => {
            console.log(result)
            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              dataMap.foucusArticleInfo = result;
              sql = sqlMap.selectFocusFansInfo;
              connection.query(sql, [userList], (err, result) => {
                console.log(result)
                if (err) {
                  console.log('err', err)
                  res.send({
                    state: 1,
                    message: '查询失败!'
                  })
                } else {
                  dataMap.foucus_fansInfo = result;
                  console.log(dataMap)
                  res.send({
                    state: 0,
                    result: dataMap,
                    message: '查询成功!'
                  })
                }
              });
            }
          });
        }
        connection.release();
      });
    });
  },
  // 用户进行关注
  setUser_follow(req, res, next) {

    console.log("112", req.body);
    var userId = req.body.userId;
    var fansId = req.body.fansId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertUser_fans;
      var createTime = new Date();
      connection.query(sql, [userId, fansId, createTime], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '插入失败!'
          })
        } else {
          res.send({
            state: 0,
            message: '插入成功!'
          })
        }
        connection.release();
      })
    })
  }

}
