let request  = require("request")
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
    cb(status==0?hshowList:sshowList)
  })
}
rua.movie = movie
module.exports = rua