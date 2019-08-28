
/*
连接池参数说明
 acquireTimeout:10000 获取连接等待超时的时间，默认为10000。
 waitForConnections:true   当没有可用连接时，如果为true则连接池队列等待至获取到连接，如果为false则
                           立即返回没有连接可用的错误，默认为true.
 connectionLimit：10       创建最大连接数,默认10
 queueLimit:0   在getConnection返回连接之前，连接池队列的最大数量，默认为0不限制。
 连接池队列说明:
       当多个用户请求获取连接时，需要排队获取。
* */
var mysql = require('mysql');
var async = require("async");
   function data(status,message,data){
       var result = {
           "status": status,
           "message": message,
           "data":data
       }
       return result;
   }
   (function Db(){
           var pool = mysql.createPool({
               host: 'localhost',
               user: 'dyb',
               password: '1743721550',
               database: 'test',
               port: 3306,
               acquireTimeout:10000,
               connectionLimit:10
           });
           Db.query=function(sql,sqlParams,callback){
               pool.getConnection(function(err,con){
                   if(err){
                      throw "数据连接异常:"+err;
                   }else{
                       var result=null;
                       con.query(sql,sqlParams,function(err,rows,fields){
                           con.release();
                           if (err){
                                 result = new data("500",err,null)
                           }else{
                                 result = new data("200","success",rows)
                           }
                           callback(result);
                       });
                   }
               });
             }
           Db.count = function(sql,callback){
               var cSql  = "select count(*) as count from ("+sql+") tt";
               this.query(sql,function(result){
                       if(result.status==500)
                           throw result.message;
                            callback(result.data[0].count);
               })
           }
           Db.pagingQuery = function(sql,cP,count,callback){
               var currentPage = 1;
               var pageSize = 3;
               count=parseInt(count);
               if(cP!=null&&(typeof cP)!=undefined){
                   currentPage=parseInt(cP);
               }
               var limitSql="select * from ("+sql+")pp limit "+((currentPage-1)*pageSize)+","+pageSize;
               var maxPage = (count + pageSize - 1) / pageSize;
               maxPage = parseInt(maxPage);
               if (currentPage > maxPage) {
                   currentPage = maxPage;
               }
               if (currentPage < 1) {
                   currentPage = 1;
               }
               this.query(limitSql,function(result){
                   if(result.status==500)
                       throw result.message;
                   callback(result.data,currentPage,maxPage);
               })
           }
          /*分页查询数据顺序*/
           Db.limtQuery =function(sql,cP,callback){
              Db.count(sql,function(result){//第一步查询出总条目数。
                   Db.pagingQuery(sql,cP,result.data[0].count,function(data,currentPage,maxPage){//第二步通过总条目数分页查询数据。
                       callback(data,currentPage,maxPage);
                   });
               })
           }


           Db.execTrans = function(sqlParamsEntities,params,callback){
               pool.getConnection(function(err,connection){
                       var funAry = [];
                   //以指定的隔离级别启动数据库事务。
                       connection.beginTransaction(function(err){
                                 if(err){
                                   throw err;
                                 }
                                 sqlParamsEntities.forEach(function (sql,i) {
                                     console.log(sql+"   "+i);
                                     var func = function(callback) {
                                           connection.query(sql, params[i++], function (err, rows, fields) {
                                             if (err) {
                                                // connection.rollback();
                                                 //throw err;
                                             } else {
                                                 callback(null,"ok");
                                             }
                                         });
                                     }
                                     funAry.push(func);
                                 })
                                async.series(funAry, function (err, result){
                                      if(err){
                                          /*result.insertId*/
                                          //connection.rollback()
                                          connection.release();
                                          throw err;
                                      }else{
                                          connection.commit();
                                          connection.release();
                                          callback();
                                      }
                                })
                       })
              })
          }
            Db.waterfall=function(fsql,tsql,addfsql,addtsql,fun){
                //从连接池获得连接
                pool.getConnection(function(err,connection){
                    //开启事务
                    connection.beginTransaction(function(err){
                        if(err){
                            throw err;
                        }
                        //async异步 waterfall函数 瀑布流
                        async.waterfall([
                            function(callback){
                                console.log(fsql);
                              connection.query(fsql,addfsql,function(err,result){
                                  if(err){
                                      console.log("数据添加失败1:"+err);
                                      return
                                  }
                                  callback(null,result.insertId)
                              })
                            },function(id,callback){
                                //var tsql="insert into ly_nr(nr_zt,nr_ly,nr_id)values("+zt+","+nr+"";
                                addtsql.push(id);
                                console.log(tsql);
                                connection.query(tsql,addtsql,function(err,result){
                                    if(err){
                                        console.log("数据添加失败2:"+err);
                                        connection.rollback();
                                    }
                                    //提交数据
                                    connection.commit();
                                    connection.release();
                                    callback(null,'ok')
                                })
                            }
                        ],function(err,result){
                            fun(result)
                        })
                    })
                })
            }
          module.exports=Db;
 }())

