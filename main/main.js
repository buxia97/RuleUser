postStyle();
userStatus();
regConfig();
var Interval;
function postStyle(){
	var style =`
	<link rel="stylesheet" href="/${userIndex}/font/ruleIcon.css?v=${version}" />
	<link rel="stylesheet" href="/${userIndex}/main/RuleUser.css?v=${version}" />
	`;
	
	$("head").append(style);
}
function UserLogin(){
	toRuleUser();
	var html = `
	<div class="RuleUser-UserForm" id="RuleUser-UserForm">
	</div>
	`;
	$(".RuleUser").append(html);
	isLogin();
	login();
}
function UserRegister(){
	toRuleUser();
	var html = `
	<div class="RuleUser-UserForm" id="RuleUser-UserForm">
	</div>
	`;
	$(".RuleUser").append(html);
	isLogin();
	register();
}
function UserForgot(){
	toRuleUser();
	var html = `
	<div class="RuleUser-UserForm" id="RuleUser-UserForm">
	</div>
	`;
	$(".RuleUser").append(html);
	isLogin();
	forgot();
}
function UserScan(){
	toRuleUser();
	var html = `
	<div class="RuleUser-UserForm" id="RuleUser-UserForm">
	</div>
	`;
	$(".RuleUser").append(html);
	isLogin();
	tocan();
}
function toMember(page,title){
	var page = "pages/"+page;
	localStorage.setItem("page",page);
	localStorage.setItem("pageName",title);
	window.open(WEB_URL+userIndex);
}
function toRuleUser(){
	var RuleUser = `
	<div class="RuleUser"></div>
	`;
	$("body").append(RuleUser);
}
function closeRuleUser(){
	$(".RuleUser").remove();
	clearInterval(Interval);
}
function isLogin(){
	var html = `
	<div class="RuleUser-UserForm-bg">
	</div>
	<div class="RuleUser-UserForm-main">
		<div class="RuleUser-UserForm-box">
			<a href="javascript:;" class="RuleUser-tocan" onclick="tocan()"><i class="iconfont icon-scanning"></i>扫码登录</a>
			<a href="javascript:;" class="RuleUser-backLogin" onclick="backLogin()"><i class="iconfont icon-password"></i>密码登录</a>
			<a href="javascript:;" class="closeRuleUser" onclick="closeRuleUser()"><i class="iconfont icon-close"></i></a>
			<div class="RuleUser-UserForm-logo">
				<a href="${WEB_URL}"><img src="${LOGO_URL}" /></a>
			</div>
			<div class="RuleUser-UserForm-form" id="RuleUser-UserForm-form">
				
			</div>
		</div>
	</div>
	`;
	$("#RuleUser-UserForm").html(html);
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
	$("#RuleUser-UserForm-form").html(html);
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
	$("#RuleUser-UserForm-form").html(html);
}
function register(){
	var isEmail = 1;
	var isInvite = 1;
	var isEmailStyle = "";
	var isInviteStyle = "";
	if(localStorage.getItem("isEmail")){
		isEmail = Number(localStorage.getItem("isEmail"));
		if(isEmail == 0){
			isEmailStyle = "display:none";
		}
	}
	if(localStorage.getItem("isInvite")){
		isInvite = Number(localStorage.getItem("isInvite"));
		if(isInvite == 0){
			isInviteStyle = "display:none";
		}
	}
	
	var html = `
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入用户名(必填)" value="" id="username"/>
		</div>
		<div class="RuleUser-input">
			<input type="text" placeholder="请输入邮箱(必填)" value="" id="email"/>
		</div>
		<div class="RuleUser-input" style="${isEmailStyle}">
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
		<div class="RuleUser-input" style="${isInviteStyle}">
			<input type="text" placeholder="请输入邀请码" value="" id="inviteCode"/>
		</div>
		<div class="RuleUser-btn">
			<button type="button" onclick="toRegister()">立即注册</button>
		</div>
		<div class="RuleUserForm-links">
			<a href="javascript:;" onclick="login()">用户登录</a>
			<br/>
			<p class="margin-top">注册即为同意<a href="${userAgreement}">《用户协议》</a></p>
		</div>
		`;
	$("#RuleUser-UserForm-form").html(html);
}

