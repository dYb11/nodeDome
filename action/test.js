/**
 * Created by dyb on 2018/1/5.
 */
var mysql = require('mysql');
var async = require("async");
waterfall=function() {
    var fsql = "insert into ly_zx(ly_name,ly_qq,ly_email)values(?,?,?)";
    var tsql = "insert into ly_nr(nr_zt,nr_ly,nr_id)values(?,?,?)";
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'dyb',
        password: '1743721550',
        database: 'test',
        port: 3306,
        acquireTimeout:10000,
        connectionLimit:10
    });
    var nc="a";
    var qq="a";
    var em="a";
    var zt="a";
    var nr="a";
    var addfsql=[nc,qq,em];
    var addtsql=[zt,nr];
    pool.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            async.waterfall([
                function (callback) {
                    console.log(fsql);
                    connection.query(fsql,addfsql,function (err, result) {
                        if (err) {
                            console.log("数据添加失败1:" + err);
                            return
                        }
                        callback(null, result.insertId)
                    })
                }, function (id, callback) {
                    //var tsql="insert into ly_nr(nr_zt,nr_ly,nr_id)values("+zt+","+nr+"";
                    addtsql.push(id);
                    console.log(tsql);
                    connection.query(tsql,addtsql,function (err, result) {
                        if (err) {
                            console.log("数据添加失败2:" + err);
                            //connection.rollback();
                            callback(err,null);
                        }
                        callback(null, "ok")
                    })
                }, function (err, result) {
                    console.log(result);
                }
            ])
        })
    })
}
waterfall();