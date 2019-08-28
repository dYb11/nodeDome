
var fs=require('fs');
var request=require('request')
var cheerio=require('cheerio');
var path=require('path');
var http=require('http')
 var https = require('https');
 
 var excelDemo=require('../action/excelDemo.js');

 
if(!fs.existsSync('pages')){
	fs.mkdirSync('pages')
}
 
 function pac(router) {
	 router.get("/pac?",function(req,res) {
		 mkdir('/')
		 //getlist('/',site)
		 var rows = ['户型','大小','楼层','年限','小区','地址','金额','售价'];
		 var data=[];
		 getajkData(site,1,data,function(data){
			 excelDemo.create(req,res,rows,data);
		 })
		 //downPic()
		 
	 })
 }

 function downPic(){
	 var u=['/upload/2019-01-17/3674c77b-bb6d-4e7f-8723-7db6ca56b839.jpg',
'/upload/2019-01-17/a5bbe5f9-e41b-4ef9-a086-428671f1756c.jpg',
'/upload/2019-03-29/2aa666d4-26dc-47a0-acc7-b1bc9b5668ab.jpg',
'/upload/2019-03-29/404f84e9-1bf9-4a0c-9cac-db283e282b47.jpg',
'/upload/2019-02-18/7a498043-1f0e-4c4f-8735-04991f9f8f39.jpg',
'/upload/2019-02-18/f0c80dc5-a6e4-4402-ae8d-f5b3b7f409c7.jpg',
'/upload/2018-12-19/2249e1b1-0d02-413f-b8a3-dfffd37e342e.jpg',
'/upload/2018-12-19/119e0e63-34c6-4d7f-8f86-0c958fdcec8c.jpg',
'/upload/2019-01-10/b42876a4-da45-4130-a8ae-b2896704e2a3.jpg',
'/upload/2019-01-10/4784883c-425f-4648-8aee-81df055cd4a0.jpg',
'/upload/2019-01-14/b0bb100f-afd5-4d88-aa75-f4524b921e7b.jpg',
'/upload/2019-01-14/e957ec8c-fc83-4598-8778-0f42deb3c156.jpg',
'/upload/2019-01-30/8a48e828-4690-437d-ab07-c69198723977.jpg',
'/upload/2019-01-30/b886b52a-348a-447a-a561-acf748e17322.jpg',
'/upload/2018-12-21/251ecdb3-7483-4aaf-bcb4-f7768fb4d8ad.jpg',
'/upload/2018-12-21/b83a4463-65c0-4530-871d-48c1940c70f5.jpg',
'/upload/2019-01-16/e6bf93a9-c502-4e66-b075-8cede2c68d60.jpg',
'/upload/2019-01-16/b44042da-362a-46b9-9036-dae102c39089.jpg',
'/upload/2019-01-23/a230ee67-7731-4835-b0ca-0b46d4155e36.jpg',
'/upload/2019-01-23/d2296d29-9299-42ec-8297-d2414d5f4f89.jpg',
'/upload/2018-12-26/1433c865-76b4-4aca-a55a-499ad892cd15.jpg',
'/upload/2018-12-26/a4d28309-8e8a-46e0-a18d-11d0664d9d77.jpg',
'/upload/2019-01-25/84640428-6f58-449c-a983-1cc7ba5e8037.jpg',
'/upload/2019-01-25/a2fb36f2-2b59-41f0-985b-d8a075b9cba9.jpg'

]
	 for(var i=0;i<u.length;i++){
		var a=site+u[i];
		//下载图片
		downimg('aaaa',a);

	}
 }
 
//var site='https://www.cdhappy.info'
var site='https://chengdu.anjuke.com/sale/pengzhoushi/o5-p1/#filtersort'
 
 
function getlist(name,url){
	request(url,function(error,res,body){
		if (!error && res.statusCode == 200) {
	    	console.log(body);    //返回请求页面的HTML
	    	gethtml(name,body);
	  	}	
	})
}


