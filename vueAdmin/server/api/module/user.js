var express = require('express');
var router = express.Router();
var db = require('../../config/db')

function getRandom() {
    return parseInt(Math.random() * 10)
}

router.get('/msmcode', (req, res) => {
    const mobile = req.query.mobile
    var code = '';
    while (code.length < 6) {
        code += '' + getRandom()
    }
    req.session.msmcode = code;
    req.session.mobile = mobile;
    res.json({
        code: code
    })
})

router.get('/info', (req, res) => {
    console.log(req.session)
    const mobile = req.cookies.token;
    const sql = 'select * from user where mobile = ?'
    db.query(sql, [mobile], (error, results) => {
        if (error) throw error;
        res.json({
            code: 0,
            data: results[0]
        })
    })
})

/* GET home page. */
router.post('/login', function (req, res, next) {
    console.log(req.session)
    const {
        msmcode
    } = req.session;
    const {
        code,
        mobile
    } = req.body

    if (code != msmcode) {
        res.status(401).json({
            code: 1,
            msg: '验证码错误'
        })
    } else {
        let sql = 'select * from user where mobile=?'
        db.query(sql, [mobile], (error, results) => {
            if (error) throw error;
            if (results.length >= 1) {
                res.cookie('token', mobile, {
                    maxAge: 1000 * 60 * 60 * 24 * 30
                });
                res.json({
                    code: 0,
                    msg: '登录成功'
                })
            } else {
                let sql = 'insert into user (mobile) values (?)';
                res.cookie('token', mobile, {
                    maxAge: 1000 * 60 * 60 * 24 * 30
                });
                db.query(sql, [mobile], (error, results) => {
                    if (error) throw error;
                    res.json({
                        code: 0,
                        msg: '登录成功'
                    })
                })
            }
        })
    }

    //   let sql = 'select * from product';
    //   db.query(sql, [], (error, results) => {
    //     if (error) throw error;
    //     res.json(results)
    //   })
});

module.exports = router;