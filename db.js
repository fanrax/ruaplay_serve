var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});
 
connection.connect((err)=>{
  if(err){
    console.log("abbc"+err)
    return
  }
  console.log("success")
});


module.exports = connection
 
// let sql  = 'SELECT * FROM movie_list'
// //查
// connection.query(sql,(err,result)=>{
//   if(err){
//     console.log("query"+err)
//     return
//   }
//   console.log(result)
// })



// let addSql = "INSERT INTO movie_list(id,name,title,url,pic) VALUES(0,?,?,?,?)"
// let addSqlParams = ["rua","ojbk","http://www.baidu.com","http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg"]
// connection.query(addSql,addSqlParams,(err,result)=>{
//   if(err){
//     console.log(err)
//     return 
//   }
//   console.log(result)
// })