
function Testgetjson(router){
       /*参数可以在地址看到(登陆的时候不安全)，并且由于地址栏对参数长度的控制，因此get方法不能做大数据的提交，例如:文件上传*/
        router.get("/action/Testgetjson",function(req,res,next){
             var m=req.query.jsoncallback;
               res.write(m+"({\"key\":\"abcdef\"})");//跨域返回的数据格式
              // res.write("{\"key\":\"abcdef\"}");    //同域返回数据的格式
              res.end();
        });
       /* 如果做参数的安全提交例如用户名，或者大量的数据提交就需要用到post方法
          post方法只能表单提交，不能通过地址栏访问。
       * */
        router.post("/action/tedst.js",function(req,res,next){
        // res.send("----post提交成功----"+req.body.username+"   "+ req.body.pwd);
        res.send("----post提交成功"+req.body.username+"   "+ req.body.pwd);
        next();
    })
 }
module.exports=Testgetjson;
