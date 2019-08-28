$(function(){
			
	var $name = $('input[name=name]'),
		$zt = $('input[name=zt]'),
		$content = $('textarea[name=content]');

	var mes = new Tooltip();
	$('#send').on('click',function(){				
		if( $.trim($name[0].value) == ''){
			mes.messInfo('请填写昵称');
			$name.focus().val('');
			return false;
		}				
		if( $.trim($zt[0].value) == ''){
			mes.messInfo('请填写主题');
			$zt.focus().val('');
			return false;
		}
		
		if( $.trim($content[0].value) == ''){
			mes.messInfo('请填写内容');
			$content.focus().val('');
			return false;
		}
		
	});
		
});