function mkdir(s){
    if(!fs.existsSync(s)){
        var a='';
        s.split('/').forEach(function(v){
            console.log(v);
            create(v);
        })
        function create(p){
            a+=p;
            if(!fs.existsSync(a)){
                fs.mkdirSync(a);
            }
            a+='/'
        }
    }
}


function gethtml(name,data){
	console.log('-----------------------------------------------\n')
	var $=cheerio.load(data);
	var urls=[]
    var a=$('.prodList a[itemprop="url"]');   
	console.log(a.length)
    for(var i=0;i<a.length;i++){
		console.log('-----------------------------------------------\n')
    	var s=a.eq(i).attr('href')
    	console.log(s)
    	getshow(name,s)
    }
}
function getshow(filename,url,callbank){
	if(!fs.existsSync('pages/'+filename)){
		fs.mkdirSync('pages/'+filename);
	}	
	request(site+url,function(error,res,body){
		console.log(body)
		if (!error && res.statusCode == 200) {	    

	    	//ditalshow(site+url,filename,body);
			//getajkData(body,callbank)
	  	}	
	})
}

function getajkData(url,num,data,callbank){
	
	//var data=[];

		request(site,function(error,res,body){
			
			
		console.log('-----------------------------')
		if (!error && res.statusCode == 200) {	    
		var $=cheerio.load(body)
			var as=$('.list-item');
			for(var i=0;i<as.length;i++){
					
					var obj={};

					
					obj['户型']=as.eq(i).find('.details-item').find('span').eq(0).text()
					obj['大小']=as.eq(i).find('.details-item').find('span').eq(1).text()
					obj['楼层']=as.eq(i).find('.details-item').find('span').eq(2).text()
					obj['年限']=as.eq(i).find('.details-item').find('span').eq(3).text()
					obj['小区']=as.eq(i).find('.details-item').find('span').eq(4).text().trim().split('\n')[0]
					obj['地址']=as.eq(i).find('.details-item').find('span').eq(4).text().trim().split('\n')[1]
				
					obj['金额']=as.eq(i).find('.unit-price').text().replace('元/m²','');
					obj['售价']=as.eq(i).find('.price-det').text().replace('万','')
					//console.log(as.eq(i).find('.unit-price').text())
					//console.log(as.eq(i).find('.price-det').text())
					data.push(obj)
				}
			}
		
		
		if(num<30){
			var a='p'+i;
			var count=i+1;
			var b='p'+count;
			url=url.replace(a,b)
			num++;
			getajkData(url,num,data,callbank)
		}else{
			callbank(data);
		}
		})
	
	
}

function ditalshow(url,filename,body){
	console.log('-----------------------------------------------\n')
	var $=cheerio.load(body)
	var as=$('body img');
	
	var txt=url+'\n';
	//图片地址
	for(var i=0;i<as.length;i++){
		console.log(as.eq(i).attr('src'))
		//var a=as.eq(i).attr('src').replace('prodTmb','prodPage');
		var a=site+'/'+as.eq(i).attr('src');
		//下载图片
		downimg(filename,a);
		console.log(a);
		txt+=a+'\n';
	}
	var c=$('.infoProdDet .originalPrice').text()  +'  '+ $('.infoProdDet .salePrice').text()
	txt+=c+'\n';
	var size=$('li.sizeBox label')	
	for(var i=0;i<size.length;i++){
		var t=size.eq(i).attr('for').split('_')[2].slice(1);
		txt+=t+' ';		
	}
	txt+='\n';
	txt+=$('.infoBox').html()+'\n\n';
	appendFile(filename+'/info.html',txt);	
}
var url='http/list'
getlist('Jeans',url)
function appendFile(file,txt){
	fs.appendFile('pages/'+file,txt,function(err){
		if(err){
			console.log(file,txt,err);
		}
	})
}
//downimg('Jeans','img url')
function downimg(file,url){
	console.log(url)
	var name=url.slice(url.lastIndexOf('/')+1);
	https.get(url, function(res) {
        var data = '';
        res.setEncoding('binary');
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            fs.writeFile('pages/'+file+'/'+name, data, 'binary', function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }).on('error', function(err) {
        console.log(err);
    });	
}

module.exports=pac;