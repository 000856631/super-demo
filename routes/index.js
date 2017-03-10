var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var UserUpload = require('./mongoDBHandle.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 上传*/
router.post('/file/uploading', function(req, res, next){
  // Get our form values. These rely on the "name" attributes

  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/files/'});
  //上传完成后处理

  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);

    if(err){
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var userName = fields.username[0];
      var inputWord =  fields.inputWord[0];       // Set our collection
      var address = fields.address[0];
      var lat = fields.lat[0];
      var lng = fields.lng[0];
      var inputFile = files.inputFile[0];
      var uploadedPath = inputFile.path;
      // var dstPath = './public/files/' + inputFile.originalFilename;
      //重命名为真实文件名
      // fs.rename(uploadedPath, dstPath, function(err) {
      //   if(err){
      //     console.log('rename error: ' + err);
      //   } else {
      //     console.log('rename ok');
      //   }
      // });
      var user = new UserUpload({
        "username" : userName,
        "userWord" : inputWord,
        "userAddress" : address,
        "lat" : lat,
        "lng" : lng,
        "userImgPath":uploadedPath
      })
      user.save(function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        }
        else {
          // If it worked, set the header so the address bar doesn't still say /adduser
          // res.location("userlist");
          // And forward to success page
          // res.redirect("userlist");
          console.log('插入数据成果'+userName);
        }
      });
    }

    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: filesTmp}));
  });
});
/* GET usetlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});
/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  var collection = db.get('usercollection');        // Submit to the DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // If it worked, set the header so the address bar doesn't still say /adduser
      res.location("userlist");
      // And forward to success page
      res.redirect("userlist");
    }
  });
});
module.exports = router;
