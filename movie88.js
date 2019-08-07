const request = require("request")
const cheerio = require("cheerio")
const connection = require("./db")
const rua = {}

function movie88s (callback){
  request("https://www.88ys.cc/",(err,res,body)=>{
    if(!err && res.statusCode){
      let $ = cheerio.load(body);
      let content = $(".index-tj-l ul li a")
      let list = []
      content = Array.from(content)
      content.forEach((item)=>{
        let str = item.attribs.href.split("/")
        let myid = str[str.length-1].split(".")[0]
        let obj = {
          id:myid,
          name:item.children[0].attribs.alt,
          pic:item.children[0].attribs["data-original"],
          url:"https://www.88ys.cc/"+ item.children[0].parent.attribs.href
        }
        list.push(obj)
      })
      list.forEach((item,index)=>{
        let sql = 'UPDATE movie_list SET name = ?,title = ?,url = ?,pic = ? WHERE id = ' + item.id
        let addSqlParams = [item.name,item.name,item.url,item.pic]
        connection.query(sql,addSqlParams,(err,result)=>{
          if(err){
            console.log("adderr"+err)
            return
          }
          // console.log("更新成功")
        })
      })
      callback(list)
    }
  })
}
rua.movie88s = movie88s
module.exports = rua
