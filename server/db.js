// 数据库连接配置
module.exports = {
    mysql: {
      host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
      user: 'root', 
      password: 'root', // root 密码
      database: 'travelSharing', // 数据库名
      port: '3306'
    }
  }



// const mysql = require('mysql');

// const mysqlConfig = {
//   host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
//   user: 'root', 
//   password: 'root', // root 密码
//   database: 'travelSharing', // 数据库名
//   port: '3306'
// }
// const pool = mysql.createPool({
//   host: mysqlConfig.host,
//   user: mysqlConfig.user,
//   password: mysqlConfig.password,
//   database: mysqlConfig.database,
//   port: mysqlConfig.port,
//   multipleStatements: true    // 多语句查询
// });

// var setValue = function() {
//   pool.getConnection((err, connection) => {
//     var sql = 'INSERT INTO test(id, name) VALUES (2, "blog22")'
//     connection.query(sql, (err, result) => {
//         console.log(result);
//         connection.release();
//     })
//   })
// }

// setValue();

// 查询数据，？ 的值填入 connection.jquery 的第二个参数（数组）中
// WHERE id = ? AND name = ? ---> connetion.query(sql, [1, "blog"], () => )
// var getValue = function() {
//     pool.getConnection((err, connection) => {
//       var sql = 'SELECT * FROM test WHERE id = ?'
//       connection.query(sql, [1], (err, result) => {
//           console.log(result);
//           connection.release();
//       })
//     })
//   }
//   getValue();
  
//   /*
//   $ node db.js
//   [ RowDataPacket { id: '1', name: 'blog' } ]
//   */
  
//   // 更新数据
//   var updValue = function() {
//     pool.getConnection((err, connection) => {
//       var sql = 'UPDATE test SET name = ? WHERE id = ?'
//       connection.query(sql, [22, 1], (err, result) => {
//           console.log(result);
//           connection.release();
//       })
//     })
//   }
//   updValue();
  
//   // 删除数据
//   var delValue = function() {
//     pool.getConnection((err, connection) => {
//       var sql = 'DELETE FROM test WHERE id = ?'
//       connection.query(sql, [1], (err, result) => {
//           console.log(result);
//           connection.release();
//       })
//     })
//   }
//   delValue();