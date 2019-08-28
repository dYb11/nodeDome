$(function(){			
	//最新新闻 向上滚动
	$(".date-news").slide({ mainCell:"#date-news-rUl", effect:"topLoop", autoPlay:true,interTime: 6000,delayTime:1200});					
	// 焦点图文js
	$(".focusBox").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,interTime: 4000,trigger:"click",
		//下面startFun代码用于控制文字上下切换
		startFun:function(i){
			 $(".focusBox .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});
		}
	});
	// tab切换
	$(".hasMoreTab").slide({ mainCell:".conWrap", targetCell:"hd", effect:"fold"});			
	
	//办事切换			
	$('.service-nav li').hover(function(){				
		var $index = $(this).index();				
		var $content = $(this).parent().next('.service-list');
		$(this).addClass('on-service-nav').siblings().removeClass();
		$content.children('.service-con').eq($index).filter(':not(:animated)').fadeIn(200).siblings().stop().fadeOut(200);
	});
	
	// 公开
	$('.publicity-tab h2 a').hover(function(){
		var $index = $(this).index();				
		var $content = $(this).parent().next('.publicity-tab-con');
		$(this).addClass('on-publicity').siblings().removeClass();
		$content.children('.publicity-tab-loop').eq($index).filter(':not(:animated)').fadeIn(200).siblings().stop().fadeOut(200);
	});	
	
	// link
	$('.link-con h2 span').on('click',function(){
		var $index = $(this).index();				
		var $content = $(this).parent().next('.link-content');
		$(this).addClass('on-link-nav').siblings().removeClass();
		$content.children('.link-con-loop').eq($index).slideDown(500).siblings().slideUp(300);
	});
	
	//字体操作
	
	$('#big').click(function(){
        $('.news-details').css({"font-size":"18px",'line-height':'210%'});
    });
    $('#middle').click(function(){
        $('.news-details').css({"font-size":"14px"});
    });
    $('#small').click(function(){
        $('.news-details').css({"font-size":"12px"});
    });
    
    //栏目选择
    $('.column-nav-list a').on('click',function(){
		var $column = $('.column-nav-list'),
			ulNum = $(this).parent().find('ul').length;
		if( ulNum > 0){ //有子栏目 
			$column.find('a').removeClass('on-column-nav');
			$(this).attr('href','javascript:;');
			$(this).toggleClass('on-column-menu').next().slideToggle();			
		}else {
			$column.find('a').removeClass('on-column-nav');
			$(this).addClass('on-column-nav');
		}

    });
    
    //新闻列表
    $('.column-list-con li:even').addClass('listBorder');
    

    
	//分享
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
	
	
	
	
	
	
	
});





/**
 * 提示信息框
 * @param mess 弹出信息
 */
function Tooltip(mess){
	
}

Tooltip.prototype.messInfo = function(mess){
	var str = '<div class="regMess">'+
					'<div class="regMess-con"><span>'+mess+'</span></div>'+
				'</div>';		
	$('body').append(str);
	var $el = $('.regMess-con'),
		$mW= $el.width();	
	$el.css({'margin-left': - $mW/2 + 'PX'});
	/**
	 * 1.获取节点
	 * 2.  1秒后动画隐藏 再移除
	 */
	var $node = $(".regMess");
	$node.fadeIn(400);
	setTimeout(function(){
		$node.fadeOut(500);
		setTimeout(function(){
			$node.remove();
		},500);
		
	},1200);
	
}
	
	

	