var sqlMap = {
  getValue: 'SELECT * FROM test WHERE id = ?',
  setValue: 'UPDATE test SET name = ? WHERE id = ?',
  // user表（已注册用户表）
  selectAllUsers: 'SELECT * FROM user',
  selectUserInfo: 'SELECT * FROM user WHERE userId = ? and password = ?',
  updateUserPwd: 'update user set password=?,update_time=? where userId=? and password=?',
  updateUserName: 'update user set username=?,update_time=? where userId=?',
  insertUser: 'insert user(userId,username,password,token,create_time) values (?,?,?,?,?)',
  // article表 （网站上传的文章表）
  selectAllArticlesOfUsers: 'select uf.username,uf.avatar,uf.city,a.userId,a.articleId,a.title,a.text,a.typeId,a.state,a.file,a.a_click,a.a_like,a.create_time from mw_article a inner join userinfo uf on a.userId = uf.userId',
  selectAllArticleOfUser: 'select * from mw_article where userId=?',
  selectArticleCountOfUser: 'select SUM(a_click) articleClickSum,SUM(a_like) articleLikeSum from mw_article where userId=?',
  selectOneArticleOfUser: 'select * from mw_article where articleId=?',
  insertArticle: 'insert mw_article(userId,title,text,file,typeId,a_likeList,create_time) values (?,?,?,?,?,?,?)',
  updateA_ClickNum: 'update mw_article set a_click=a_click+1,update_time=? where articleId=?',
  updateA_LikeNumAndList: 'update mw_article set a_like=a_like+1,a_likeList=?,update_time=? where articleId=?',
  updateAndDel_A_LikeNumAndList: 'update mw_article set a_like=a_like-1,a_likeList=?,update_time=? where articleId=?',
  deleteArticle: 'delete from mw_article where articleId=?;',
  // userInfo表（用户详情表）
  updateUserBaseInfo: 'update userInfo set username=?,sex=?,email=?,city=?,date=?,description=?,update_time=? where userId=?',
  updateUserAvatar: 'update  userInfo set avatar=?,update_time=? where userId=?',
  updateUserTMap: 'update userInfo set travelMap=?,update_time=? where userId=?',
  selectTMapOfUser: 'SELECT travelMap FROM userInfo WHERE userId = ?',
  selectUserSettingInfo: 'SELECT * FROM userInfo WHERE userId = ?',
  insertInitUserInfo: 'insert userInfo(userId,username,avatar,create_time) values (?,?,?,?)',
  // user_fans表（关注和粉丝表）
  selectFollow: 'SELECT count(*) follow FROM user_fans WHERE fansId = ?',
  selectFollowInfo: 'SELECT avatar,userId,username FROM userinfo WHERE userId IN (SELECT userId FROM user_fans WHERE fansId=?)',
  selectFocusUserInfo: 'SELECT avatar,userId,username,sex FROM userinfo WHERE userId IN (SELECT userId FROM user_fans WHERE fansId=?)',
  selectfansUserInfo: 'SELECT avatar,userId,username,sex FROM userinfo WHERE userId IN (SELECT userId FROM user_fans WHERE userId=?)',
  selectFocusArticleInfo: 'SELECT a.userId,title FROM mw_article a WHERE a.userId IN (?)',
  selectFocusFansInfo: 'SELECT userId, fansId FROM user_fans a WHERE userId IN (?)',
  selectFans: 'SELECT count(*) fans FROM user_fans WHERE userId = ?',
  selectFansId: 'SELECT fansId FROM user_fans WHERE userId = ?',
  insertUser_fans: 'insert user_fans(userId,fansId,create_time) values (?,?,?)',
  deleteUser_fans: 'delete from user_fans where userId=? and fansId=?',
  // mw_question表（问题表）
  insertQuestion: 'insert mw_question(userId,typeId,title,description,tags,targetCity,create_time) values (?,?,?,?,?,?,?)',
  selectAllQuesInfo: 'select title,description from mw_question',
  selectHotanswerInfo: 'select uf.username,uf.avatar,q.userId,q.qid,q.title,q.description,q.create_time from mw_question q inner join userinfo uf on q.userId = uf.userId WHERE q.typeId=2 and q.title LIKE ?',
  selectHasAnswerInfo: 'select uf.username,uf.avatar,q.userId,q.qid,q.title,q.description,q.create_time from mw_question q inner join userinfo uf on q.userId = uf.userId WHERE q.typeId=1 and q.title LIKE ?',
  selectUnanswerInfo: 'select uf.username,uf.avatar,q.userId,q.qid,q.title,q.description,q.create_time from mw_question q inner join userinfo uf on q.userId = uf.userId WHERE q.typeId=0 and q.title LIKE ?',
  selectQuesInfoByQId: 'select uf.username,uf.avatar,q.userId,q.qid,q.title,q.description,q.create_time,q.tags,q.q_click,q.q_focus from mw_question q inner join userinfo uf on q.userId = uf.userId WHERE q.qid = ?',

  selectQuestionInfoOfUser: 'select COUNT(q.qid) cmt,q.qid,q.title,q.typeId,q.description,q.q_click,q.create_time from mw_question q LEFT OUTER JOIN  mw_reply r on q.qid=r.topic_id WHERE q.userId=123456 GROUP BY q.qid',
  updateQ_ClickNum: 'update mw_question set q_click=q_click+1,update_time=? where qid=?',
  // selectPageUnanswerInfo: 'select uf.username,uf.avatar,q.userId,q.qid,q.title,q.description,q.create_time from mw_question q inner join userinfo uf on q.userId = uf.userId WHERE q.typeId=0 limit ?,?',
  // mw_reply表（回答表）
  selectAnswerInfoOfUser: 'select * from mw_reply r WHERE r.from_uid=?',
  selectReplyInfoByQId: 'select * from mw_reply r WHERE r.topic_id=?',
  insertReply: 'insert mw_reply(topic_id,topic_title, content, from_uid, to_uid, create_time) values (?,?,?,?,?,?)',
  selectUserInfOfReply: 'SELECT userId,username,avatar FROM userinfo WHERE userId IN (select DISTINCT from_uid from mw_reply r WHERE r.topic_id=?)',
  updateR_Status: 'UPDATE mw_reply SET status=1,update_time=? WHERE topic_id=? AND to_uid=? AND status=0',
  selectAllReplyMsgOfUser: 'select r.topic_id,count(r.rid) count,r.topic_title,from_uid,content,r.create_time send_time,uf.username,uf.avatar from userinfo uf INNER JOIN mw_reply r on uf.userId=r.from_uid WHERE to_uid=? AND status=0 GROUP BY r.from_uid  ORDER BY r.create_time asc',
  // private_msg表（私信表）
  insertOnePriMsg: 'insert private_msg(sender_id, receiver_id, msg_type, msg_content,status, send_time) values (?,?,?,?,?,?)',
  insertOneLeaveMsg: 'insert leave_msg(sender_id, receiver_id, msg_content, send_time) values (?,?,?,?)',
  selectAllPriMsgOfUser: '  SELECT *\
  FROM\
      (SELECT receiver_id,msg_content,send_time FROM private_msg\
      WHERE\
      (sender_id = ?) AND (receiver_id <> ?)\
      UNION \
      SELECT sender_id,msg_content,send_time FROM private_msg\
      WHERE \
      (sender_id <> ?) AND (receiver_id = ?)\
      ORDER BY send_time DESC) as newTable\
  INNER JOIN \
  userinfo u on receiver_id = u.userId \
  GROUP BY receiver_id \
  ORDER BY send_time DESC',
  selectNewPriMsgOfUser: 'select COUNT(pId) count,sender_id,msg_content,send_time from private_msg pm WHERE pm.receiver_id=? AND status=0 GROUP BY sender_id',
  selectEachPriMsgOfUser: ' UPDATE private_msg SET status=1,update_time=? WHERE sender_id=? AND status=0;\
  select sender_id,msg_content,send_time,uf.username,uf.avatar from userinfo uf INNER JOIN private_msg pm on uf.userId=pm.sender_id WHERE (pm.receiver_id=? AND pm.sender_id=?) or (pm.receiver_id=? AND pm.sender_id=?) ORDER BY send_time asc',
  // leave_msg表（留言表）
  insertOneLeaveMsg: 'insert leave_msg(sender_id, receiver_id, leave_content, create_time) values (?,?,?,?)',
  selectLeaveMsgOfUser: 'select sender_id,leave_content,lm.create_time,uf.username,uf.avatar from userinfo uf INNER JOIN leave_msg lm on uf.userId=lm.sender_id WHERE lm.receiver_id=? ORDER BY lm.create_time asc',
  // 搜索模块（从各个表中）
  selectAllContent: ' SELECT articleId sId,title,typeId,text,create_time,a_click click FROM mw_article\
  WHERE title LIKE ? or text LIKE ? \
  UNION \
  SELECT qid sId,title,typeId,description,create_time,q_click click FROM mw_question\
  WHERE title LIKE ? or description LIKE ?\
  ORDER BY create_time DESC',
  selectContentByDes: 'SELECT * FROM mw_question WHERE targetCity LIKE ?',
  selectContentByNote: 'select * from mw_article where title LIKE ? or text LIKE ?',
  selectContentByQA: 'SELECT * FROM mw_question WHERE title LIKE ? or description LIKE ?',
}
module.exports = sqlMap;
