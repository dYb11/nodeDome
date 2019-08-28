/**
 * Created by dyb on 2018/1/2.
 */

//创建一个新的数据库方法对象

function scfk(router,db) {
    //创建路由


    var cSql  = "select * from scfk";
    //通过对象调用函数创建连接
    /*<% args.forEach(function(row){
        var aa=row.substring(0,test.length);
        if(aa.equals(test)){%>
        <li><%=row%></li>
        <%    }
        })%>*/
    //调用函数接收数据
    router.get("/action/scfk.js?",function(req,res) {
        //获取数据库中的数据
        db.query(cSql,null,function(result) {
            //req.query：获取URL的查询参数串
            console.log(result);
            var par=req.query;
            if(par.ss){
                var sk="";
                //遍历数据库中的数据与url参数串比较
                result.data.forEach(function(row){
                    console.log(row.sc_vl);
                    //将数据库中的数据进行截取
                    var aa=row.sc_vl.substring(0,par.ss.length);
                    console.log(aa+" "+par.ss);
                    //比较传来的参数和数据库中截取到的数据是否一至
                    if(par.ss==aa){
                        console.log(row);
                        sk+=row.sc_vl+",";
                    }
                });
                //向页面发送数据
                res.send({"args": sk});
            }
        })
    })
	

}

module.exports=scfk;
