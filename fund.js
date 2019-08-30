const request = require("request")

const rua = {}
function fund(callback){
    request("http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=1&letter=&gsid=&text=&sort=zrdwjz,desc&page=1,200&dt=1567069488468&atfc=&onlySale=0",(err,res,body)=>{
        if(err){console.log(err)}
        let abc = body.split("=")[1].split(":")
        let result = abc[2].substring(0,abc[2].length-6)
        let doitArr = JSON.parse(result)
        let newResult = []
        doitArr.forEach((item)=>{
            let res = {}
            res.code = item[0]
            res.name = item[1]
            res.oneOtherDay = item[3]
            res.twoOtherDay = item[5]
            res.rate = item[8]
            res.subState = item[9]
            res.redeemState = item[10]
            res.service = item[17]
            res.tobuy = item[19]
            newResult.push(res)
        })
        callback(newResult)
    })
}
rua.fund = fund
module.exports = rua