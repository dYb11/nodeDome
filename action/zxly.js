/**
 * Created by dyb on 2018/1/4.
 */
function zxly(router,db) {

    /*var cSql  = "select * from scfk";*/
    //通过对象调用函数创建连接
    /*<% args.forEach(function(row){
     var aa=row.substring(0,test.length);
     if(aa.equals(test)){%>
     <li><%=row%></li>
     <%    }
     })%>*/
    //调用函数接收数据
    router.get("/action/zxly.js?",function(req,res) {
        //获取数据库中的数据

            //req.query：获取URL的查询参数串
            var par=req.query;
            var nc=par.nc;
            var qq=par.qq;
            var em=par.em;
            var zt=par.zt;
            var nr=par.nr;
            var fsql = "insert into ly_zx(ly_name,ly_qq,ly_email)values(?,?,?)";
            var tsql = "insert into ly_nr(nr_zt,nr_ly,nr_id)values(?,?,?)";
            console.log(nc+" "+qq+" "+em+" "+zt+" "+nr);
            console.log(fsql+" "+tsql);
            var addfsql=[nc,qq,em];
            var addtsql=[zt,nr];
            db.waterfall(fsql,tsql,addfsql,addtsql,function(result){
                console.log(result);
                if(result!=null){
                    res.send({"args":result});
                }
            });

            })


}

module.exports=zxly;
