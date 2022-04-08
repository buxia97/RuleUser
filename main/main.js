var $Rule, $s;
$Rule = $s = function(selector, context) {
	return new $s.fn.init(selector, context);
};
$s.fn = $s.prototype;
$s.fn.init = function(selector, context) {
	var nodeList = [];
	if(typeof(selector) == 'string') {
		nodeList = (context || document).querySelectorAll(selector);
	} else if(selector instanceof Node) {
		nodeList[0] = selector;
	} else if(selector instanceof NodeList || selector instanceof Array) {
		nodeList = selector;
	}
	this.length = nodeList.length;
	for(var i = 0; i < this.length; i += 1) {
		this[i] = nodeList[i];
	}
	return this;
};
$s.fn.init.prototype = $s.fn;
$s.fn.each = function(cb_fun, need_ret) {
	var res = [];
	for(var i = 0; i < this.length; i++) {
		res[i] = cb_fun.call(this[i]);
	}
	if(need_ret) {
		if(res.length == 1) {
			res = res[0];
		}
		return res;
	}
	return this;
};
$s.fn.eq = function() {
	var nodeList = [];
	for(var i = 0; i < arguments.length; i++) {
		nodeList[i] = this[arguments[i]];
	}
	return $s(nodeList);
};
$s.fn.first = function() {
	return this.eq(0);
};
$s.fn.last = function() {
	return this.eq(this.length-1);
};
$s.fn.find = function(str) {
	var nodeList = [];
	var res=this.each(function(){
		return this.querySelectorAll(str);
	},1);
	if(res instanceof Array){
		for(var i=0;i<res.length;i++){
			for(var j=0;j<res[i].length;j++){
				nodeList.push(res[i][j]);
			}
		}
	}else{
		nodeList=res;
	}
	return $s(nodeList);
};
$s.fn.parent = function() {
	return $s(this.each(function() {
		return this.parentNode;
	}, 1));
};
$s.fn.hide = function() {
	return this.each(function() {
		this.style.display = "none";
	});
};
$s.fn.show = function() {
	return this.each(function() {
		this.style.display = "block";
	});
};
$s.fn.text = function(str) {
	if(str!=undefined) {
		return this.each(function() {
			this.innerText = str;
		});
	} else {
		return this.each(function() {
			return this.innerText;
		}, 1);
	}
};
$s.fn.html = function(str) {
	if(str!=undefined) {
		return this.each(function() {
			this.innerHTML = str;
		});
	} else {
		return this.each(function() {
			return this.innerHTML;
		}, 1);
	}
};
$s.fn.outHtml = function(str) {
	if(str!=undefined) {
		return this.each(function() {
			this.outerHTML = str;
		});
	} else {
		return this.each(function() {
			return this.outerHTML;
		}, 1);
	}
};
$s.fn.val = function(str) {
	if(str!=undefined) {
		return this.each(function() {
			this.value = str;
		});
	} else {
		return this.each(function() {
			return this.value;
		}, 1);
	}
};
$s.fn.css = function(key,value,important) {
	if(value!=undefined){
		return this.each(function() {
			this.style.setProperty(key, value,important);
		});
	}else{
		return this.each(function() {
			return this.style.getPropertyValue(key);
		}, 1);
	}
};
$s.fn.attr = function(key,value) {
	if(value!=undefined) {
		return this.each(function() {
			this.setAttribute(key, value);
		});
	}else{
		return this.each(function() {
			return this.getAttribute(key);
		}, 1);
	}
};
$s.fn.removeAttr = function(key) {
	return this.each(function() {
		this.removeAttribute(key);
	});
};
$s.fn.remove = function() {
	return this.each(function() {
		this.remove();
	});
};
$s.fn.append = function(str) {
	return this.each(function() {
		this.insertAdjacentHTML('beforeend', str);
	});
};
$s.fn.prepend = function(str) {
	return this.each(function() {
		this.insertAdjacentHTML('afterbegin', str);
	});
};
$s.fn.before = function(str) {
	return this.each(function() {
		this.insertAdjacentHTML('beforeBegin', str);
		this.insertAdjacentElement('beforebegin', this);
	});
};
$s.fn.after = function(str) {
	return this.each(function() {
		this.insertAdjacentHTML('afterEnd', str);
		this.insertAdjacentElement('afterend', this);
	});
};
$s.fn.hasClass = function(str) {
	return this.each(function() {
		return this.classList.contains(str);
	}, 1);
};
$s.fn.addClass = function(str) {
	return this.each(function() {
		return this.classList.add(str);
	});
};
$s.fn.removeClass = function(str) {
	return this.each(function() {
		return this.classList.remove(str);
	});
};
$s.fn.click = function(f){//click改为监听事件，
	if (typeof (f) == "function") {//重载，若含有参数就注册事件，无参数就触发事件
		this.each(function() {
			this.addEventListener("click", f);
		});
	} else {
		this.each(function() {
    		var event = document.createEvent('HTMLEvents');  
    		event.initEvent("click", true, true);  
    		this.dispatchEvent(event);
		});
	}
};
$s.fn.tag = function(tag) {
	var dom = document.createElement(tag);
	this[0] = dom;
	return this;
};
$s.fn.dom = function(str) {
	var dom = document.createElement('p');
	dom.innerHTML = str;
	this[0] = dom.childNodes[0];
	return this;
};
$s.about = function() {
	return "SimJQ-V2.2 https://gitee.com/Leytton/SimJQ";
};
$s.ajax = function(options) {
	function empty() {}

	function obj2Url(obj) {
		var arr = [];
		for(var i in obj) {
			arr.push(encodeURI(i) + '=' + encodeURI(obj[i]));
		}
		return arr.join('&').replace(/%20/g, '+');
	}
	var opt = {
		url: '', //请求地址
		sync: true, //true，异步 | false　同步，会锁死浏览器，并且open方法会报浏览器警告
		method: 'GET', //提交方法
		data: null, //提交数据
		dataType: 'json', //返回数据类型
		username: null, //账号
		password: null, //密码
		success: empty, //成功返回回调
		error: empty, //错误信息回调
		timeout: 10000 //请求超时ms
	};
	Object.assign(opt, options); //直接合并对象,opt已有属性将会被options替换
	var abortTimeout = null;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			xhr.onreadystatechange = empty;
			clearTimeout(abortTimeout);
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				var result = xhr.responseText;
				try {
					if(opt.dataType == 'json') {
						result = result.replace(' ', '') == '' ? null : JSON.parse(result);
					}
				} catch(e) {
					opt.error(e, xhr);
					xhr.abort();
				}
				opt.success(result, xhr);
			} else if(0 == xhr.status) {
				opt.error("跨域请求失败", xhr);
			} else {
				opt.error(xhr.statusText, xhr);
			}
		}
	};
	var data = opt.data ? obj2Url(opt.data) : opt.data;
	opt.method = opt.method.toUpperCase();
	if(opt.method == 'GET') {
		opt.url += (opt.url.indexOf('?') == -1 ? '?' : '&') + data;
	}
	xhr.open(opt.method, opt.url, opt.sync, opt.username, opt.password);
	if(opt.method == 'POST') {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	if(opt.timeout > 0) {
		abortTimeout = setTimeout(function() {
			xhr.onreadystatechange = empty;
			xhr.abort();
			opt.error('网络请求超时', xhr);
		}, opt.timeout);
	}
	xhr.send(data);
};
//上述代码基于SimJQ进行调整，该项目开源地址：https://gitee.com/Leytton/SimJQ
postStyle();
function postStyle(){
	var style =`
	<link rel="stylesheet" href="/${userIndex}/font/ruleIcon.css" />
	`;
	
	$Rule("head").append(style);
}
isLogin();
login();
function isLogin(){
	var html = `
	<div class="RuleUser-UserForm-bg">
	</div>
	<div class="RuleUser-UserForm-main">
		<div class="RuleUser-UserForm-box">
			<a href="javascript:;" class="RuleUser-tocan" onclick="tocan()"><i class="iconfont icon-scanning"></i>扫码登录</a>
			<a href="javascript:;" class="RuleUser-backLogin" onclick="backLogin()"><i class="iconfont icon-password"></i>密码登录</a>
			<div class="RuleUser-UserForm-logo">
				<a href="${WEB_URL}"><img src="${LOGO_URL}" /></a>
			</div>
			<div class="RuleUser-UserForm-form" id="RuleUser-UserForm-form">
				
			</div>
		</div>
	</div>
	`;
	$Rule("#RuleUser-UserForm").html(html);
}
function randomString(e) {    
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}
function login(){
	
	var html = `
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入用户名" id="username" value=""/>
		</div>
		<div class="RuleUser-input">
			<input type="password" placeholder="请输入密码" id="userpass" value=""/>
		</div>
		<div class="RuleUser-btn">
			<button type="button" onclick="toLogin()">登录</button>
		</div>
		<div class="RuleUserForm-links">
			<a href="javascript:;" onclick="register()">用户注册</a>
			<a href="javascript:;" onclick="forgot()">忘记密码</a>
		</div>
		`;
	$Rule("#RuleUser-UserForm-form").html(html);
}
function forgot(){
	var html = `
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入用户名(必填)" value="" id="username"/>
		</div>
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入验证码" value="" id="code"/>
			<a href="javascript:;" class="send sendBefor" id="sendBefore" onclick="sendCodeFogot()">发送</a>
			<span class="send sended" id="sended"></span>
		</div>
		<div class="RuleUser-input">
			<input type="password" placeholder="请输入新密码" value="" id="newspass"/>
		</div>
		<div class="RuleUser-input">
			<input type="password" placeholder="再次输入新密码" value="" id="repass"/>
		</div>
		<div class="RuleUser-btn">
			<button type="button" onclick="toForgot()">确认修改</button>
		</div>
		<div class="RuleUserForm-links">
			<a href="javascript:;" onclick="login()">用户登录</a>
		</div>
		`;
	$Rule("#RuleUser-UserForm-form").html(html);
}
function register(){
	var html = `
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入用户名(必填)" value="" id="username"/>
		</div>
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入邮箱(必填)" value="" id="email"/>
		</div>
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入验证码" value="" id="code"/>
			<a href="javascript:;" class="send sendBefor" id="sendBefore" onclick="sendCode()">发送</a>
			<span class="send sended" id="sended"></span>
		</div>
		<div class="RuleUser-input">
			<input type="password" placeholder="请输入密码" value="" id="userpass"/>
		</div>
		<div class="RuleUser-input">
			<input type="password" placeholder="再次输入密码" value="" id="repass"/>
		</div>
		<div class="RuleUser-btn">
			<button type="button" onclick="toRegister()">立即注册</button>
		</div>
		<div class="RuleUserForm-links">
			<a href="javascript:;" onclick="login()">用户登录</a>
			<br/>
			<p class="margin-top">注册即为同意<a href="#">《用户协议》</a></p>
		</div>
		`;
	$Rule("#RuleUser-UserForm-form").html(html);
}
var Interval;
function tocan(){
	var text = randomString(7)+new Date().getTime();
	$Rule(".RuleUser-tocan").hide();
	$Rule(".RuleUser-backLogin").show();
	var html = `
		
		<img src="${API.getScan()}?codeContent=${text}" class="col-10 RuleUser-scanPic"/>
		<input type="hidden" value="${text}" id="codeContent"/>
		<div class="RuleUser-input text-center">
			<h4>使用本网站APP进行扫码</h4>
			<p class="margin-top"><a href="${appUrl}" target="_blank">${webName}客户端</a></p>
		</div>
		`;
	$Rule("#RuleUser-UserForm-form").html(html);
	Interval = setInterval(function () {
		getScan();
	}, 1000);
}
function backLogin(){
	$Rule(".RuleUser-tocan").show();
	$Rule(".RuleUser-backLogin").hide();
	clearInterval(Interval);
	login();
}
function getScan(){
	var text = $Rule("#codeContent").val();
	
	$Rule.ajax({
		type : "post",
		data:{
			"codeContent":text
		},
		url : API.getScanStatus(),
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				wcPop({
					anim: 'fadeIn',
					content: "扫码登录成功！",
					icon: 'success', 
					shade: false,
					shadeClose: false,
					time:2
				});
				clearInterval(Interval);
				//保存用户信息
				localStorage.setItem('userinfo',JSON.stringify(result.data));
				localStorage.setItem('token',result.data.token);
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
			}else if(result.code==-1){
				clearInterval(Interval);
				wcPop({
					anim: 'fadeIn',
					content: "二维码已过期，开始重新生成",
					shade: false,
					icon: 'error ', 
					shadeClose: false,
					time:2
				});
				tocan();
			}
		},
		error : function(e){
			clearInterval(Interval);
			wcPop({
				anim: 'fadeIn',
				content: "请求失败，请检查网络",
				shade: false,
				shadeClose: false,
				time:2
			});
		}
	});
}
function sendCode(){
	var email = $Rule("#email").val();
	if(email==""){
		wcPop({
			anim: 'fadeIn',
			content: "请输入邮箱地址",
			shade: false,
			shadeClose: false,
			time:2
		});
		return false;
	}
	var data = {
		'mail':email
	}
	var index = wcPop({
		id: 'xwToast',
		skin: 'toast',
		content: '加载中...',
		icon: 'loading',
		shade: true,
		time:2
	});
	
	$Rule.ajax({
		type : "post",
		url: API.RegSendCode(),
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				$Rule("#sendBefore").hide();
				$Rule("#sended").show();
				countDownBtn();
				wcPop({
					anim: 'fadeIn',
					content: "发送成功！",
					icon: 'success', 
					shade: false,
					shadeClose: false,
					time:2
				});
			}else{
				wcPop({
					anim: 'fadeIn',
					content: result.msg,
					shade: false,
					shadeClose: false,
					time:2
				});
			}
		},
		error : function(e){
			wcPop({
				anim: 'fadeIn',
				content: "请求失败，请检查网络",
				shade: false,
				shadeClose: false,
				time:2
			});
		}
	});
}
function sendCodeFogot(){
	
	var username = $Rule("#username").val();
	if(username==""){
		wcPop({
			anim: 'fadeIn',
			content: "请输入用户名",
			icon: 'error ', 
			shade: false,
			shadeClose: false,
			time:2
		});
		return false;
	}
	var data = {
		'name':username
	}
	var index = wcPop({
		id: 'xwToast',
		skin: 'toast',
		content: '加载中...',
		icon: 'loading',
		shade: true,
		time:2
	});
	
	$Rule.ajax({
		type : "post",
		url: API.SendCode(),
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		dataType: 'json',
		success : function(result) {
			wcPop.close(index);
			if(result.code==1){
				$Rule("#sendBefore").hide();
				$Rule("#sended").show();
				countDownBtn();
				wcPop({
					anim: 'fadeIn',
					content: "发送成功！",
					icon: 'success', 
					shade: false,
					shadeClose: false,
					time:2
				});
			}else{
				wcPop({
					anim: 'fadeIn',
					content: result.msg,
					shade: false,
					shadeClose: false,
					time:2
				});
			}
		},
		error : function(e){
			wcPop.close(index);
			wcPop({
				anim: 'fadeIn',
				content: "请求失败，请检查网络",
				shade: false,
				shadeClose: false,
				time:2
			});
		}
	});
}
function countDownBtn() {
	var second = 60;
	if (second > 0) {
		second--;
		$Rule("#sended").text(second + 's');
	}
	var msgInterval = setInterval(function() {
		if (second > 0) {
			second--;
			$Rule("#sended").text(second + 's');
		}
		if (second == 0) {
			clearInterval(msgInterval);
			$Rule("#sendBefore").show();
			$Rule("#sended").hide();
		}
	}, 1000);
}
function quit(){
	
	localStorage.removeItem('userinfo');
	localStorage.removeItem('token');
	localStorage.removeItem("page");
	localStorage.removeItem("pageName");
	wcPop({
		anim: 'fadeIn',
		content: "退出成功！",
		icon: 'success', 
		shade: false,
		shadeClose: false,
		time:2
	});
	var timer = setTimeout(function() {
		location.reload();
		clearTimeout('timer')
	}, 1000)
}
function toLogin(){
	var username = $Rule("#username").val();
	var userpass = $Rule("#userpass").val();
	if(username==""||userpass==""){
		wcPop({
			anim: 'fadeIn',
			content: "请输入正确的参数",
			icon: 'error ', 
			shade: false,
			shadeClose: false,
			time:2
		});
		return false;
	}
	var data = {
		name: username,
		password: userpass,
	}
	var index = wcPop({
		id: 'xwToast',
		skin: 'toast',
		content: '加载中...',
		icon: 'loading',
		shade: true,
		time:2
	});
	
	$Rule.ajax({
		type : "post",
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		url : API.userLogin(),
		dataType: 'json',
		success : function(result) {
			wcPop.close(index);
			if(result.code==1){
				wcPop({
					anim: 'fadeIn',
					content: "登录成功！",
					icon: 'success', 
					shade: false,
					shadeClose: false,
					time:2
				});
				//保存用户信息
				localStorage.setItem('userinfo',JSON.stringify(result.data));
				localStorage.setItem('token',result.data.token);
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
			}else{
				wcPop({
					anim: 'fadeIn',
					content: result.msg,
					shade: false,
					shadeClose: false,
					time:2
				});
			}
		},
		error : function(e){
			wcPop.close(index);
			wcPop({
				anim: 'fadeIn',
				content: "请求失败，请检查网络",
				shade: false,
				shadeClose: false,
				time:2
			});
		}
	});
}
function toRegister(){
	var username = $Rule("#username").val();
	var userpass = $Rule("#userpass").val();
	var code = $Rule("#code").val();
	var email = $Rule("#email").val();
	var repass = $Rule("#repass").val();
	
	if(username==""||userpass==""||email==""||code==""){
		wcPop({
			anim: 'fadeIn',
			content: "请输入正确的参数",
			icon: 'error ', 
			shade: false,
			shadeClose: false,
			time:2
		});
		return false;
	}
	if(userpass!=repass){
		wcPop({
			anim: 'fadeIn',
			content: "两次密码不一致",
			icon: 'error ', 
			shade: false,
			shadeClose: false,
			time:2
		});
		return false;
	}
	var data = {
		'name':username,
		'code':code,
		'password':userpass,
		'mail':email
	}
	var index = wcPop({
		id: 'xwToast',
		skin: 'toast',
		content: '加载中...',
		icon: 'loading',
		shade: true,
		time:2
	});
	
	$Rule.ajax({
		type : "post",
		url: API.userRegister(),
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		dataType: 'json',
		success : function(result) {
			wcPop.close(index);
			if(result.code==1){
				wcPop({
					anim: 'fadeIn',
					content: "注册成功！",
					icon: 'success', 
					shade: false,
					shadeClose: false,
					time:2
				});
				login();
			}else{
				wcPop({
					anim: 'fadeIn',
					content: result.msg,
					shade: false,
					shadeClose: false,
					time:2
				});
			}
		},
		error : function(e){
			wcPop.close(index);
			wcPop({
				anim: 'fadeIn',
				content: "请求失败，请检查网络",
				shade: false,
				shadeClose: false,
				time:2
			});
		}
	});
}
function toForgot(){
	var username = $Rule("#username").val();
	var newspass = $Rule("#newspass").val();
	var code = $Rule("#code").val();
	var repass = $Rule("#repass").val();
	
	if(username==""||newspass==""||code==""){
		wcPop({
			anim: 'fadeIn',
			content: "请输入正确的参数",
			icon: 'error ', 
			shade: false,
			shadeClose: false,
			time:2
		});
		return false;
	}
	if(newspass!=repass){
		wcPop({
			anim: 'fadeIn',
			content: "两次密码不一致",
			icon: 'error ', 
			shade: false,
			shadeClose: false,
			time:2
		});
		return false;
	}
	var data = {
		'name':username,
		'code':code,
		'password':newspass,
	}
	var index = wcPop({
		id: 'xwToast',
		skin: 'toast',
		content: '加载中...',
		icon: 'loading',
		shade: true,
		time:2
	});
	
	$Rule.ajax({
		type : "post",
		url: API.userFoget(),
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		dataType: 'json',
		success : function(result) {
			wcPop.close(index);
			if(result.code==1){
				wcPop({
					anim: 'fadeIn',
					content: "操作成功！",
					icon: 'success', 
					shade: false,
					shadeClose: false,
					time:2
				});
				login();
			}else{
				wcPop({
					anim: 'fadeIn',
					content: result.msg,
					shade: false,
					shadeClose: false,
					time:2
				});
			}
		},
		error : function(e){
			wcPop.close(index);
			wcPop({
				anim: 'fadeIn',
				content: "请求失败，请检查网络",
				shade: false,
				shadeClose: false,
				time:2
			});
		}
	});
}