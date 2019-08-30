
const data_douban = require("./reptile")
const data_movie88s = require("./movie88")
const data_fund = require("./fund")
const bodyparser = require('body-parser');
const connection = require("./db")
function myapi(app){
  app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
  })
  app.use(bodyparser.json())
  //豆瓣高评分电影
  //根据id来查询
  // data_douban.movie(0,(data)=>{
  //   app.get("/more/list/:id",(req,res)=>{
  //     console.log(req.params.id)
  //     data.forEach((item)=>{
  //       res.send(item.id == req.params.id ? item : "id不存在")
  //     })
  //   })
  // })
  //login
  app.post('/login', function(req, res){
    console.log(req.body);
    let obj = {}
    let  sql = `SELECT * FROM login WHERE name = '${req.body.name}'`
    //查
    connection.query(sql,function (err, result) {
      if(err||err==null&&!result[0]){
        obj.success = false
        obj.message = "该用户暂未注册"
        res.send(obj);
        return;
      }
      if(req.body.password !== result[0].password){
        obj.success = false
        obj.message = "密码错误"
        res.send(obj);
        return
      }else{
        obj.success = true
        obj.message = "登录成功"
        res.send(obj);
        return
      }
      
    });
  });

  data_douban.movie(0,(data1)=>{
    // //88影视网
    data_movie88s.movie88s((data2)=>{
      app.get("/list",(req,res)=>{
        res.send([...data1,...data2])
      })
    })
  })
  
  data_fund.fund((data)=>{
    app.get("/fund",(req,res)=>{
      res.send(data)
    })
  })

}
module.exports = myapi