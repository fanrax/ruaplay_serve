let request  = require("request")
const connection = require("./db")
const rua = {}
// "[图片]https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0"
//status=0 高评分
function movie(status,cb){
  request("https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0",(err,res,body)=>{
    let hshowList =[]
    let sshowList =[]
    if(!err && res.statusCode == 200){
      let data = JSON.parse(res.body)
      data.subjects.forEach((item)=>{
        if(Number(item.rate)>7){
          hshowList.push(item)
        }else{
          sshowList.push(item)
        }
      })
    }
    hshowList.forEach((item)=>{
      let sql = "UPDATE movie_list SET name = ?,title = ?,url = ?,pic = ? WHERE id = " + item.id
      let sqlData = [item.title,item.title,item.url,item.cover]
      connection.query(sql,sqlData,(err,result)=>{
        if(err){
          console.log("更新出错"+err)
          return
        }
      })
    })
    
    cb(status==0?hshowList:sshowList)
  })
}
rua.movie = movie
module.exports = rua