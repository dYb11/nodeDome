$(function(){
			
	var $dZt = $('input[name=d-zt]'),
		$dCon = $('textarea[name=d-con]'),
		$dName =$('input[name=d-name]'),
		$dTel = $('input[name=d-tel]'),
		$dAddr = $('input[name=d-addr]'),
		$dEmail= $('input[name=d-email]');
		

	var dMes = new Tooltip();
	$('#d-send').on('click',function(){
		
		if( $.trim($dZt[0].value) == ''){
			dMes.messInfo('请填写主题');
			$dZt.focus().val('');
			return false;
		}
		if( $.trim($dCon[0].value) == ''){
			dMes.messInfo('请填写内容');
			$dCon.focus().val('');
			return false;
		}
		if( $.trim($dName[0].value) == ''){
			dMes.messInfo('请填写姓名');
			$dName.focus().val('');
			return false;
		}
		if( $.trim($dTel[0].value) == ''){
			dMes.messInfo('请填写姓名');
			$dTel.focus().val('');
			return false;
		}
		if( $.trim($dAddr[0].value) == ''){
			dMes.messInfo('请填写联系地址');
			$dAddr.focus().val('');
			return false;
		}
		if( $.trim($dEmail[0].value) == ''){
			dMes.messInfo('请填写邮箱');
			$dEmail.focus().val('');
			return false;
		}
		
	});
		
});