const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'xym',
    database: 'lechun_db'
})

db.connect((error) => {
    if (error) {
        console.log('连接失败')
    } else {
        console.log('数据库连接成功')
    }
});

module.exports = db;