function tocan(){
	var text = randomString(7)+new Date().getTime();
	$(".RuleUser-tocan").hide();
	$(".RuleUser-backLogin").show();
	var html = `
		
		<img src="${API.getScan()}?codeContent=${text}" class="col-10 RuleUser-scanPic"/>
		<input type="hidden" value="${text}" id="codeContent"/>
		<div class="RuleUser-input text-center">
			<h4>使用本网站APP进行扫码</h4>
			<p class="margin-top"><a href="${appUrl}" target="_blank">${webName}客户端</a></p>
		</div>
		`;
	$("#RuleUser-UserForm-form").html(html);
	openApp("?scan="+text);
	Interval = setInterval(function () {
		getScan();
	}, 1000);
}
function backLogin(){
	$(".RuleUser-tocan").show();
	$(".RuleUser-backLogin").hide();
	clearInterval(Interval);
	login();
}
function getScan(){
	var text = $("#codeContent").val();
	
	$.ajax({
		type : "post",
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"codeContent":text
		},
		url : API.getScanStatus(),
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				layer.msg("扫码登录成功！", {icon: 1});
				clearInterval(Interval);
				//保存用户信息
				localStorage.setItem('userinfo',JSON.stringify(result.data));
				localStorage.setItem('token',result.data.token);
				typechoLogin(result.data.token,result.data.uid,1);
				if(TypechoUserLogin==0){
					var timer = setTimeout(function() {
						location.reload();
						clearTimeout('timer')
					}, 1000)
				}
				
			}else if(result.code==-1){
				clearInterval(Interval);
				layer.msg("二维码已过期，开始重新生成", {icon: 2});
				tocan();
			}
		},
		error : function(e){
			clearInterval(Interval);
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function typechoLogin(token,uid,tips){
	if(TypechoUserLogin!=1){
		return false;
	}
	var data={
		token:token,
		uid:uid,
	}
	$.ajax({
		type : "post",
		url : "/",
		data:data,
		dataType: 'json',
		success : function(result) {
			if(tips==1){
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
			}
		},
		error : function(e){
			if(tips==1){
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
			}
		}
	});
}
function typechoQuitUser(tips){
	if(TypechoUserLogin!=1){
		return false;
	}
	var text = randomString(7)+new Date().getTime();
	$.ajax({
		type : "get",
		url : "/?quit="+text,
		dataType: 'json',
		success : function(result) {
			if(tips==1){
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
			}
		},
		error : function(e){
			if(tips==1){
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
			}
		}
	});
}
function sendCode(){
	var email = $("#email").val();
	if(email==""){
		layer.msg("请输入邮箱地址", {icon: 2});
		return false;
	}
	var data = {
		'mail':email
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.RegSendCode(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				$("#sendBefore").hide();
				$("#sended").show();
				countDownBtn();
				layer.msg("发送成功！", {icon: 1});
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function sendCodeFogot(){
	
	var username = $("#username").val();
	if(username==""){
		layer.msg("请输入用户名", {icon: 2});
		return false;
	}
	var data = {
		'name':username
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.SendCode(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				$("#sendBefore").hide();
				$("#sended").show();
				countDownBtn();
				layer.msg("发送成功！", {icon: 1});
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index);
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function countDownBtn() {
	var second = 60;
	if (second > 0) {
		second--;
		$("#sended").text(second + 's');
	}
	var msgInterval = setInterval(function() {
		if (second > 0) {
			second--;
			$("#sended").text(second + 's');
		}
		if (second == 0) {
			clearInterval(msgInterval);
			$("#sendBefore").show();
			$("#sended").hide();
		}
	}, 1000);
}
function UserQuit(){
	
	localStorage.removeItem('userinfo');
	localStorage.removeItem('token');
	localStorage.removeItem("page");
	localStorage.removeItem("pageName");
	layer.msg("退出成功！", {icon: 1});
	typechoQuitUser(1);
	if(TypechoUserLogin==0){
		var timer = setTimeout(function() {
			location.reload();
			clearTimeout('timer')
		}, 1000)
	}
}
function regConfig(){
	$.ajax({
		type : "post",
		url : API.regConfig(),
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				localStorage.setItem('isEmail',result.data.isEmail);
				localStorage.setItem('isInvite',result.data.isInvite);
			}
		},
		error : function(e){
			
		}
	});
}
function toLogin(){
	var username = $("#username").val();
	var userpass = $("#userpass").val();
	if(username==""||userpass==""){
		layer.msg("请输入正确的参数", {icon: 2});
		return false;
	}
	var data = {
		name: username,
		password: userpass,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		url : API.userLogin(),
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("登录成功！", {icon: 1});
				//保存用户信息
				localStorage.setItem('userinfo',JSON.stringify(result.data));
				localStorage.setItem('token',result.data.token);
				typechoLogin(result.data.token,result.data.uid,1);
				if(TypechoUserLogin==0){
					var timer = setTimeout(function() {
						location.reload();
						clearTimeout('timer')
					}, 1000)
				}
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index);
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function toRegister(){
	var isEmail = 1;
	var isInvite = 1;
	if(localStorage.getItem("isEmail")){
		isEmail = Number(localStorage.getItem("isEmail"));
	}
	if(localStorage.getItem("isInvite")){
		isInvite = Number(localStorage.getItem("isInvite"));
	}
	var username = $("#username").val();
	var userpass = $("#userpass").val();
	var code = $("#code").val();
	var email = $("#email").val();
	var repass = $("#repass").val();
	var inviteCode = $("#inviteCode").val();
	
	if(username==""||userpass==""){

		layer.msg("请输入正确的参数", {icon: 2});
		return false;
	}
	if(userpass!=repass){
		layer.msg("两次密码不一致", {icon: 2});
		return false;
	}
	if(isEmail>0){
		if(email==""){
			layer.msg("请输入邮箱地址", {icon: 2});
			return false;
		}
		if(code==""){
			layer.msg("请输入验证码", {icon: 2});
			return false;
		}
	}
	if(isInvite>0){
		if(inviteCode==""){
			layer.msg("请输入邀请码", {icon: 2});
			return false;
		}
	}
	var data = {
		'name':username,
		'code':code,
		'password':userpass,
		'mail':email,
		'inviteCode':inviteCode
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.userRegister(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("注册成功！", {icon: 1});
				login();
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index);
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function toForgot(){
	var username = $("#username").val();
	var newspass = $("#newspass").val();
	var code = $("#code").val();
	var repass = $("#repass").val();
	
	if(username==""||newspass==""||code==""){
		layer.msg("请输入正确的参数", {icon: 2});
		return false;
	}
	if(newspass!=repass){

		layer.msg("两次密码不一致", {icon: 2});
		return false;
	}
	var data = {
		'name':username,
		'code':code,
		'password':newspass,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.userFoget(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{"params":JSON.stringify(API.removeObjectEmptyKey(data))},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("操作成功！", {icon: 1});
				login();
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index);
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function addComments(cid,sumbit){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		$(sumbit).submit();
		return false;
	}
	var coid = $("#comment-parent").val();
	var text =  $("#RuleText").val();
	if(coid==""||cid==""||text==""){
		layer.msg("请输入正确的参数", {icon: 2});
		return false;
	}
	var data = {
		"cid":cid,
		"parent":coid,
		"text":text,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.setComments(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("发布成功！", {icon: 1});
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
				
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index); 
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function userStatus(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		var uid = userInfo.uid;
		typechoLogin(token,uid,0);
	}else{
		//intercept();
		return false;
	}
	
	$.ajax({
		type : "post",
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"token":token
		},
		url : API.userStatus(),
		dataType: 'json',
		success : function(result) {
			if(result.code==0){
				intercept();
			}
		},
		error : function(e){
			
		}
	});
}
function intercept(){
	localStorage.removeItem('userinfo');
	localStorage.removeItem('token');
	localStorage.removeItem("page");
	localStorage.removeItem("pageName");
	typechoQuitUser(1);
	if(TypechoUserLogin==0){
		var timer = setTimeout(function() {
			location.reload();
			clearTimeout('timer')
		}, 1000)
	}
}
function loadPostBtn(cid){
	var data = {
		"key":cid,
	}
	
	$.ajax({
		type : "post",
		url: API.getContentsInfo(),
		data:data,
		dataType: 'json',
		success : function(result) {
			if(result.title){
				var html = `
				<div class="RuleUser-PostBtn-box">
					<a href="javascript:;" onclick="toLikes(${cid})">
						<i class="iconfont icon-good-filling"></i>
						<p>点赞(<span id="toLikes-value">${result.likes}</span>)</p>
					</a>
				</div>
				<div class="RuleUser-PostBtn-box">
					<a href="javascript:;" onclick="toMark(${cid})">
						<i class="iconfont icon-favoritesfilling"></i>
						<p class="toIsMark">收藏</p>
					</a>
				</div>
				<div class="RuleUser-PostBtn-box">
					<a href="javascript:;" onclick="toReward(${cid})">
						<i class="iconfont icon-dashang"></i>
						<p>打赏</p>
					</a>
				</div>
				`;
				
				$("#RuleUser-PostBtn").html(html);
				toIsMark(cid);
				//openApp("?info="+cid);
			}
		},
		error : function(e){
			//layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function toIsMark(cid){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	$.ajax({
		type : "post",
		url: API.getIsMark(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"token":token,
			"cid":cid
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var isMark = result.data.isMark;
				if(isMark==1){
					$(".toIsMark").text("已收藏");
				}
				var logid = result.data.logid;
			}
		},
		error : function(e){
			
		}
	});
}
function toLikes(cid){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		
	}
	
	var data = {
		"type":"likes",
		"cid":cid,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.addLog(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("点赞成功！", {icon: 1});
				var value =Number($("#toLikes-value").text());
				value = value+1;
				$("#toLikes-value").text(value);
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index); 
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function toReward(cid){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		UserLogin();
		return false;
	}
	layer.open({
		title:"打赏文章",
		type: 1,
		area: ['320px', '300px'], 
		content: `
		<div class="RuleUser-layer-form">
			<div class="toReward-main">
				<div class="toReward-box active" data-reward="5">
					<a href="javascript:;">5积分</a>
				</div>
				<div class="toReward-box" data-reward="10">
					<a href="javascript:;">10积分</a>
				</div>
				<div class="toReward-box" data-reward="30">
					<a href="javascript:;">30积分</a>
				</div>
				<div class="toReward-box" data-reward="50">
					<a href="javascript:;">50积分</a>
				</div>
				<div class="toReward-box" data-reward="100">
					<a href="javascript:;">100积分</a>
				</div>
				<div class="toReward-box" data-reward="200">
					<a href="javascript:;">200积分</a>
				</div>
				<input type="hidden" id="rewardnum" value="5"/>
			</div>
			<div class="RuleUser-layer-btn">
				<button type="button" onclick="userReward(${cid})">确认打赏</button>
			</div>
		</div>
			
		`
	});

}
function toMark(cid){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		UserLogin();
		return false;
	}
	var data = {
		"type":"mark",
		"cid":cid,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.addLog(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("收藏成功！", {icon: 1});
				loadPostBtn(cid)
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index); 
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
$(function(){
	$("body").on('click','.toReward-box',function(){
		$(".toReward-box").removeClass("active");
		$(this).addClass("active");
		var reward = $(this).attr("data-reward");
		$("#rewardnum").val(reward);
	});
})
function userReward(cid){
	var num = $("#rewardnum").val();
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		UserLogin();
		return false;
	}
	var data = {
		"type":"reward",
		"cid":cid,
		"num":num,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.addLog(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("成功打赏 "+num+" 积分", {icon: 1});
				var timer = setTimeout(function() {
					layer.closeAll()
				}, 2000)
			}else{
				layer.msg(result.msg, {icon: 2});
			}
		},
		error : function(e){
			layer.close(index); 
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function loadPostShop(cid){
	var data = {
		"cid":cid,
	}
	$.ajax({
		type : "post",
		url: API.shopList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":1,
			"page":1,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				if(result.data.length < 1){
					return false;
				}
				var shop = result.data[0];
				isBuyShop(shop.id,shop.type);
				var html = `
				<div class="PostShop-main">
					<div class="PostShop-pic">
						<img src="${shop.imgurl}" />
					</div>
					<div class="PostShop-text">
						<h5>${shop.title}</h5>
						<p><span class="PostShop-price">${shop.price} 积分</span>vip只需<span class="PostShop-VIPprice">${parseInt(shop.price*shop.vipDiscount)}积分</span></p>
						<p class="PostShop-btn">
							<a href="javascript:;" class="PostShop-info" onclick="shopInfo(${shop.id})">查看详情</a>
							<a href="javascript:;" class="PostShop-buy nobuy" onclick="shopBuy(${shop.id})">
								<i class="iconfont icon-cart"></i>
							</a>
							<a href="javascript:;" class="PostShop-buy isbuy" onclick="shopInfo(${shop.id})">
								已购买
							</a>
						</p>
					</div>
				</div>
				`;
				$("#RuleUser-PostShop").html(html);
			}
		},
		error : function(e){
			//layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function isBuyShop(id,type){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var data = {
		"sid":id,
		"token":token
	}
	$.ajax({
		type : "post",
		url: API.isBuyShop(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:data,
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				$(".nobuy").hide();
				$(".isbuy").show();
			}
		},
		error : function(e){
			//layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function shopInfo(id){
	var openW = 630;
	var width = screen.width;
	if(width<650){
		openW = 320;
	}
	layer.open({
	  type: 2,
	  title: "商品内容",
	  area: [openW+'px', '360px'],
	  shade: 0.8,
	  shadeClose: true,
	  content: `/${userIndex}/pages/shopInfo.html?id=${id}`
	});
}
function shopBuy(id){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		UserLogin();
		return false;
	}
	 layer.confirm('确认购买该商品？', {
		btn: ['确定', '取消'],
	}, function(index) {
		var data = {
			"token":token,
			"sid":id
		}
		var index = layer.load(1, {
		  shade: [0.4,'#000']
		});
		
		$.ajax({
			type : "post",
			url: API.buyShop(),
			data:data,
			dataType: 'json',
			success : function(result) {
				layer.close(index); 
				if(result.code==1){
					layer.msg("购买成功！", {icon: 1});
					var timer = setTimeout(function() {
						//shopInfo(id)
						localStorage.setItem("page","pages/order.html");
						localStorage.setItem("pageName","购买订单");
						window.location.href = '/'+userIndex;
					}, 1000);
					
				}else{
					layer.msg(result.msg, {icon: 2});
				}
			},
			error : function(e){
				layer.close(index); 
				layer.alert("请求失败，请检查网络", {icon: 2});
			}
		});
	}, function(index) {
		layer.close(index);
	});
}
function openApp(text){
	if(Schema==""){
		return false;
	}
	var url = Schema+text;
	var iFrame;
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		window.location.href=url;
	} else if (isiOS) {
		//苹果端不处理
	} else {
		//其它端不处理
	}
}