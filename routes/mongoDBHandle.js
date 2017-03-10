/**
 * Created by samel on 17/3/10.
 */
var mongoose = require("mongoose");
//这里看看后续如何配置环境变量
var db = mongoose.connect("admin:t7BdEPiq@db2.daocloudinternal.io:60150/temp_db");
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : { type: String },                    //用户账号
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date},                       //最近登录时间
    userAddress :{ type: String},
    userWord :{ type: String},
    userImgPath: { type: String},
    lat : { type: Number},
    lng :{ type:Number}
});

module.exports = mongoose.model('UserUpload',UserSchema);