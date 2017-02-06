/*
 *表单验证插件
 */
(function () {
	$.fn.checkForm = function (options,callback) {
		var elem = this; //将当前操作对象存入elem
		var isSubmit = false; //控制表单提交的开关
		var pwd1; //密码
		var data = {};
		var data_userName;//姓名
		var data_mobile;//手机号
		var data_sex;//性别
		var data_buyCity;//购车城市
		var data_carType;//车型
		var data_msgCode;//短信验证码
		var data_carSeries;//车系
		var data_carBrand;//品牌
		var data_selProvince;//所在省
		var data_selCity;//所在市
		var data_selConty;//所在区县
		var data_dealer;//经销商


		var defaults = {//默认信息
			//提示信息
			tips_success: '', //验证成功时的提示信息，默认为空
			tips_required:  '不能为空 ',
			tips_email:  '邮箱地址格式有误 ',
			tips_num:  '请填写数字 ',
			tips_username:  '格式错误 ',
			tips_mobile:  '格式有误 ',
			tips_idcard:  '身份证号码格式有误 ',
			tips_pwdequal:  '两次密码不一致 ',
			tips_buyCity:'请输入中文',//购车城市
			tips_carType:'',//车型
			tips_msgCode:'',//短信验证码
			tips_carSeries:'',//车系
			tips_carBrand:'',//车品牌
			tips_selProvince:'',//所在省
			tips_selCity:'',//所在市
			tips_selCounty:'',//所在区县
			tips_dealer:'',//经销商

			//正则
			reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i, //验证邮箱
			reg_num: /^\d+$/, //验证数字
			reg_chinese: /^[\u4E00-\u9FA5]+$/, //验证中文
			reg_username:/^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/,//验证用户名
			reg_mobile: /^1[3|4|5|7|8]\d{9}$/, //验证手机

			//错误提示格式
			show_type:1,//1表示alert 2表示其他
			form_show:true,//false表示直接存在 true表示弹出
			show_id:'',//弹出层的id名
			post_url:''//需要访问的接口地址
		};
		//不为空则合并参数
		if(options)
		$.extend(defaults, options);
		
		elem.find('.js_validate_submit').click(function(){
			_onSubmit();
			if(isSubmit){
				if(typeof callback === 'function'){
					callback();
				}
				if(defaults.form_show){
					$('#'+defaults.show_id).css('display','none');
				}
				// setInterval(
				// 	function () {
				// 		location.reload();
				// 	},
				// 	200
				// )
				// var param = {"nickName": data_1, "phone": data_2, "province": data_3, "city": data_4, "code": data_5,"dealer":data_6};
				// $.ajax({
				// 	async: false,
				// 	cache: false,
				// 	type: "POST",
				// 	url: defaults.post_url,// 请求的action路径
				// 	data: param,
				// 	error: function () {// 请求失败处理函数
				// 	},
				// 	success: function (data) {
				// 		if (data.status != 'success') {
				// 			showMsg(null,data.msg,false);
				// 		}else{
				// 			showMsg(null,'提交成功',true);
				// 			if(defaults.form_show){
				// 				$('#'+defaults.show_id).css('display','none');
				// 			}
				// 			setInterval(
				// 				function () {
				// 					location.reload();
				// 				},
				// 				2000
				// 			)
				// 		}
				// 	}
				// });
				return data;
			}
			return isSubmit;
		})
		//表单提交时执行验证
		function _onSubmit() {
			isSubmit = true;
			$("[type=text],[type=password],[type=number],[type=radio],[type=textarea],select,textarea", elem).each(function () {
				var validateData = $(this).attr("check");
				//input前有label标签的
				if($(this).parent().prev('label')[0]){
					var str = $(this).parent().prev('label')[0].innerHTML;
					var inputName = str.replace("：", "").replace(/\s+/g, "").replace(/&nbsp;/g, "");
				}
				if (validateData) {
				var arr = validateData.split(' ');
					for (var i = 0; i < arr.length; i++) {
						if (!check($(this), arr[i], $(this).val(),inputName)) {
						isSubmit = false; //验证不通过阻止表单提交，开关false
						return false; //跳出
						}else{
							if($("input[type=radio]",elem)[0]){
								if(!$("input[type=radio][name='sex']:checked").val()){
									showMsg(null,'请选择性别',false);
									isSubmit = false;
									return false;
								}
							}

							if(arr[i].indexOf('username')>-1){
								data.userName = $(this).val();
							}else if(arr[i].indexOf('mobile')>-1){
								data.mobile = $(this).val();
							}else if(arr[i].indexOf('sex')>-1){
								data.sex = $(this).val();
							}else if(arr[i].indexOf('buyCity')>-1){
								data.buyCity = $(this).val();
							}else if(arr[i].indexOf('msgCode')>-1){
								data.msgCode = $(this).val();
							}else if(arr[i].indexOf('carType')>-1){
									data.carType = $(this).val();
							}else if(arr[i].indexOf('carSeries')>-1){
								data.carSeries = $(this).val();
							}else if(arr[i].indexOf('carBrand')>-1){
								data.carBrand = $(this).val();
							}  
							if($(this).find('option:selected').val()){
								if(arr[i].indexOf('carType')>-1){
									data.carType = $(this).val();
								}else if(arr[i].indexOf('selProvince')>-1){
									data.selProvince = $(this).val();
								}else if(arr[i].indexOf('selCity')>-1){
									data.selCity = $(this).val();
								}else if(arr[i].indexOf('selCounty')>-1){
									data.selConty = $(this).val();
								}else if(arr[i].indexOf('dealer')>-1){
									data.dealer = $(this).val();
								}else if(arr[i].indexOf('carSeries')>-1){
									data.carSeries = $(this).val();
								}else if(arr[i].indexOf('carBrand')>-1){
									data.carBrand = $(this).val();
								}
							}
						}

					}
				
				}
			});
		}
		
		//验证方法
		var check = function (obj, matchType, val,inputName) {
		　　//根据验证情况，显示相应提示信息，返回相应的值
			switch (matchType) {
			case  'required':
			return val!='' ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, inputName+defaults.tips_required, false);
			case  'email':
			return checkReg(val, defaults.reg_email) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_email, false);
			case  'num':
			return checkReg(val, defaults.reg_num) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_num, false);
			case  'username':
			return checkReg(val, defaults.reg_username) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, inputName+defaults.tips_username, false);
			case  'mobile':
			return checkReg(val, defaults.reg_mobile) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, inputName+defaults.tips_mobile, false);
			case  'pwd1':
			pwd1 = val; //获取存储pwd1值
			return true;
			case  'pwd2':
			return pwdEqual(val, pwd1) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_pwdequal, false);
			case  'buyCity':
			return checkReg(val, defaults.reg_chinese) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, inputName+defaults.tips_buyCity, false);
			case  'carType':
			return showMsg(obj,defaults.tips_carType,true);
			case  'msgCode':
			return showMsg(obj,defaults.tips_msgCode,true);
			case  'carSeries':
			return showMsg(obj,defaults.tips_carSeries,true);
			case  'selProvince':
			return showMsg(obj,defaults.tips_selProvince,true);
			case  'selCity':
			return showMsg(obj,defaults.tips_selCity,true);
			case  'selCounty':
			return showMsg(obj,defaults.tips_selCounty,true);
			case  'dealer':
			return showMsg(obj,defaults.tips_dealer,true);
			default:
			return true;
			}
		}
		//判断两次密码是否一致(返回bool值)
		var pwdEqual = function(val1, val2) {
			return val1 == val2 ? true : false;
		}
		//正则匹配(返回bool值)
		var checkReg = function (str, reg) {
			return reg.test(str);
		}
		//显示信息
		var showType = defaults.show_type;//获取错误提示格式
		var showMsg = function (obj, msg, mark,show_type) {
			var show_type = showType;
			var obj = obj || undefined; 
			if(mark) return mark;
			if(showType == 1){
				if(obj)obj.focus();
				alert(msg);
				return false;
			}else if(showType == 2){
				layer.open({ content: msg,btn: ['关闭']});
				return false;
			}
		}
		return data;
	}
})();