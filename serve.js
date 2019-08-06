
const express = require('express')
const app = express()
const data_douban = require("./reptile")
const data_movie88s = require("./movie88")


app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})




app.listen(2333, ()=>{
    //豆瓣高评分电影
    data_douban.movie(0,(data)=>{
      app.get("/more/list/:id",(req,res)=>{
        console.log(req.params.id)
        data.forEach((item)=>{
          res.send(item.id == req.params.id ? item : "id不存在")
        })
      })
    })
    // //88影视网
    data_movie88s.movie88s((data)=>{
      app.get("/movie88s",(req,res)=>{
        res.send(data)
      })
    })
    // 打印一下
    console.log('http://127.0.0.1:2333')
})  





