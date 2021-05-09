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
   * @param {req} req 
   * @param {*} res 
   * @param {*} next 
   */
  //查询某一用户注册信息
  getLoginInfo(req, res, next) {
    var userId = req.query.userId;
    var password = req.query.password;
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
          if (result.length == 0 || result == undefined) {
            res.send({
              state: -1,
              message: '用户名或密码错误!'
            })
          } else {
            res.send({
              state: 0,
              username: result[0].username,
              userId: result[0].userId,
              token: result[0].token,
              message: '登录成功!'
            })
          }
        }
        connection.release();
      })
    })
  },

  // 用户注册
  setSignInfo(req, res, next) {

    var userId = req.body.userId,
      username = req.body.username,
      password = req.body.password;
    var token = jwt.sign({
      userId,
      username
    }, jwtSecret)

    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertUser;
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
    console.log("getSettingInfo", userId)
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
        console.log(result[0], result[0].username, "getLeaveMsgOfUser")
        res.send({
          state: 0,
          username: result[0].username,
          sex: result[0].sex,
          email: result[0].email,
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
      email = req.body.email,
      sex = req.body.sex,
      city = req.body.city,
      date = req.body.date,
      description = req.body.desc;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateUserBaseInfo;
      var updateTime = new Date();
      connection.query(sql, [username, sex, email, city, date, description, updateTime, userId], (err, result) => {
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
        connection.release();
      })
    })
  },
  // 添加文章
  addArticle(req, res, next) {

    var userId = req.body.userId;
    var title = req.body.title;
    var text = req.body.text;
    var file = req.body.file;
    var typeId = req.body.typeId;
    var a_likeList = '[]';
    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertArticle;
      var createTime = new Date();
      connection.query(sql, [userId, title, text, file, typeId, a_likeList, createTime], (err, result) => {
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
  // 删除文章
  delArticle(req, res, next) {
    var articleId = req.params.Id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteArticle;
      connection.query(sql, [articleId], (err, result) => {
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
  //  给文章点击率加一
  addArticleClick(req, res, next) {

    var articleId = req.body.articleId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateA_ClickNum;
      var update_time = new Date();
      connection.query(sql, [update_time, articleId], (err, result) => {
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
  //  给文章点赞数加一
  addOneArticleLike(req, res, next) {

    var a_likeList = req.body.a_likeList;
    var articleId = req.body.articleId;
    console.log(a_likeList)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateA_LikeNumAndList;
      var update_time = new Date();
      connection.query(sql, [a_likeList, update_time, articleId], (err, result) => {
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
  //  给文章点赞数减一
  delOneArticleLike(req, res, next) {

    var a_likeList = req.body.a_likeList;
    var articleId = req.body.articleId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateAndDel_A_LikeNumAndList;
      var update_time = new Date();
      connection.query(sql, [a_likeList, update_time, articleId], (err, result) => {
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
  // 查询某一用户的所有文章点击数以及点赞数
  getArticleCountOfUser(req, res, next) {

    var userId = req.query.userId;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectArticleCountOfUser;
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
  // 查询某一用户的一篇文章（按articleId查询
  getOneArticleInfo(req, res, next) {

    var articleId = req.query.articleId;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectOneArticleOfUser;
      connection.query(sql, [articleId], (err, result) => {

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
    var dataMap = {};
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectFocusUserInfo;

      connection.query(sql, [userId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          this.getUserOtherInfo(connection, req, res, result)
        }
        connection.release();
      });
    });
  },
  // 查询某一用户的粉丝详细信息
  getUse_fansDetailInfo(req, res, next) {

    var userId = req.query.userId;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectfansUserInfo;

      connection.query(sql, [userId], (err, result) => {

        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          this.getUserOtherInfo(connection, req, res, result)
        }
        connection.release();
      });
    });
  },
  getUserOtherInfo(connection, req, res, result) {
    var userList = [];
    var dataMap = {};
    if (result.length === 0) {
      res.send({
        state: 0,
        result: {
          followInfo: [],
          followArticleInfo: [],
          follow_fansInfo: []
        },
        message: '查询成功,为空!'
      })
    } else {
      dataMap["followInfo"] = result;
      for (var i = 0; i < result.length; i++) {
        userList.push(result[i].userId);
      }
      sql = sqlMap.selectFocusArticleInfo;
      connection.query(sql, [userList], (err, result) => {

        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          dataMap["followArticleInfo"] = result;
          sql = sqlMap.selectFocusFansInfo;
          connection.query(sql, [userList], (err, result) => {

            if (err) {
              console.log('err', err)
              res.send({
                state: 1,
                message: '查询失败!'
              })
            } else {
              dataMap["follow_fansInfo"] = result;
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
  },
  // 用户进行关注
  setUser_follow(req, res, next) {

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
  },
  // 用户取消关注
  deleteUser_follow(req, res, next) {


    var userId = req.body.userId;
    var fansId = req.body.fansId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteUser_fans;
      connection.query(sql, [userId, fansId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '删除失败!'
          })
        } else {
          res.send({
            state: 0,
            message: '删除成功!'
          })
        }
        connection.release();
      })
    })
  },
  /**
   * 问答模块
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 添加问题
  addQuestion(req, res, next) {

    var userId = req.body.userId;
    var title = req.body.title;
    var description = req.body.description;
    var tags = JSON.stringify(req.body.tags);
    var targetCity = JSON.stringify(req.body.targetCity);
    var typeId = req.body.typeId;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertQuestion;
      var create_time = new Date();
      connection.query(sql, [userId, typeId, title, description, tags, targetCity, create_time], (err, result) => {
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
  // 添加答案
  addAnswer(req, res, next) {

    var topic_id = req.body.topic_id;
    var content = req.body.content;
    var topic_title = req.body.topic_title;
    var from_id = req.body.from_id;
    var to_id = req.body.to_id;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertReply;
      var create_time = new Date();
      connection.query(sql, [topic_id, topic_title, content, from_id, to_id, create_time], (err, result) => {
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
  //  给某问题点击率加一
  addQuestionClick(req, res, next) {

    var qid = req.body.qid;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateQ_ClickNum;
      var update_time = new Date();
      connection.query(sql, [update_time, qid], (err, result) => {
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
  //  我的回答状态信息变为已看
  setQuestionStatus(req, res, next) {

    var qid = req.body.qid;
    var to_uid = req.body.to_uid;
    console.log(to_uid, qid)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateR_Status;
      var update_time = new Date();
      connection.query(sql, [update_time, qid, to_uid], (err, result) => {
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
  // 查询所有问题
  getUserInfoOfReply(req, res, next) {

    var topic_id = req.query.topic_id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectUserInfOfReply;
      connection.query(sql, [topic_id], (err, result) => {
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
  // 查询所有问题
  getAllQuesInfo(req, res, next) {

    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectAllQuesInfo;
      connection.query(sql, [], (err, result) => {
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
  // 查询热门回答的问题
  getHotanswerInfo(req, res, next) {
    var filter = "%" + req.query.searchInfo + "%";
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectHotanswerInfo;
      connection.query(sql, [filter], (err, result) => {
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
  // 查询最新回答的问题
  getNewanswerInfo(req, res, next) {
    var filter = "%" + req.query.searchInfo + "%";
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectHasAnswerInfo;
      connection.query(sql, [filter], (err, result) => {
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
  // 查询未有回答的问题
  getUnanswerInfo(req, res, next) {

    var filter = "%" + req.query.searchInfo + "%";
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectUnanswerInfo;
      connection.query(sql, [filter], (err, result) => {
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
  // 查询问题详情信息
  getQuesDelInfo(req, res, next) {

    var filter = req.query.qid;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectQuesInfoByQId;
      connection.query(sql, [filter], (err, result) => {
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
  // 查询问题详情信息
  getReplyInfo(req, res, next) {

    var filter = req.query.qid;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectReplyInfoByQId;
      connection.query(sql, [filter], (err, result) => {
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
  // 查看用户收到的回答消息
  getReplyMsgOfUser(req, res, next) {

    var userId = req.query.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectAllReplyMsgOfUser;
      // var updateTime = new Date();
      connection.query(sql, [userId], (err, result) => {
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
            result: result,
            message: '查询成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 查看用户的问题或回答信息
  getQuesOrAnsInfo(req, res, next) {

    var userId = req.query.userId;
    var page = req.query.page;

    pool.getConnection((err, connection) => {
      if (page == "question") {
        var sql = sqlMap.selectQuestionInfoOfUser;
      } else if (page == "answer") {
        var sql = sqlMap.selectAnswerInfoOfUser;
      }
      connection.query(sql, [userId], (err, result) => {
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
            result: result,
            message: '查询成功!'
          })
        }
        connection.release();
      })
    })
  },
  /**
   * 私信模块
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 添加一条私信
  addOnePrivateMsg(req, res, next) {

    var sender_id = req.body.sender_id;
    var receiver_id = req.body.receiver_id;
    var msg_type = req.body.msg_type;
    var msg_content = req.body.msg_content;
    var status = req.body.status;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertOnePriMsg;
      var createTime = new Date();
      connection.query(sql, [sender_id, receiver_id, msg_type, msg_content, status, createTime], (err, result) => {
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
  // 查看私信消息
  getPriMsgOfUser(req, res, next) {

    var userId = req.query.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectAllPriMsgOfUser;
      connection.query(sql, [userId, userId, userId, userId], (err, result) => {
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
  // 查看是否存在新的私信消息
  getNewInfoOfUser(req, res, next) {

    var userId = req.query.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectNewPriMsgOfUser;
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
  // 查询当前登录用户与某用户的新消息
  getEachPriMsgOfUser(req, res, next) {

    var loginUserId = req.query.loginUserId;
    var userId = req.query.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectEachPriMsgOfUser;
      var updateTime = new Date();
      connection.query(sql, [updateTime, userId, loginUserId, userId, userId, loginUserId], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '查询失败!'
          })
        } else {
          res.send({
            state: 0,
            result: result[1],
            message: '查询成功!'
          })
        }
        connection.release();
      })
    })
  },
  /**
   * 留言模块
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 添加一条留言
  addOneLeaveMsg(req, res, next) {

    var sender_id = req.body.sender_id;
    var receiver_id = req.body.receiver_id;
    var leave_content = req.body.leave_content;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertOneLeaveMsg;
      var createTime = new Date();
      connection.query(sql, [sender_id, receiver_id, leave_content, createTime], (err, result) => {
        if (err) {
          console.log('err', err)
          res.send({
            state: 1,
            message: '添加失败!'
          })
        } else {
          res.send({
            state: 0,
            result: result,
            message: '添加成功!'
          })
        }
        connection.release();
      })
    })
  },
  // 查看留言消息
  getLeaveMsgOfUser(req, res, next) {

    var receiver_id = req.query.receiver_id;
    console.log(receiver_id)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectLeaveMsgOfUser;
      connection.query(sql, [receiver_id], (err, result) => {
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
   * 搜索模块
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 按分类查询
  getSearchContent(req, res, next) {

    var part = req.query.part;
    var question = "%" + req.query.question + "%";
    console.log(part)

    pool.getConnection((err, connection) => {
      var sql;
      switch (part) {
        case "all":
          sql = sqlMap.selectAllContent;
          break
        case "destination":
          sql = sqlMap.selectContentByDes;
          break
        case "note":
          sql = sqlMap.selectContentByNote;
          break
        case "qa":
          sql = sqlMap.selectContentByQA;
          break
      }
      connection.query(sql, [question, question, question, question], (err, result) => {
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
   * 用户旅游地图模块
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  // 添加一个旅游地
  setUserTravelMap(req, res, next) {

    var userId = req.body.userId;
    var travelMap = JSON.stringify(req.body.travelMap);
    console.log(req.body)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateUserTMap;
      var updateTime = new Date();
      connection.query(sql, [travelMap, updateTime, userId], (err, result) => {
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
  getUserTravelMap(req, res, next) {

    var userId = req.query.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectTMapOfUser;
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
            result: result[0].travelMap,
            message: '查询成功!'
          })
        }
        connection.release();
      })
    })
  },
}
