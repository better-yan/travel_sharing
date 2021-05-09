var backSqlMap = {
  // admin表（管理员表）
  selectAdminByPage: 'SELECT * FROM admin WHERE adName LIKE ? or email LIKE ? or mobile LIKE ? limit ?,?',
  selectAdminInfo: 'SELECT * FROM admin WHERE adName = ? and adPassword = ?',
  selectAdminInfobyName: 'SELECT * FROM admin WHERE adName = ?',
  selectAdminTotal: 'SELECT count(*) count FROM admin WHERE adName LIKE ? or email LIKE ? or mobile LIKE ?',
  updateAdminPwd: 'update admin set adPassword=?,update_time=? where adName=? and adPassword=?',
  updateAdminRole: 'update admin set adType=?,update_time=? where adId=?',
  updateAdminBaseInfo: 'update admin set email=?, mobile=?,update_time=? where AdId=?',
  insertAdmin: 'insert admin(adName,adPassword, email, mobile,token,create_time) values (?,?,?,?,?,?)',
  deleteAdmin: 'delete from admin where adId=?',

  // userinfo表（用户表）
  selectUserByPage: 'SELECT * FROM userinfo WHERE username LIKE ? or sex LIKE ? or email LIKE ? or userId LIKE ? or city LIKE ? limit ?,?',
  selectUserTotal: 'SELECT count(*) count FROM userinfo WHERE username LIKE ? or sex LIKE ? or email LIKE ? or userId LIKE ? or city LIKE ?',
  deleteAllInfoOfUser: 'delete from user where userId=?;\
  delete from userinfo where userId=?;\
  delete from user_fans where userId=? or fansId=?;\
  delete from private_msg where sender_id=? or receiver_id=?;\
  delete from mw_reply where from_uid=? or to_uid=?;\
  delete from mw_question where userId=?;\
  delete from mw_article where userId=?;\
  delete from leave_msg where sender_id=? or receiver_id=?;',
  // article表 （网站上传的文章表）
  selectAllArticlesByPage: 'select uf.username,a.userId,a.articleId,a.title,a.text,a.typeId,a.state,a.file,a.a_click,a.a_like,a.create_time from \
   mw_article a inner join userinfo uf on a.userId = uf.userId \
    WHERE uf.username LIKE ? or a.title LIKE ? or a.a_click LIKE ? or a.a_like LIKE ? limit ?,?',
  selectArticlesTotal: 'select count(*) count from \
  mw_article a inner join userinfo uf on a.userId = uf.userId \
   WHERE uf.username LIKE ? or a.title LIKE ? or a.a_click LIKE ? or a.a_like LIKE ?',
  updateArticleState: 'update mw_article set state=?,update_time=? where articleId=?',
  selectAllQuestionByPage: 'select COUNT(q.qid) cmt,q.userId,q.qid,q.title,q.typeId,q.description,q.tags,q.q_click,q.create_time from \
  mw_question q LEFT OUTER JOIN  mw_reply r on q.qid=r.topic_id \
  WHERE q.title LIKE ? or q.q_click LIKE ? or q.tags LIKE ? \
  GROUP BY q.qid ORDER BY q.create_time desc limit ?,?',
  selectQuestionTotal: 'select count(*) count from \
  mw_question q \
   WHERE q.title LIKE ? or q.q_click LIKE ? or q.tags LIKE ?',
  updateQuestionType: 'update mw_question set typeId=?,update_time=? where qid=?',
  selectAllAnswerByPage: 'select * from mw_reply r \
  WHERE r.topic_id LIKE ? or r.topic_title LIKE ? or r.content LIKE ? or r.from_uid LIKE ? or r.to_uid LIKE ? \
  ORDER BY r.create_time desc limit ?,?',
  selectAnswerTotal: 'select count(*) count from \
  mw_reply r \
  WHERE r.topic_id LIKE ? or r.topic_title LIKE ? or r.content LIKE ? or r.from_uid LIKE ? or r.to_uid LIKE ? ',
  selectMyWayNum: ' SELECT COUNT(*) count FROM user WHERE create_time LIKE ?\
  UNION ALL\
  SELECT COUNT(*) count FROM mw_article WHERE create_time LIKE ?\
  UNION ALL\
  SELECT COUNT(*) count FROM mw_question WHERE create_time LIKE ?\
  UNION ALL\
  SELECT COUNT(*) count FROM mw_reply WHERE create_time LIKE ?\
  UNION ALL\
  SELECT COUNT(*) count FROM private_msg WHERE send_time LIKE ?\
  UNION ALL\
  SELECT COUNT(*) count FROM user_fans WHERE create_time LIKE ?',

}
module.exports = backSqlMap;
