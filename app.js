/**
 * Created by dyb on 2018/1/4.
 */
var express = require('express');
var Db=require('./db/db.js');
var app = express();
var url= require("url");
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static( __dirname+"/public"));
var bodyParser = require('body-parser');//加载此模块在body中去获取参数
app.use(bodyParser.urlencoded({extended:false}));//参数方式是字符串
var router = express.Router();

/*
app.use(session({
    name: identityKey,
    secret: 'chyingp',  // 用来对session id相关的cookie进行签名
    //store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}));
*/



app.locals.basePath = "http://localhost:3001/";

/*直接访问模版需要输入.ejs后辍*/
app.get('/ee/*', function(req, res,next){
    var pagePath= url.parse(req.url).pathname;
    if(pagePath.indexOf(".ejs")!=-1){
        pagePath=pagePath.substr(1);
        pagePath=pagePath.substr(0,pagePath.length-4);
        res.render(pagePath);
    }else {
        next();
    }
});

	app.get("/action/pc?",function(req,res) {
        var page = req.param('page');  //获取get请求中的参数 page
			console.log("page: "+page);
			var Res = res;  //保存，防止下边的修改
			//url 获取信息的页面部分地址
			//var url = 'http://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=';
			var url='https://www.cdhappy.info/a/login'
			https.get(url+page,function(res){  //通过get方法获取对应地址中的页面信息
				var chunks = [];
				var size = 0;
				res.on('data',function(chunk){   //监听事件 传输
					chunks.push(chunk);
					size += chunk.length;
				});
				res.on('end',function(){  //数据传输完
					var data = Buffer.concat(chunks,size);  
					var html = data.toString();
				    console.log(html);
					var $ = cheerio.load(html); //cheerio模块开始处理 DOM处理
					var jobs = [];

					var jobs_list = $(".hot_pos li");
					$(".hot_pos>li").each(function(){   //对页面岗位栏信息进行处理  每个岗位对应一个 li  ,各标识符到页面进行分析得出
						var job = {};
						job.company = $(this).find(".hot_pos_r div").eq(1).find("a").html(); //公司名
						job.period = $(this).find(".hot_pos_r span").eq(1).html(); //阶段
						job.scale = $(this).find(".hot_pos_r span").eq(2).html(); //规模

						job.name = $(this).find(".hot_pos_l a").attr("title"); //岗位名
						job.src = $(this).find(".hot_pos_l a").attr("href"); //岗位链接
						job.city = $(this).find(".hot_pos_l .c9").html(); //岗位所在城市
						job.salary = $(this).find(".hot_pos_l span").eq(1).html(); //薪资
						job.exp = $(this).find(".hot_pos_l span").eq(2).html(); //岗位所需经验
						job.time = $(this).find(".hot_pos_l span").eq(5).html(); //发布时间

						console.log(job.name);  //控制台输出岗位名
						jobs.push(job);  
					});
					Res.json({  //返回json格式数据给浏览器端
						jobs:jobs
					});
				});
			});
        })


var scfk=require('./action/scfk.js');
var p =new scfk(router,Db);

var pac=require('./action/pac.js');
var p =new pac(router);



var zxly=require('./action/zxly.js');
var b =new zxly(router,Db);

var Testgetjson=require('./action/Testgetjson.js');
var c =new Testgetjson(router);

app.use("/",router);
var server=app.listen(3001,function afterListen(){
    console.log("express running ....");
});
