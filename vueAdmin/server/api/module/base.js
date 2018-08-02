var express = require('express');
var router = express.Router();
var http = require('http');
var db = require('../../config/db')
var path = require('path');
var multer  = require('multer');//用express的第三方中间件 multer 实现文件上传功能。
//文件上传所需代码
//设置文件上传路径和文件命名
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        console.log(file)
        //文件上传成功后会放入public下的upload文件夹
        cb(null, path.join(__dirname, '../../public/upload'))
    },
    filename: function (req, file, cb){
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});


router.post('/upload', upload.single('file'), (req, res) => {
    console.log(res)
    //拼接文件上传后的网络路径，
    var url = 'http://'+ req.headers.host +'/upload/' + req.file.filename;
    //将其发回客户端
    res.json({
        code : 1,
        data : url
    });
})

router.post('/add-video', (req, res) => {
    const {
        userId, videoUrl, title
    } = req.body;

    var sql = 'insert into video (userId, videoUrl, title) values (?, ?, ?)';
    db.query(sql, [
        userId, videoUrl, title
    ], (error, results) => {
        if (error) throw error;
        res.json({
            code: 0,
            msg: '上传成功'
        })
    })
})

module.exports = router;
