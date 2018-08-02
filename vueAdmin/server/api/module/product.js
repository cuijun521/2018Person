var express = require('express');
var router = express.Router();
var http = require('http');
var db = require('../../config/db')

// http.get('http://fanyi.baidu.com/langdetect?query=Credentials', function(data) {
//   console.log(data)
// })

/* GET home page. */
router.get('/list', function(req, res, next) {
  let {
    page,
    pageSzie
  } = req.query;
  let sql = 'select * from product';
  if (page) {
    sql = `select * from product LIMIT ${page*pageSzie}, ${pageSzie}`
  }

  db.query(sql, [], (error, results) => {
    if (error) throw error;
    res.json(results)
  })
  // var callbackFn = req.query.callback
  // res.cookie('islogin', 'sucess', { maxAge: 1000*60*60*1000 });//设置cookie，maxAge为过期时长，毫秒为单位，此处设置一分钟
  // if (callbackFn) {
  //   res.send(callbackFn+'("ASDASDASD")')
  // } else {
  //   res.json({
  //     code: 1,
  //     data: [123,23,4]
  //   })
  // }
});

router.put('/list', function(req, res, next) {
  var callbackFn = req.query.callback
  res.json({
    code: 1,
    data: [123,23,4]
  })
});

router.post('/add', (req, res) => {
  const {
    name,
    describe,
    background,
    picture,
    price,
    spec,
    content,
    constituent,
    ingredient,
    stock,
  } = req.body;
  const date = (+new Date())+'';
  const sql = 'insert into product (`name`,`describe`,`background`,`picture`,`price`,`spec`,`content`,`constituent`,`ingredient`,`stock`,`startTime`) values(?,?,?,?,?,?,?,?,?,?,?)';
  db.query(sql, [
    name,
    describe,
    background,
    picture,
    price,
    spec,
    content,
    constituent,
    JSON.stringify(ingredient),
    stock,
    date,
  ], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/detail', function(req, res, next) {
  const {
    id
  } = req.query;
  let sql = 'select * from product where id = ?'
  db.query(sql, [id], (error, results) => {
    if (error) throw error;
    const data = results[0];
    data.spec = JSON.parse(data.spec)
    res.json(data);
  })
});

router.get('/index-product-list', function(req, res, next) {
  let sql = 'select * from  classify';
  db.query(sql, [], (error, results) => {
    if (error) throw error;
    let count = 0;
    results.forEach((item, index) => {
      if (item.list) {
        const listArr = JSON.parse(item.list).join(',')
        let sql = 'select * from product where id in (' + listArr +')'
        db.query(sql, [], function (error, results2) {
          count += 1
          if (error ) throw error;
          item.list = results2
          if (count == results.length) {
            res.json(results)
          }
        })
      } else {
        count+=1;
      }
    })
    // results.forEach((item, index) => {
    //   if (item.list) {
    //     const listArr = JSON.parse(item.list)
    //     const newList = [];
    //     listArr.forEach((id, index2) => {
    //       let sql = 'select * from product where id=?';
    //       db.query(sql, [id], (error, results2) => {
    //         if (error) throw error;
    //         newList.push(results2[0])
    //         if (index2 == listArr.length-1) {
    //           item.list = newList;
    //         }

    //         if (index == results.length-1) {
    //           res.json(results)
    //         }
    //       })
    //     })
    //   }
    // });

  })
});

module.exports = router;
