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
  selectAllArticlesOfUsers: 'select uf.username,uf.city,a.userId,articleId,title,text,typeId,file,a_click from mw_article a inner join userinfo uf on a.userId = uf.userId',
  selectAllArticleOfUser: 'select articleId,title,text,typeId,file,a_click from mw_article where userId=?',
  insertArticle: 'insert mw_article(userId,title,text,typeId,create_time) values (?,?,?,?,?)',
  // userInfo表（用户详情表）
  updateUserBaseInfo: 'update userInfo set username=?,sex=?,city=?,date=?,description=?,update_time=? where userId=?',
  updateUserAvatar: 'update userInfo set avatar=?,update_time=? where userId=?',
  selectUserSettingInfo: 'SELECT * FROM userInfo WHERE userId = ?',
  insertInitUserInfo: 'insert userInfo(userId,username,avatar,create_time) values (?,?,?,?)',
  // user_fans表（关注和粉丝表）
  selectFollow: 'SELECT count(*) follow FROM user_fans WHERE fansId = ?',
  selectFollowInfo: 'SELECT avatar,userId,username FROM userinfo WHERE userId IN (SELECT userId FROM user_fans WHERE fansId=?)',
  selectFocusUserInfo: 'SELECT avatar,userId,username,sex FROM userinfo WHERE userId IN (SELECT userId FROM user_fans WHERE fansId=?)',
  selectFocusArticleInfo: 'SELECT a.userId,title FROM mw_article a WHERE a.userId IN (?)',
  selectFocusFansInfo: 'SELECT userId, fansId FROM user_fans a WHERE userId IN (?)',
  selectFans: 'SELECT count(*) fans FROM user_fans WHERE userId = ?',
  selectFansId: 'SELECT fansId FROM user_fans WHERE userId = ?',
  insertUser_fans: 'insert user_fans(userId,fansId,create_time) values (?,?,?)'
}

module.exports = sqlMap;
