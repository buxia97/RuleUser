main();
header();
footer();
regConfig();
$(function(){
	//登陆判断
	if(!localStorage.getItem("token")){
		$("#main").hide();
		$("#isLogin").show();
		isLogin();
		login();
	}else{
		userInfo();
	}
	//内容部分
	if(localStorage.getItem("page")){
		var page = localStorage.getItem("page");
		var pageName = localStorage.getItem("pageName");
		loadPage(page,pageName);
	}else{
		loadPage("pages/home.html","用户首页");
	}
	
	
	//导航部分
	$("body").on('click','.menu-box>a',function(){
		$(".menu-box a").removeClass("active");
		$(this).addClass("active");
		$(this).next().toggle();
	});
	
});
var order = "abcdefghijkmlnopqrstuvwxyz.-1234567890";
function main(){
	var html = `
	<div class="header" id="header"></div>
	<div class="main" id="main">
		<div class="content">
		</div>
		<div class="footer" id="footer">
		</div>
	</div>
	<div class="isLogin" id="isLogin"></div>
	`;
	$("#RuleWeb").html(html);
}

function header(){
	var html = `
	<div class="header-top">
		<div class="tomenu left">
			<a href="javascript:;" onclick="tomenu()"><i class="iconfont icon-menu2"></i></a>
		</div>
		<div class="logo">
			<a href="${WEB_URL}"><img src="${LOGO_URL}" /></a>
		</div>
		<div class="user" id="user">
			
		</div>
		<div class="top-links">
			
			<a href="${appUrl}" target="_blank" style="color: #e61f18;"><i class="iconfont icon-icondownload"></i>客户端</a>
			<a href="javascript:;" onclick='loadPage("pages/inbox.html","我的消息")'><i class="iconfont icon-email"></i>消息</a>
		</div>
		
	</div>
	<div class="header-left-bg" onclick="tomenu()"></div>
	<div class="header-left">
		
		<div class="user-info" id="userInfo">
			
		</div>
		<div class="post">
			<a href="javascript:;" onclick='loadPage("pages/post.html","发布文章")' class="post-to">发布
			</a>
		</div>
		<div class="menu">
			<div class="menu-main">
				<div class="menu-box menuIndex">
					<a href="javascript:;" class="active" onclick='loadPage("pages/home.html","用户首页")'><i class="iconfont icon-color"></i>用户首页</a>
				</div>
				<div class="menu-box menuUser">
					<a href="javascript:;"><i class="iconfont icon-bussinessman"></i>个人中心<i class="iconfont icon-moreunfold"></i></a>
					<div class="menu-sub">
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/userinfo.html","信息设置")'>信息设置</a>
						</div>
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/inbox.html","我的消息")'>我的消息</a>
						</div>
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/usermark.html","我的收藏")'>我的收藏</a>
						</div>
					</div>
				</div>
				<div class="menu-box menuPost">
					<a href="javascript:;"><i class="iconfont icon-form"></i>创作中心<i class="iconfont icon-moreunfold"></i></a>
					<div class="menu-sub">
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/userpost.html","文章管理")'>文章管理</a>
						</div>
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/myshop.html","商品管理")'>商品管理</a>
						</div>
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/sellorder.html","已出售订单")'>已出售订单</a>
						</div>
					</div>
				</div>
				<div class="menu-box menuAssets">
					<a href="javascript:;"><i class="iconfont icon-trade-assurance"></i>财务中心<i class="iconfont icon-moreunfold"></i></a>
					<div class="menu-sub">
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/vip.html","VIP会员")'>VIP会员</a>
						</div>
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/pay.html","在线充值")'>在线充值</a>
						</div>
						<div class="menu-sub-box">
							<a  href="javascript:;" onclick='loadPage("pages/withdraw.html","提现申请")'>提现申请</a>
						</div>
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/order.html","购买订单")'>购买订单</a>
						</div>
					</div>
				</div>
				<div class="menu-box">
					<a href="${opinionUrl}" target="_blank"><i class="iconfont icon-lights"></i>意见反馈</a>
				</div>
			</div>
		</div>
	</div>
	`;
	$("#header").html(html);
}
var encry2 = "qaZWsXedCrfvtgbyhNujmikolpFG+QERxGBn=H";
function footer(){
	var html = `
	<div class="footer-main">
		<div class="footer-links">
			${footerLink}
		</div>
		<div class="footer-copy">
			${CopyText}
		</div>
	</div>
	<div class="tool">
		<div class="tool-box toTop">
			<a href="#">
				Top
			</a>
		</div>
		<div class="tool-box">
			<a href="${opinionUrl}">
				<i class="iconfont icon-help"></i>
				<p>问题反馈</p>
			</a>
		</div>
		<div class="tool-box">
			<a href="${appUrl}" target="_blank">
				<i class="iconfont icon-scanning"></i>
				<p>APP下载</p>
			</a>
		</div>
	</div>
	`;
	$("#footer").html(html);
}
var kk = "%E8%AF%B7%E5%85%88%E5%AE%8C%E6%88%90%E6%8E%88%E6%9D%83";
//页面载入入口
function loadPage(url,title){
	loading();
	var webTitle = title + " - "+webName;
	$("title").text(webTitle);
	$.ajax({
		type : "get",
		url : url,
		success : function(result) {
			localStorage.setItem("page",url);
			localStorage.setItem("pageName",title);
			userStatus();
			$(".header-left").removeClass("wapShow")
			$(".header-left-bg").removeClass("wapShow")
			$("#main .content").html(result);
			pageData(url);
		},
		error : function(e){
			layer.alert("页面加载失败", {icon: 2});
		}
	});
}
//页面载入方法
function pageData(page){
	if(page=="pages/home.html"){
		getUserData();
		getIndexPost();
		getIndexNotice();
		recommendList();
		indexComment();
		menuActive(".menuIndex");
	}
	if(page=="pages/inbox.html"){
		getInbox();
		menuActive(".menuUser");
	}
	if(page=="pages/usermark.html"){
		getMark();
		menuActive(".menuUser");
	}
	if(page=="pages/userinfo.html"){
		userInfo();
		getUserInfo();
		menuActive(".menuUser");
	}
	if(page=="pages/post.html"){
		localStorage.removeItem('cnum');
		postStyle();
		getContensLocal();
		menuActive(".menuPost");
		//定时保存本地输入
		setInterval(function () {
			contensLocal();	
		}, 5000);
		
	}
	if(page=="pages/edit.html"){
		localStorage.removeItem('cnum');
		postStyle();
		getContensLocal();
		menuActive(".menuPost");
		//getContent();
	}
	if(page=="pages/userpost.html"){
		getArchives();
		menuActive(".menuPost");
	}
	if(page=="pages/comment.html"){
		getComment();
		menuActive(".menuPost");
	}
	if(page=="pages/myshop.html"){
		getShopList();
		menuActive(".menuPost");
	}
	if(page=="pages/shopAdd.html"){
		postStyle();
		getShopBase();
		menuActive(".menuPost");
		//定时保存本地输入
		setInterval(function () {
			shopLocal();	
		}, 5000);
		
	}
	if(page=="pages/shopEdit.html"){
		postStyle();
		getShopBase();
		menuActive(".menuPost");
		
	}
	if(page=="pages/sellorder.html"){
		getSelOrder();
		menuActive(".menuPost");
	}
	if(page=="pages/userwithdrawlist.html"){
		getWithdrawList();
		menuActive(".menuAssets");
	}
	if(page=="pages/order.html"){
		getBuyOrder();
		menuActive(".menuAssets");
	}
	if(page=="pages/value.html"){
		valueStyle();
		getValue();
		menuActive(".menuAssets");
	}
	if(page=="pages/pay.html"){
		getAssets();
		menuActive(".menuAssets");
	}
	if(page=="pages/paylist.html"){
		getPayList();
		menuActive(".menuAssets");
	}
	if(page=="pages/withdraw.html"){
		getAssets();
		menuActive(".menuAssets");
	}
	if(page=="pages/vip.html"){
		getAssets();
		getVipStatus();
		getVipMain();
		menuActive(".menuAssets");
	}
	loginUser();
	
}
var encry3 = "mNBvcXzLkjhGfdsApoIuYtrEWqJH=MxZla+SVy";
function menuActive(text){
	$(".menu-box a").removeClass("active");
	$(text+">a").addClass("active");
}
function loading(){
	var html = `
	<div class="loading">
		<div class="loading-main">
			<img src="img/loading.gif" />
		</div>
	</div>
	`;
	$("#main .content").html(html);
}
function isLogin(){
	
	var html = `
	<div class="isLogin-bg">
		<img src="img/bg.jpg" />
		<div class="isLogin-bg-sh"></div>
	</div>
	<div class="isLogin-main">
		<div class="isLogin-box">
			<a href="javascript:;" class="tocan" onclick="tocan()"><i class="iconfont icon-scanning"></i>扫码登录</a>
			<a href="javascript:;" class="backLogin" onclick="backLogin()"><i class="iconfont icon-password"></i>密码登录</a>
			<div class="isLogin-logo">
				<a href="${WEB_URL}"><img src="${LOGO_URL}" /></a>
			</div>
			<div class="isLogin-form" id="isLogin-form">
				
			</div>
		</div>
	</div>
	`;
	$("#isLogin").html(html);
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
		<div class="box-input">
			<input type="text" placeholder="请输入用户名" id="username" value=""/>
		</div>
		<div class="box-input">
			<input type="password" placeholder="请输入密码" id="userpass" value=""/>
		</div>
		<div class="box-btn">
			<button type="button" onclick="toLogin()">登录</button>
		</div>
		<div class="form-links">
			<a href="javascript:;" onclick="register()">用户注册</a>
			<a href="javascript:;" onclick="forgot()">忘记密码</a>
		</div>
		`;
	$("#isLogin-form").html(html);
}
function forgot(){
	var html = `
		<div class="box-input">
			<input type="text" placeholder="请输入用户名(必填)" value="" id="username"/>
		</div>
		<div class="box-input">
			<input type="text" placeholder="请输入验证码" value="" id="code"/>
			<a href="javascript:;" class="send sendBefor" id="sendBefore" onclick="sendCodeFogot()">发送</a>
			<span class="send sended" id="sended"></span>
		</div>
		<div class="box-input">
			<input type="password" placeholder="请输入新密码" value="" id="newspass"/>
		</div>
		<div class="box-input">
			<input type="password" placeholder="再次输入新密码" value="" id="repass"/>
		</div>
		<div class="box-btn">
			<button type="button" onclick="toForgot()">确认修改</button>
		</div>
		<div class="form-links">
			<a href="javascript:;" onclick="login()">用户登录</a>
		</div>
		`;
	$("#isLogin-form").html(html);
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
		<div class="box-input">
			<input type="text" placeholder="请输入用户名(必填)" value="" id="username"/>
		</div>
		<div class="box-input">
			<input type="text" placeholder="请输入邮箱(必填)" value="" id="email"/>
		</div>
		<div class="box-input" style="${isEmailStyle}">
			<input type="text" placeholder="请输入验证码" value="" id="code"/>
			<a href="javascript:;" class="send sendBefor" id="sendBefore" onclick="sendCode()">发送</a>
			<span class="send sended" id="sended"></span>
		</div>
		<div class="box-input">
			<input type="password" placeholder="请输入密码" value="" id="userpass"/>
		</div>
		<div class="box-input">
			<input type="password" placeholder="再次输入密码" value="" id="repass"/>
		</div>
		<div class="box-input" style="${isInviteStyle}">
			<input type="text" placeholder="请输入邀请码" value="" id="inviteCode"/>
		</div>
		<div class="box-btn">
			<button type="button" onclick="toRegister()">立即注册</button>
		</div>
		<div class="form-links">
			<a href="javascript:;" onclick="login()">用户登录</a>
			<br/>
			<p class="margin-top">注册即为同意<a href="${userAgreement}">《用户协议》</a></p>
		</div>
		`;
	$("#isLogin-form").html(html);
}
var Interval;
function tocan(){
	
	var text = randomString(7)+new Date().getTime();
	
	$(".tocan").hide();
	$(".backLogin").show();
	
	var html = `
		
		<img src="${API.getScan()}?codeContent=${text}" class="col-10 scanPic"/>
		<input type="hidden" value="${text}" id="codeContent"/>
		<div class="box-input text-center">
			<h4>使用本网站APP进行扫码</h4>
			<p class="margin-top"><a href="${appUrl}" target="_blank">${webName}客户端</a></p>
		</div>
		`;
	$("#isLogin-form").html(html);
	openApp(text);
	Interval = setInterval(function () {
		getScan();
	}, 1000);
}
function backLogin(){
	$(".tocan").show();
	$(".backLogin").hide();
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
				typechoLogin(result.data.token,result.data.uid);
				var timer = setTimeout(function() {
					location.reload();
					clearTimeout('timer')
				}, 1000)
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
function tomenu(){
	if($(".header-left").hasClass("wapShow")){
		$(".header-left").removeClass("wapShow")
	}else{
		$(".header-left").addClass("wapShow")
	}
	if($(".header-left-bg").hasClass("wapShow")){
		$(".header-left-bg").removeClass("wapShow")
	}else{
		$(".header-left-bg").addClass("wapShow")
	}
	
}
function intercept(){
	layer.msg("用户未登录", {icon: 2});
	localStorage.removeItem('userinfo');
	localStorage.removeItem('token');
	localStorage.removeItem("page");
	localStorage.removeItem("pageName");
	typechoQuitUser();
	var timer = setTimeout(function() {
		location.reload();
		clearTimeout('timer')
	}, 1000)
}
function userStatus(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
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
var encry1 = "MRqwErtYuiTplKjhgfdSaZXcvbNmQrUMzC+Ay=";
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
				typechoLogin(result.data.token,result.data.uid);
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
	if(userpass!=repass){
		layer.msg("两次密码不一致", {icon: 2});
		return false;
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
			layer.close(index); 
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
function quit(){
	
	localStorage.removeItem('userinfo');
	localStorage.removeItem('token');
	localStorage.removeItem("page");
	localStorage.removeItem("pageName");
	layer.msg("退出成功！", {icon: 1});
	typechoQuitUser();
	var timer = setTimeout(function() {
		location.reload();
		clearTimeout('timer')
	}, 1000)
}
function userInfo(){
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		var uid = userInfo.uid;
		var name = userInfo.name;
		var lv = Number(userInfo.lv);
		var lvText = rankList[lv];
		var lvStyle = rankStyle[lv];
		if(userInfo.screenName){
			name = userInfo.screenName;
		}
		var customize = "";
		if(userInfo.customize){
			customize = `<span>${userInfo.customize}</span>`;
		}
		$.ajax({
			type : "post",
			header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
				"key":uid
			},
			url : API.getUserInfo(),
			dataType: 'json',
			success : function(result) {
				if(result.code==1){
					var userData = result.data;
					var userhtml =`
						<a href="javascript:;"><img src="${userData.avatar}" /></a>
						<div class="user-nav">
							<div class="user-nav-box">
								<a href="javascript:;" onclick='loadPage("pages/userinfo.html","信息设置")'><i class="iconfont icon-set"></i>个人设置</a>
							</div>
							<div class="user-nav-box">
								<a href="javascript:;" onclick="quit()"><i class="iconfont icon-share"></i>退出登录</a>
							</div>
						</div>
					`;
					$("#user").html(userhtml);
					var vip = result.data.vip;
					var isvip = result.data.isvip;
					    
					    
					var vipHtml = `<span style="background-color: #f0f0f0;color: #333333;">VIP</span>`;
					if(isvip==1){
						if(vip==1){
							vipHtml = `<span style="background-image: linear-gradient(45deg, #f43f3b, #ec008c);color: #ffffff;">VIP</span>`;
						}else{
							vipHtml = `<span style="background-color: #fbbd08;color: #333333;">VIP</span>`;
						}
						
					}
					
					var userinfohtml = `
						<a href="/"><img src="${userData.avatar}" /></a>
						<div class="user-rand">
							<span style="background-color: ${lvStyle};">${lvText}</span>
							${customize}
							${vipHtml}
						</div>
						<div class="user-title">
							${name}
						</div>
					`;
					$("#userInfo").html(userinfohtml);
					
					var userformhtml = `
						<div class="box-input">
							<img class="userEdit-avatar" src="${userData.avatar}""/>
						</div>
						<div class="box-btn">
							<button type="button" class="green" onclick="toAvatar()">设置</button>
						</div>
					`;
					$("#userformhtml").html(userformhtml);
				}
			},
			error : function(e){
				
			}
		});
		
		
	}
}
function formatNumber(num) {
	return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
}
//获取日期
function formatDate(datetime) {
	var datetime = new Date(parseInt(datetime * 1000));
	// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
	var year = datetime.getFullYear(),
		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		date = ("0" + datetime.getDate()).slice(-2),
		hour = ("0" + datetime.getHours()).slice(-2),
		minute = ("0" + datetime.getMinutes()).slice(-2);
	//second = ("0" + date.getSeconds()).slice(-2);
	// 拼接
	var result = year + "-" + month + "-" + date;
	// 返回
	return result;
}
function toLinks(data){
	var cid = data.cid;
	var type = data.type;
	
	if(type=="page"){
		var url = pageRule;
		var slug = data.slug;
		if(slug&&slug!=""){
			url = url.replace("{slug}",slug);
		}
	}else{
		var url = linkRule;
		var category = data.category;
		if(category[0].slug){
			category = category[0].slug;
		}
		
		var url = url.replace("{cid}",cid);
		if(category&&category!=""){
			url = url.replace("{category}",category);
		}
	}
	return url;
}
function dataShow(type){
	var html = `
	<div class="dataShow">
		<i class="iconfont icon-process"></i>
		<p>正在载入数据...</p>
	</div>`;
	if(type==1){
		html = `
		<div class="dataShow">
			<i class="iconfont icon-form"></i>
			<p>暂无数据</p>
		</div>`;
	}
	return html;
}
//登录校验
function loginUser(){
	var plan;
	var www;
	var planVlaue;
	var planArr;
	var auth = authorize;
	if(auth.indexOf("Gjk==") != -1 ){
		plan=0;
	}
	if(auth.indexOf("MwL==") != -1 ){
		plan=1;
	}
	if(auth.indexOf("qvB==") != -1 ){
		plan=2;
	}
	if(plan==0){
		planVlaue="Gjk==";
		www = "iurer";
		planArr=encry1;
	}
	if(plan==1){
		planVlaue="MwL==";
		www = "jjetg";
		planArr=encry2;
	}
	if(plan==2){
		planVlaue="qvB==";
		www = "cdpvc";
		planArr=encry3;
	}
	auth = auth.replace(planVlaue,"");
	var totext="";
	for(var i in auth){
		var index = planArr.indexOf(auth[i]);
		totext=totext+order[index];
		
	}
	totext = totext.replace(www,"www");
	var domain = window.location.hostname;
	if(domain=="127.0.0.1"){
		return false;
	}
	if(totext!=domain){
		localStorage.clear();
	}
	if(totext!=domain){
		layer.alert(decodeURIComponent(kk), {icon: 2});
		//location.reload();
	}
	
}
function toOwo(){
	$(".owo").toggle();
}
function OWO(){
	$(".owo").html(`
		<div class="owo-list">
			
		</div>
		<div class="owo-type">
			<a href="javascript:;" onclick="getOWO('paopao')" class="owo-box paopao active">泡泡</a>
			<a href="javascript:;" onclick="getOWO('adai')" class="owo-box adai">阿呆</a>
			<a href="javascript:;" onclick="getOWO('alu')" class="owo-box alu">阿鲁</a>
			<a href="javascript:;" onclick="getOWO('quyinniang')" class="owo-box quyinniang">蛆音娘</a>
		</div>
	`);
	getOWOList("paopao");
}
function getOWOList(type){
	$(".owo-box").removeClass("active");
	$("."+type).addClass("active");
	var owoList = OWOData[type].container;
	var html = ``;
	for(var i in owoList){
		html+=`
			<div class="owo-lit-box">
				<a href="javascript:;" onclick="setOWO('${owoList[i].data}')"><img src="${owoList[i].icon}"/></a>
			</div>
		`;
	}
	$(".owo-list").html(html);
}
function setOWO(owo){
	var text = $("#text").val();
	$("#text").val(text+owo);
	$(".owo").hide();
}
function typechoLogin(token,uid){
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
			
		},
		error : function(e){
			//layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function typechoQuitUser(){
	if(TypechoUserLogin!=1){
		return false;
	}
	var text = randomString(7)+new Date().getTime();
	$.ajax({
		type : "get",
		url : "/?quit="+text,
		dataType: 'json',
		success : function(result) {
			
		},
		error : function(e){
		}
	});
}
//以上公共方法结束
//下面是请求方法



function getUserData(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
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
		url : API.getUserData(),
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var userData = result.data;
				var html = `
				<div class="col-33 padding left">
					<div class="total-data-box">
						<p>我的文章</p>
						<h5>${userData.contentsNum}</h5>
					</div>
				</div>
				<div class="col-33 padding left">
					<div class="total-data-box">
						<p>我的评论</p>
						<h5>${userData.commentsNum}</h5>
					</div>
				</div>
				<div class="col-33 padding left">
					<div class="total-data-box">
						<p>我的积分</p>
						<h5 class="assets">${userData.assets}</h5>
					</div>
				</div>
				`;
				$("#total-data").html(html);
			}
		},
		error : function(e){
			
		}
	});
}
function getIndexPost(){
	$("#index-archives").html(dataShow(0));
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var authorId;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		authorId = userInfo.uid;
	}else{
		return false;
	}
	var data = {
		"type":"post",
		"status":"publish",
		"authorId":authorId,
	}
	$.ajax({
		type : "post",
		url: API.getContentsList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":4,
			"page":1,
			"order":"created",
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					for(var i in list){
						var img = `<img src="img/nopic.png" />`;
						if(list[i].images.length>0){
							img = `<img src="${list[i].images[0]}" />`;
						}
						html+=`
						<div class="index-archives-box overflow-hidden">
							<a href="${toLinks(list[i])}" target="_blank">
								<div class="col-5 left">
									<div class="index-archives-img">
									${img}
									</div>
									<div class="index-archives-info">
										<h3>${list[i].title}</h3>
										<p>${formatDate(list[i].created)}</p>
									</div>
								</div>
								<div class="col-5 left index-archives-data">
									<div class="col-25 right">
										<h5>${formatNumber(list[i].views)}</h5>
										<p>浏览量</p>
									</div>
									<div class="col-25 right">
										<h5>${formatNumber(list[i].commentsNum)}</h5>
										<p>评论量</p>
									</div>
									<div class="col-25 right">
										<h5>${formatNumber(list[i].likes)}</h5>
										<p>点赞量</p>
									</div>
								</div>
							</a>
						</div>
						`;
					}
					$("#index-archives").html(html);
				}else{
					$("#index-archives").html(dataShow(1));
				}
				
			}else{
				$("#index-archives").html(dataShow(1));
			}
		},
		error : function(e){
			$("#index-archives").html(dataShow(1));
		}
	});
}
function getIndexNotice(){
	$("#notice").html(dataShow(0));
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var data = {
		"type":"post",
		"status":"publish",
		"mid":noticeID
	}
	$.ajax({
		type : "post",
		url: API.getMetaContents(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":5,
			"page":1,
			"order":"created",
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					for(var i in list){
						
						html+=`
						<div class="notice-box">
							<a href="${toLinks(list[i])}"  target="_blank"><span>${formatDate(list[i].created)}</span> ${list[i].title}</a>
						</div>
						`;
					}
					$("#notice").html(html);
				}else{
					$("#notice").html(dataShow(1));
				}
			}else{
				$("#notice").html(dataShow(1));
			}
		},
		error : function(e){
			$("#notice").html(dataShow(1));
		}
	});
}
function recommendList(){
	$("#hot-archives").html(dataShow(0));
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var data = {
		"type":"post",
		"mid":recommendID
	}
	$.ajax({
		type : "post",
		url: API.getMetaContents(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":3,
			"page":1,
			"order":"created",
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					for(var i in list){
						var img = `<img src="img/nopic.png" />`;
						if(list[i].images.length>0){
							img = `<img src="${list[i].images[0]}" />`;
						}
						html+=`
						<div class="padding col-33 left">
							<a href="${toLinks(list[i])}" target="_blank">
								<div class="hot-archives-box">
									<div class="hot-archives-pic">
										${img}
									</div>
									<div class="hot-archives-info">
										<h3>${list[i].title}</h3>
										<p><i class="iconfont icon-office"></i>${formatNumber(list[i].views)}</p>
									</div>
								</div>
							</a>
							
						</div>
						`;
					}
					$("#hot-archives").html(html);
				}else{
					$("#hot-archives").html(dataShow(1));
				}
				
			}else{
				$("#hot-archives").html(dataShow(1));
			}
		},
		error : function(e){
			$("#hot-archives").html(dataShow(1));
		}
	});
}
function indexComment(){
	$("#new-comment").html(dataShow(0));
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var data = {
		"type":"comment",
		"status":"approved"
	}
	$.ajax({
		type : "post",
		url: API.getCommentsList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":4,
			"page":1,
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					for(var i in list){
						var lv = Number(list[i].lv);
						var lvText = rankList[lv];
						var lvStyle = rankStyle[lv];
						var customize = "";
						if(list[i].customize){
							customize = `<span class="userlv">${list[i].customize}</span>`;
						}
						html+=`
						<div class="comment-box">
							<div class="comment-avatar left">
								<img src="${list[i].avatar}" />
							</div>
							<div class="comment-main left">
								<div class="comment-userinfo">
									<p>
										<a href="javascript:;">${list[i].author}</a>
										<span class="userlv" style="background:${lvStyle}">${lvText}</span>
										${customize}
										<span class="comment-date right">${formatDate(list[i].created)}</span>
									</p>
								</div>
								<div class="comment-text">
									
									${markHtml(list[i].text)}
									
								</div>
								<div class="comment-links">
									发表在：<a href="${toLinks(list[i].contentsInfo)}" target="_blank">${list[i].contenTitle}</a>
								</div>
							</div>
						</div>
						`;
					}
					$("#new-comment").html(html);
				}else{
					$("#new-comment").html(dataShow(1));
				}
				
			}else{
				$("#new-comment").html(dataShow(1));
			}
		},
		error : function(e){
			$("#new-comment").html(dataShow(1));
		}
	});
}
function toOpinionUrl(){
	window.open(opinionUrl, "_blank");
}
function getInbox(isPage){
	
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var page = $("#page").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#inbox").html(dataShow(0));
	}
	var data = {
		"type":"comment",
		"status":"approved"
	}
	$.ajax({
		type : "post",
		url: API.getCommentsList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":10,
			"page":page,
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var lv = Number(list[i].lv);
						var lvText = rankList[lv];
						var lvStyle = rankStyle[lv];
						var customize = "";
						if(list[i].customize){
							customize = `<span class="userlv">${list[i].customize}</span>`;
						}
						html+=`
						<div class="comment-box">
							<div class="comment-avatar left">
								<img src="${list[i].avatar}" />
							</div>
							<div class="comment-main left">
								<div class="comment-userinfo">
									<p>
										<a href="javascript:;">${list[i].author}</a>
										<span class="userlv" style="background:${lvStyle}">${lvText}</span>
										${customize}
										<span class="comment-date right">${formatDate(list[i].created)}</span>
									</p>
								</div>
								<div class="comment-text">
									
									${markHtml(list[i].text)}
									
								</div>
								<div class="comment-links">
									发表在：<a href="${toLinks(list[i].contentsInfo)}" target="_blank">${list[i].contenTitle}</a>
									<div class="reply right"><a href="javascript:;" onclick="reply('${list[i].author}','${list[i].coid}','${list[i].cid}')">回复</a></div>
								</div>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#inbox").append(html);
					}else{
						$("#inbox").html(html);
					}
					
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$("#inbox").html(dataShow(1));
					}
				}
				
			}
		},
		error : function(e){
			if(isPage){
				$(".more").hide();
			}else{
				$("#inbox").html(dataShow(1));
			}
		}
	});
}
function reply(author,coid,cid){
	layer.open({
		title:"回复 [ "+author+" ] 的评论：",
		type: 1,
		area: ['320px', '300px'], 
		content: `
		<div class="layer-form">
			<div class="box-input">
				<input type="hidden" id="coid" value="${coid}"/>
				<input type="hidden" id="cid" value="${cid}"/>
				<textarea class="text reply-text" id="text" placeholder="请输入评论的内容"></textarea>
			</div>
			<div class="comments-owo">
				<a href="javascript:;" class="toOwo" onclick="toOwo()"><i class="iconfont icon-smile"></i></a>
				<div class="owo">
					
				</div>
			</div>
			<div class="box-btn">
				<button type="button" class="radius" onclick="toReply()">回复</button>
			</div>
		</div>
			
		`
	});
	OWO();
}

function toReply(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var coid = $("#coid").val();
	var cid = $("#cid").val();
	var text =  $("#text").val();
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
				layer.msg("操作成功！", {icon: 1});
				var timer = setTimeout(function() {
					layer.closeAll();
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
function getMark(isPage){
	
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var page = $("#page").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#mark").html(dataShow(0));
	}
	var data = {
		"type":"comment",
		"status":"approved"
	}
	$.ajax({
		type : "post",
		url: API.getMarkList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"limit":8,
			"page":page,
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var img = `<img src="img/nopic.png" />`;
						if(list[i].images.length>0){
							img = `<img src="${list[i].images[0]}" />`;
						}
						html+=`
						<div class="mark-box col-5 left">
							
							<div class="mark-main overflow-hidden radius">
								<div class="archives-img">
									<a href="${toLinks(list[i])}" target="_blank">${img}</a>
								</div>
								<div class="archives-info">
									<h3><a href="${toLinks(list[i])}" target="_blank">${list[i].title}</a></h3>
									<p>${formatDate(list[i].created)} <a href="javascript:;" class="text-red right" onclick="rmMark('${list[i].logid}')">取消收藏</a> </p>
								</div>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#mark").append(html);
					}else{
						$("#mark").html(html);
					}
					
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$("#mark").html(dataShow(1));
					}
				}
				
			}
		},
		error : function(e){
			if(isPage){
				$(".more").hide();
			}else{
				$("#mark").html(dataShow(1));
			}
		}
	});
}
function rmMark(logid){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.removeLog(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"key":logid,
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("操作成功！", {icon: 1});
				var timer = setTimeout(function() {
					layer.closeAll();
					getMark();
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

function toAvatar(){
	layer.open({
		title:"头像设置说明",
		type: 1,
		area: ['320px', '280px'], 
		content: `
		<div class="layer-form">
			<div class="box-input">
				<p>下载APP即可设置您的个人头像！</p>
				<p>同时，您还可以将邮箱设置成QQ邮箱，将自动获取您的QQ头像，或者前往全球最大的头像库Gravatar，通过邮箱注册账号，并设置您的公共头像。</p>
			</div>
			<div class="box-btn">
				<button type="button" class="radius" onclick="toGravatar()">前往Gravatar</button>
			</div>
		</div>
			
		`
	});
}
function toGravatar(){
	window.open("https://cn.gravatar.com/", "_blank");
}
function getUserInfo(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.userStatus(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				
				$("#name").val(result.data.name);
				$("#screenName").val(result.data.screenName);
				$("#mail").val(result.data.mail);
				$("#url").val(result.data.url);
				if(result.data.address){
					var addressarr = result.data.address.split("|");
					$("#receiptName").val(addressarr[0]);
					$("#telephone").val(addressarr[1]);
					$("#address").val(addressarr[2]);
				}
				if(result.data.pay){
					var payarr = result.data.pay.split("|");
					$("#type").val(payarr[0]);
					$("#realname").val(payarr[1]);
					$("#info").val(payarr[2]);
					$("#imgurl").val(payarr[3]);
					if(payarr[3]){
						$("#imgurlText").val("已上传图片");
					}
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
function toPayPic(){
	var url= $("#imgurl").val();
	if(url==""){
		layer.msg("请先上传图片", {icon: 2});
		return false;
	}
	layer.open({
		title:"收款码查看",
		type: 1,
		area: ['320px', '320px'], 
		content: `
		<div class="layer-form">
			<img src="${url}" class="col-10"/>
		</div>
		`
	});
}
function saveUserInfo(type){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var data;
	if(type==0){
		var name = $("#name").val();
		var screenName = $("#screenName").val();
		var url = $("#url").val();
		var data = {
			uid:uid,
			name:name,
			screenName:screenName,
			url:url,
		}
	}
	if(type==1){
		var password = $("#password").val();
		var repassword = $("#repassword").val();
		if(password==""||repassword==""){
			layer.msg("参数不能为空！", {icon: 2});
			return false;
		}
		if(password!=password){
			layer.msg("两次密码不一致！", {icon: 2});
			return false;
		}
		data = {
			uid:uid,
			name:name,
			password:password,
		}
	}
	if(type==2){
		var receiptName = $("#receiptName").val();
		var telephone = $("#telephone").val();
		var address = $("#address").val();
		if(receiptName==""||telephone==""||address==""){
			layer.msg("参数不能为空！", {icon: 2});
			return false;
		}
		var address = receiptName+"|"+telephone+"|"+address;
		data = {
			uid:uid,
			name:name,
			address:address,
		}
	}
	if(type==3){
		var type = $("#type").val();
		var realname = $("#realname").val();
		var info = $("#info").val();
		var imgurl = $("#imgurl").val();
		if(type==""||realname==""||info==""||imgurl==""){
			layer.msg("参数不能为空！", {icon: 2});
			return false;
		}
		var pay = type+"|"+realname+"|"+info+"|"+imgurl;
		data = {
			uid:uid,
			name:name,
			pay:pay,
		}
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.userEdit(),
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
				layer.msg("操作成功！", {icon: 1});
				var timer = setTimeout(function() {
					
					getUserInfo();
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
function postStyle(){
	var style =`
	<link rel="stylesheet" href="editormd/css/editormd.css" />
	`;
	var script =`
	<script src="editormd/editormd.min.js"></script>`;
	$("head").append(style);
	$("#base").before(script);
}
function valueStyle(){
	var style =`
	<link rel="stylesheet" href="editormd/css/editormd.css" />
	`;
	var script =`
	<script src="editormd/editormd.min.js"></script>
	<script src="editormd/lib/prettify.min.js"></script>
	<script src="editormd/lib/marked.min.js"></script>
	`;
	
	$("head").append(style);
	$("#base").before(script);
}
function uploadPic(){
	
	$("#upload").click();
	$("#upload").change(function() {
		var token;
		if(localStorage.getItem("token")){
			token = localStorage.getItem("token");
		}else{
			return false;
		}
		var upload = $("#upload").val();
		if(upload==""){
			return false;
		}
		var formData = new FormData();
		formData.append("file", $("#upload")[0].files[0]);
		formData.append("token",token);
		$("#upload").val("");
		var index = layer.load(1, {
		  shade: [0.4,'#000']
		});
		$.ajax({
			url: API.upload(),
			type: "post",
			data: formData,
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			dataType: 'json',
			success: function(result) {
				layer.close(index); 
				
				if(result.code==1){
					layer.msg("上传成功！", {icon: 1});
					$("#imgurl").val(result.data.url);
					$("#imgurlText").val("已上传图片");
				}else{
					layer.msg(result.msg, {icon: 2});
				}
			},
			error: function(data) {
				layer.close(index); 
				layer.alert("请求失败，请检查网络", {icon: 2});
			}
		});
	})
	
}
function setEmail(){
	layer.open({
		title:"邮箱设置",
		type: 1,
		area: ['320px', '320px'], 
		content: `
		<div class="layer-form">
			<div class="box-input">
				<label>新邮箱</label>
				<input type="text"  id="newmail"  placeholder="请输入新邮箱"/>
			</div>
			<div class="box-input">
				<label>验证码</label>
				<input type="text" id="code" placeholder="填写新邮箱验证码"/>
				<div class="input-links">
					<a href="javascript:;" onclick="sendEmailCode()" class="sendBefore" id="sendBefore">发送</a>
					<span id="sended" class="sended"></span>
				</div>
			</div>
			<div class="box-btn">
				<button type="button" class="radius" onclick="toReply()">保存设置</button>
			</div>
		</div>
			
		`
	});
}
function sendEmailCode(){
	var newmail = $("#newmail").val();
	if(newmail==""){
		layer.msg("请输入邮箱地址", {icon: 2});
		return false;
	}
	var data = {
		'mail':newmail
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
			layer.close(index); 
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
$(function(){
	
	$("body").on('click','#archives-type a',function(){
		$("#archives-type a").removeClass("active");
		$(this).addClass("active");
		var type = $(this).attr("data-type");
		$("#type").val(type);
		$("#page").val(1);
		getArchives();
	});
	//选择分类
	$("body").on('click','#category a',function(){
		
		if($(this).hasClass("active")){
			var num = localStorage.getItem("cnum");
			num--;
			localStorage.setItem("cnum",num);
			$(this).removeClass("active");
		}else{
			if(localStorage.getItem("cnum")){
				var num = localStorage.getItem("cnum");
				num++;
				if(num>3){
					layer.msg("最多只能选择三个分类", {icon: 2});
					return false;
				}
				localStorage.setItem("cnum",num);
			}else{
				localStorage.setItem("cnum",1);
			}
			$(this).addClass("active");
		}
		var text = "";
		var html = "";
		$("#category a.active").each(function(){
			var mid = $(this).attr("data-mid");
			var name = $(this).text();
			text = text +","+mid;
			html +=`
				<a href="javascript:;" class="toTag data-cur" data-mid="${mid}">
					${name}<i class="iconfont icon-close"></i>
				</a>
			`;
		});
		html +=`
			<a href="javascript:;" class="toTag" onclick="toCategory()">
				<i class="iconfont icon-add"></i>
			</a>
		`;
		$("#categoryBox").html(html);
		$("#categoryText").val(text);
	});
	$("body").on('click','#categoryBox a.data-cur',function(){
		$(this).remove();
		var text = "";
		var html = "";
		$("#categoryBox a.data-cur").each(function(){
			
			var mid = $(this).attr("data-mid");
			var name = $(this).text();
			text = text +","+mid;
			html +=`
				<a href="javascript:;" class="toTag data-cur" data-mid="${mid}">
					${name}<i class="iconfont icon-close"></i>
				</a>
			`;
		});
		html +=`
			<a href="javascript:;" class="toTag" onclick="toCategory()">
				<i class="iconfont icon-add"></i>
			</a>
		`;
		$("#categoryBox").html(html);
		$("#categoryText").val(text);
		
	});
	//选择标签
	$("body").on('click','#tag a',function(){
		
		if($(this).hasClass("active")){
			var num = localStorage.getItem("tnum");
			num--;
			localStorage.setItem("tnum",num);
			$(this).removeClass("active");
		}else{
			if(localStorage.getItem("tnum")){
				var num = localStorage.getItem("tnum");
				num++;
				if(num>5){
					layer.msg("最多只能选择五个标签", {icon: 2});
					return false;
				}
				localStorage.setItem("tnum",num);
			}else{
				localStorage.setItem("tnum",1);
			}
			$(this).addClass("active");
		}
		var text = "";
		var html = "";
		$("#tag a.active").each(function(){
			var mid = $(this).attr("data-mid");
			var name = $(this).text();
			text = text +","+mid;
			html +=`
				<a href="javascript:;" class="toTag data-cur" data-mid="${mid}">
					${name}<i class="iconfont icon-close"></i>
				</a>
			`;
		});
		html +=`
			<a href="javascript:;" class="toTag" onclick="toTag()">
				<i class="iconfont icon-add"></i>
			</a>
		`;
		$("#tagBox").html(html);
		$("#tagText").val(text);
	});
	$("body").on('click','#tagBox a.data-cur',function(){
		$(this).remove();
		var text = "";
		var html = "";
		$("#tagBox a.data-cur").each(function(){
			
			var mid = $(this).attr("data-mid");
			var name = $(this).text();
			text = text +","+mid;
			html +=`
				<a href="javascript:;" class="toTag data-cur" data-mid="${mid}">
					${name}<i class="iconfont icon-close"></i>
				</a>
			`;
		});
		html +=`
			<a href="javascript:;" class="toTag" onclick="toTag()">
				<i class="iconfont icon-add"></i>
			</a>
		`;
		$("#tagBox").html(html);
		$("#tagText").val(text);
		
	});
})
var editor;
function toSearch(){
	var searchText  = $("#searchText").val();
	$("#page").val(1);
	getArchives();
}
function getContensLocal(){
	editor = editormd("text-editor", {
	    path   : "editormd/lib/",
		height  : 640,
		watch : false,
		placeholder:"请输入文章的内容",
	    toolbarIcons : function() {
			return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "hr", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|",  "list-ul", "list-ol", "hr","|","link","reference-link","code","preformatted-text", "code-block", "table","|","filepic","shopbag", "||", "watch"]
		},
		toolbarCustomIcons : {
			shopbag : '<a href="javascript:;" title="添加商品" ontouchstart="toShop()" onclick="toShop()"><i class="fa fa-shopping-cart"></i></a>',
			filepic : `<a href="javascript:;" title="添加图片" ontouchstart="contensPic()" onclick="contensPic()"><i class="fa fa-picture-o"></i></a>
			<input type="file" style="display:none"  accept="image/*" id="contensPic"/>
			`,
		},
		onload : function() {
			if(localStorage.getItem('contensLocal')&&localStorage.getItem('page')!="pages/edit.html"){
				layer.msg("检测到本地缓存，已载入", {icon: 1});
				var data = localStorage.getItem('contensLocal');
				data = JSON.parse(data);
				$("#title").val(data.title);
				$("#tagText").val(data.tag);
				$("#categoryText").val(data.category);
				editor.clear();
				editor.insertValue(data.text);
				$("#shopID").val(data.shopID);
				$("#categoryBox").html(data.categoryBox);
				$("#tagBox").html(data.tagBox);
			}
			if(localStorage.getItem('page')=="pages/edit.html"){
				getContent()
			}
		},
		
		
	});
	
}
function getArchives(isPage){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var authorId;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		authorId = userInfo.uid;
	}else{
		return false;
	}
	var page = $("#page").val();
	var searchText  = $("#searchText").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#archives-list").html(dataShow(0));
	}
	var type = $("#type").val();
	var data = {
		"type":"post",
		//"status":"publish",
		"authorId":authorId,
	}
	if(type!="all"){
		data = {
			"type":"post",
			"status":type,
			"authorId":authorId,
		}
	}
	$.ajax({
		type : "post",
		url: API.getContentsList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":10,
			"page":page,
			"order":"created",
			"token":token,
			"searchKey":searchText,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var img = `<img src="img/nopic.png" />`;
						if(list[i].images.length>0){
							img = `<img src="${list[i].images[0]}" onerror="this.onerror='';src='img/nopic.png'"/>`;
						}
						var category="";
						if(list[i].category.length>0){
							var arr = list[i].category;
							for(var j in arr){
								category += `<span class="status-gray">${arr[j].name}</span>`;
							}
							
						}
						var status = `<span class="status-green">已发布</span>`;
						if(list[i].status=="waiting"){
							status = `<span class="status-orange">待审核</span>`;
						}
						html+=`
						<div class="archives-list-box overflow-hidden">
							<div class="archives-list-pic left">
								${img}
							</div>
							<div class="archives-list-info left">
								<div class="archives-list-title">
									<a href="${toLinks(list[i])}" target="_blank">${list[i].title}</a>
									<span class="right">${API.formatDate(list[i].created)}</span>
								</div>
								<div class="archives-list-status">
									${status}
									${category}
								</div>
								<div class="archives-list-links">
									<div class="archives-list-data left">
										<span><i class="iconfont icon-browse"></i>${formatNumber(list[i].views)}</span>
										<span><i class="iconfont icon-remind1"></i>${formatNumber(list[i].commentsNum)}</span>
										<span><i class="iconfont icon-good"></i>${formatNumber(list[i].likes)}</span>
									</div>
									<div class="archives-list-btn right">
										<a href="${toLinks(list[i])}" target="_blank">访问文章</a>
										<a href="javascript:;"  onclick='toComment(${list[i].cid})'>查看评论</a>
										<a href="javascript:;" onclick='toEdit(${list[i].cid})'>编辑文章</a>
									</div>
								</div>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#archives-list").append(html);
					}else{
						$("#archives-list").html(html);
					}
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$(".more").hide();
						$("#archives-list").html(dataShow(1));
					}
				}
				
			}else{
				if(isPage){
					$(".more").hide();
				}else{
					$(".more").hide();
					$("#archives-list").html(dataShow(1));
				}
			}
		},
		error : function(e){
			$(".more").hide();
			$("#archives-list").html(dataShow(1));
		}
	});
}
function toComment(cid){
	localStorage.setItem('commentCid',cid);
	loadPage("pages/comment.html","评论管理");
}
function toEdit(cid){
	localStorage.setItem('editCid',cid);
	loadPage("pages/edit.html","编辑文章");
}
function getComment(isPage){
	
	var token;
	var cid;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	if(localStorage.getItem('commentCid')){
		cid = localStorage.getItem('commentCid');
	}
	var page = $("#page").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#comment").html(dataShow(0));
	}
	var data = {
		"cid":cid,
		"type":"comment",
		"status":"approved"
	}
	$.ajax({
		type : "post",
		url: API.getCommentsList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":10,
			"page":page,
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var lv = Number(list[i].lv);
						var lvText = rankList[lv];
						var lvStyle = rankStyle[lv];
						var customize = "";
						if(list[i].customize){
							customize = `<span class="userlv">${list[i].customize}</span>`;
						}
						html+=`
						<div class="comment-box">
							<div class="comment-avatar left">
								<img src="${list[i].avatar}" />
							</div>
							<div class="comment-main left">
								<div class="comment-userinfo">
									<p>
										<a href="javascript:;">${list[i].author}</a>
										<span class="userlv" style="background:${lvStyle}">${lvText}</span>
										${customize}
										<span class="comment-date right">${formatDate(list[i].created)}</span>
									</p>
								</div>
								<div class="comment-text">
									
									${list[i].text}
									
								</div>
								<div class="comment-links">
									发表在：<a href="${toLinks(list[i])}" target="_blank">${list[i].contenTitle}</a>
									<div class="reply right"><a href="javascript:;" onclick="reply('${list[i].author}','${list[i].coid}','${list[i].cid}')">回复</a></div>
								</div>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#comment").append(html);
					}else{
						$(".more").hide();
						$("#comment").html(html);
					}
					
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$(".more").hide();
						$("#comment").html(dataShow(1));
					}
				}
				
			}
		},
		error : function(e){
			if(isPage){
				$(".more").hide();
			}else{
				$(".more").hide();
				$("#comment").html(dataShow(1));
			}
		}
	});
}
function toCategory(){
	layer.open({
		title:"选择分类",
		type: 1,
		area: ['330px', '320px'], 
		content: `
		<div class="layer-form">
			<div class="data-search center">
				<div class="data-search-box">
					<input type="text" id="searchText" placeholder="请输入关键字">
					<button type="button" onclick="getCategory()">
						<i class="iconfont icon-search"></i>
					</button>
				</div>
			</div>
			<div class="box-input overflow-hidden" id="category">
				
			</div>
			
		</div>
			
		`,
		cancel: function(){
			localStorage.removeItem('cnum');
		}
	});
	getCategory();
}
function toTag(){
	layer.open({
		title:"选择标签",
		type: 1,
		area: ['330px', '320px'], 
		content: `
		<div class="layer-form">
			<div class="data-search center">
				<div class="data-search-box">
					<input type="text" id="searchText" placeholder="请输入关键字">
					<button type="button" onclick="getTag()">
						<i class="iconfont icon-search"></i>
					</button>
				</div>
			</div>
			<div class="box-input overflow-hidden" id="tag">
				
			</div>
		</div>
			
		`,
		cancel: function(){
			localStorage.removeItem('tnum');
		}
	});
	getTag();
}
function getCategory(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var data = {
		"type":"category"
	}
	$("#category").html(dataShow(0));
	var categoryText = $("#categoryText").val();
	var searchText = $("#searchText").val();
	$.ajax({
		type : "post",
		url: API.getMetasList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":100,
			"page":1,
			"searchKey":searchText,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					
					for(var i in list){
						var isActive = "";
						var mid = list[i].mid;
						if(categoryText!=""){
							var arr = categoryText.split(",");
							for(var j in arr){
								if(arr[j]==mid){
									isActive = "active";
									if(localStorage.getItem('cnum')){
										var cnum = localStorage.getItem('cnum');
										cnum++;
										localStorage.setItem('cnum',cnum);
									}else{
										localStorage.setItem('cnum',1);
									}
								}
							}
						}
						
						html+=`
						<a href="javascript:;" class="toTag ${isActive}" data-mid="${list[i].mid}">
							${list[i].name}
						</a>
						`;
					}
					$("#category").html(html);
				}else{
					$("#category").html(dataShow(1));
					
				}
				
			}
		},
		error : function(e){
			$("#category").html(dataShow(1));
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function getTag(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var data = {
		"type":"tag"
	}
	$("#tag").html(dataShow(0));
	var tagText = $("#tagText").val();
	var searchText = $("#searchText").val();
	$.ajax({
		type : "post",
		url: API.getMetasList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":1000,
			"page":1,
			"searchKey":searchText,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					
					for(var i in list){
						var isActive = "";
						var mid = list[i].mid;
						if(tagText!=""){
							var arr = tagText.split(",");
							for(var j in arr){
								if(arr[j]==mid){
									isActive = "active";
									if(localStorage.getItem('tnum')){
										var tnum = localStorage.getItem('tnum');
										tnum++;
										localStorage.setItem('tnum',tnum);
									}else{
										localStorage.setItem('tnum',1);
									}
								}
							}
						}
						
						html+=`
						<a href="javascript:;" class="toTag ${isActive}" data-mid="${list[i].mid}">
							${list[i].name}
						</a>
						`;
					}
					$("#tag").html(html);
				}else{
					$("#tag").html(dataShow(1));
					
				}
				
			}
		},
		error : function(e){
			$("#tag").html(dataShow(1));
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}


function contensLocal(){
	var title = $("#title").val();
	var text = editor.getMarkdown();
	var category = $("#categoryText").val();
	var tag = $("#tagText").val();
	var shopID = $("#shopID").val();
	var categoryBox = $("#categoryBox").html();
	var tagBox = $("#tagBox").html();
	if(title==""&&text==""){
		localStorage.removeItem('contensLocal');
		return false;
	}
	var data = {
		'title':title,
		'category':category,
		'tag':tag,
		'text':text,
		'sid':shopID,
		"categoryBox":categoryBox,
		"tagBox":tagBox,
	}
	localStorage.setItem('contensLocal',JSON.stringify(data));
}
function contensAdd(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var title = $("#title").val();
	var text = editor.getMarkdown();
	var category = $("#categoryText").val();
	var tag = $("#tagText").val();
	var shopID = $("#shopID").val();
	if (title == ""||category == ""||text == "") {
		layer.msg("请输入正确的参数", {icon: 2});
		return false
	}
	var data = {
		'title':title,
		'category':category,
		'tag':tag,
		'text':text,
		'sid':shopID
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.contentsAdd(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("操作成功！", {icon: 1});
				localStorage.removeItem('contensLocal');
				var timer = setTimeout(function() {
					loadPage("pages/userpost.html","文章管理");
				}, 500);
				
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
function contensPic(){
	
	$("#contensPic").click();
	$("#contensPic").change(function() {
		var token;
		if(localStorage.getItem("token")){
			token = localStorage.getItem("token");
		}else{
			return false;
		}
		var formData = new FormData();
		var contensPic = $("#contensPic").val();
		if(contensPic==''){
			return false;
		}
		formData.append("file", $("#contensPic")[0].files[0]);
		formData.append("token",token);
		$("#contensPic").val("");
		var index = layer.load(1, {
		  shade: [0.4,'#000']
		});
		$.ajax({
			url: API.upload(),
			type: "post",
			data: formData,
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			dataType: 'json',
			success: function(result) {
				layer.close(index); 
				
				if(result.code==1){
					layer.msg("上传成功！", {icon: 1});
					editor.insertValue("![图片名称]("+result.data.url+")");
				}else{
					layer.msg(result.msg, {icon: 2});
				}
			},
			error: function(data) {
				layer.close(index); 
				layer.alert("请求失败，请检查网络", {icon: 2});
			}
		});
	})
	
}
function toShop(){
	layer.open({
		title:"插入商品",
		type: 1,
		area: ['330px', '320px'], 
		content: `
		<div class="layer-form">
			<div class="post-shop" id="post-shop">
			</div>
		</div>
			
		`
	});
	getShop();
}
function getShop(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var data = {
		"uid":uid,
		"status":1,
	}
	var shopID = $("#shopID").val();
	$("#post-shop").html(dataShow(0));
	$.ajax({
		type : "post",
		url: API.shopList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":1000,
			"page":1,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					
					for(var i in list){
						var isActive = "";
						if(shopID==list[i].id){
							isActive = "active";
						}
						html+=`
						<a href="javascript:;" class="shop-box ${isActive}" onclick="setShop(${list[i].id})">
							<i class="iconfont icon-cart"></i>${list[i].title}
						</a>
						`;
					}
					$("#post-shop").html(html);
				}else{
					$("#post-shop").html(dataShow(1));
					
				}
				
			}
		},
		error : function(e){
			$("#post-shop").html(dataShow(1));
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function setShop(id){
	var shopID = $("#shopID").val();
	if(id==shopID){
		layer.msg("商品已解除挂载", {icon: 1});
		$("#shopID").val("");
		$(".fa-shopping-cart").removeClass("text-red");
	}else{
		layer.msg("商品已添加挂载", {icon: 1});
		$("#shopID").val(id);
		$(".fa-shopping-cart").addClass("text-red");
		
	}
	var timer = setTimeout(function() {
		layer.closeAll();
	}, 1000);
	
}
function getContent(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var cid;
	if(localStorage.getItem('editCid')){
		cid = localStorage.getItem('editCid');
	}
	var data = {
		"key":cid,
		"token":token,
		"isMd":0,
	}
	var shopID = $("#shopID").val();
	$("#post-shop").html(dataShow(0));
	$.ajax({
		type : "post",
		url: API.getContentsInfo(),
		data:data,
		dataType: 'json',
		success : function(result) {
			if(result.title){
				
				var data = result;
				var category;
				var tag;
				var categoryBox = "";
				var tagBox = "";
				if(data.category.length>0){
					var list = data.category;
					var clist ="";
					for(var i in list){
						categoryBox +=`
							<a href="javascript:;" class="toTag data-cur" data-mid="${list[i].mid}">
								${list[i].name}<i class="iconfont icon-close"></i>
							</a>
						`;
						clist += ","+list[i].mid;
						
					}
					
					category = clist;
					
				}
				if(data.tag.length>0){
					var list = data.tag;
					var ctag ="";
					for(var i in list){
						tagBox +=`
							<a href="javascript:;" class="toTag data-cur" data-mid="${list[i].mid}">
								${list[i].name}<i class="iconfont icon-close"></i>
							</a>
						`;
						ctag += ","+list[i].mid;
						
					}
					tag = ctag;
					
				}
				categoryBox +=`
					<a href="javascript:;" class="toTag" onclick="toCategory()">
						<i class="iconfont icon-add"></i>
					</a>
				`;
				tagBox +=`
					<a href="javascript:;" class="toTag" onclick="toTag()">
						<i class="iconfont icon-add"></i>
					</a>
				`;
				$("#title").val(data.title);
				$("#tagText").val(tag);
				$("#categoryText").val(category);
				editor.insertValue(data.text);
				
				$("#categoryBox").html(categoryBox);
				$("#tagBox").html(tagBox);
				cidShop();
			}
		},
		error : function(e){
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function cidShop(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var cid;
	if(localStorage.getItem('editCid')){
		cid = localStorage.getItem('editCid');
	}else{
		return false;
	}
	var data = {
		"uid":uid,
		"status":1,
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
			"limit":1000,
			"page":1,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				if(list.length>0){
					
					for(var i in list){
						if(list[i].cid == cid){
										
							$("#shopID").val(list[i].id);
						}
						
					}
				}
			}
		},
		error : function(e){
		}
	});
}
function updateContents(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var title = $("#title").val();
	var text = editor.getMarkdown();
	var category = $("#categoryText").val();
	var tag = $("#tagText").val();
	var shopID = $("#shopID").val();
	if (title == ""||category == ""||text == "") {
		layer.msg("请输入正确的参数", {icon: 2});
		return false
	}
	var cid;
	if(localStorage.getItem('editCid')){
		cid = localStorage.getItem('editCid');
	}
	var data = {
		'cid':cid,
		'title':title,
		'category':category,
		'tag':tag,
		'text':text,
		'sid':shopID
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.contentsUpdate(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("操作成功！", {icon: 1});
				localStorage.removeItem('editCid');
				var timer = setTimeout(function() {
					loadPage("pages/userpost.html","文章管理");
				}, 500);
				
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
	$("body").on('click','#shop-type a',function(){
		$("#shop-type a").removeClass("active");
		$(this).addClass("active");
		var type = $(this).attr("data-type");
		$("#type").val(type);
		$("#page").val(1);
		getShopList();
	});
	$("body").on('click','#shop-data-type a',function(){
		$("#shop-data-type a").removeClass("active");
		$(this).addClass("active");
		var type = $(this).attr("data-type");
		$("#type").val(type);
		$("#page").val(1);
		getShopList();
	});
})
function toShopSearch(){
	var searchText  = $("#searchText").val();
	$("#page").val(1);
	getShopList();
}
function getShopList(isPage){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var page = $("#page").val();
	var searchText  = $("#searchText").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#shop-list").html(dataShow(0));
	}
	var type = $("#type").val();
	var data = {
		"uid":uid,
	}
	if(type!="all"){
		data.status = type;
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
			"limit":10,
			"page":page,
			"order":"created",
			"searchKey":searchText,
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var img = `<img src="img/nopic.png" />`;
						if(list[i].imgurl!=""){
							img = `<img src="${list[i].imgurl}"  onerror="this.onerror='';src='img/nopic.png'"/>`;
						}
						var status = `<span class="status-green">已上架</span>`;
						if(list[i].status==0){
							status = `<span class="status-orange">待审核</span>`;
						}
						if(list[i].status==2){
							status = `<span class="status-red">已禁用</span>`;
						}
						var type =`<span class="status-gray">${getShopType(list[i].type)}</span>`;
						html+=`
						<div class="archives-list-box overflow-hidden">
							<div class="archives-list-pic left">
								${img}
							</div>
							<div class="archives-list-info left">
								<div class="archives-list-title">
									<a href="javascript:;" target="_blank">${list[i].title}</a>
									<span class="right">${API.formatDate(list[i].created)}</span>
								</div>
								<div class="archives-list-status">
									${status}
									${type}
								</div>
								<div class="archives-list-links shop-links">
									<div class="archives-list-data left">
										<span>价格：<i class="text-red shop-price">${list[i].price}积分</i></span>
										<span>剩余数量：<i>${list[i].num}</i></span>
									</div>
									<div class="archives-list-btn right">
										<a href="javascript:;"  onclick='toShopEdit(${list[i].id})'>编辑商品</a>
										<a href="javascript:;" onclick='toShopDelete(${list[i].id})'>删除商品</a>
									</div>
								</div>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#shop-list").append(html);
					}else{
						$("#shop-list").html(html);
					}
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$(".more").hide();
						$("#shop-list").html(dataShow(1));
					}
				}
				
			}else{
				if(isPage){
					$(".more").hide();
				}else{
					$(".more").hide();
					$("#shop-list").html(dataShow(1));
				}
			}
		},
		error : function(e){
			$(".more").hide();
			$("#shop-list").html(dataShow(1));
		}
	});
}
var shopeditor;
var buyeditor;
function getShopBase(){
	shopeditor = editormd("shopeditor", {
	    path   : "editormd/lib/",
		height  : 320,
		watch : false,
		placeholder:"请输入商品的介绍",
	    toolbarIcons : function() {
			return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "hr", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|",  "list-ul", "list-ol", "hr","|","link","reference-link","code","preformatted-text", "code-block", "table","|","filepic", "||", "watch"]
		},
		toolbarCustomIcons : {
			filepic : `<a href="javascript:;" title="添加图片" onclick="shopPic(0)" ontouchstart="shopPic(0)"><i class="fa fa-picture-o"></i></a>
			<input type="file" style="display:none"  accept="image/*" id="shopPic0"/>
			`,
		},
		onload : function() {
			
		}
		
	});
	buyeditor = editormd("buyeditor", {
	    path   : "editormd/lib/",
		height  : 320,
		watch : false,
		placeholder:"请输入商品的付费内容",
	    toolbarIcons : function() {
			return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "hr", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|",  "list-ul", "list-ol", "hr","|","link","reference-link","code","preformatted-text", "code-block", "table","|","filepic","shopbag", "||", "watch"]
		},
		toolbarCustomIcons : {
			filepic : `<a href="javascript:;" title="添加图片" onclick="shopPic(1)"><i class="fa fa-picture-o"></i></a>
			<input type="file" style="display:none"  accept="image/*" id="shopPic1"/>
			`,
		},
		onload : function() {
			if(localStorage.getItem('shopLocal')&&localStorage.getItem('page')!="pages/shopEdit.html"){
				var data = localStorage.getItem('shopLocal');
				data = JSON.parse(data);
				layer.msg("检测到本地缓存，已载入", {icon: 1});
				var data = localStorage.getItem('shopLocal');
				data = JSON.parse(data);
				$("#title").val(data.title);
				$("#type").val(data.type);
				$("#shop-data-type a").removeClass("active");
				$("#shop-data-type a[data-type='"+data.type+"']").addClass("active");
				$("#imgurl").val(data.imgurl);
				$("#price").val(data.price);
				$("#num").val(data.num);
				if(data.imgurl!=""){
					$("#imgurlText").val("已上传图片");
				}
				shopeditor.clear();
				buyeditor.clear();
				shopeditor.insertValue(data.text);
				buyeditor.insertValue(data.value);
			}
			if(localStorage.getItem('page')=="pages/shopEdit.html"){
				getShopInfo()
			}
			
		}
		
	});
	
}
function shopPic(type){
	
	$("#shopPic"+type).click();
	$("#shopPic"+type).change(function() {
		var token;
		if(localStorage.getItem("token")){
			token = localStorage.getItem("token");
		}else{
			return false;
		}
		var shopPic = $("#shopPic"+type).val();
		if(shopPic==""){
			return false;
		}
		var formData = new FormData();
		formData.append("file", $("#shopPic"+type)[0].files[0]);
		formData.append("token",token);
		$("#shopPic"+type).val("");
		var index = layer.load(1, {
		  shade: [0.4,'#000']
		});
		$.ajax({
			url: API.upload(),
			type: "post",
			data: formData,
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			dataType: 'json',
			success: function(result) {
				layer.close(index); 
				
				if(result.code==1){
					layer.msg("上传成功！", {icon: 1});
					if(type==0){
						shopeditor.insertValue("![图片名称]("+result.data.url+")");
						
					}
					if(type==1){
						buyeditor.insertValue("![图片名称]("+result.data.url+")");
					}
					
				}else{
					layer.msg(result.msg, {icon: 2});
				}
			},
			error: function(data) {
				layer.close(index); 
				layer.alert("请求失败，请检查网络", {icon: 2});
			}
		});
	})
	
}
function shopLocal(){
	var title = $("#title").val();
	var type = $("#type").val();
	var text = shopeditor.getMarkdown();
	var imgurl = $("#imgurl").val();
	var price = $("#price").val();
	var num = $("#num").val();
	var value = buyeditor.getMarkdown();
	var data = {
		'title':title,
		'type':type,
		'text':text,
		'imgurl':imgurl,
		'price':price,
		'num':num,
		'value':value,
	}
	if (title == ""||imgurl == ""||text == ""||price == ""||num == ""||value == "") {
		
		return false
	}
	localStorage.setItem("shopLocal",JSON.stringify(data));
}
function addShop(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var title = $("#title").val();
	var type = $("#type").val();
	var text = shopeditor.getMarkdown();
	var imgurl = $("#imgurl").val();
	var price = $("#price").val();
	var num = $("#num").val();
	var value = buyeditor.getMarkdown();
	if (title == ""||imgurl == ""||text == ""||price == ""||num == ""||value == "") {
		layer.msg("请输入正确的参数", {icon: 2});
		return false
	}
	if(price<=0||num<=0){
		layer.msg("请输入正确的参数", {icon: 2});
		return false
	}
	var data = {
		'title':title,
		'type':type,
		'text':text,
		'imgurl':imgurl,
		'price':price,
		'num':num,
		'value':value,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.addShop(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("操作成功！", {icon: 1});
				localStorage.removeItem('shopLocal');
				var timer = setTimeout(function() {
					loadPage("pages/myshop.html","商品管理")
				}, 500);
				
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
function toShopEdit(id){
	localStorage.setItem('editSid',id);
	loadPage("pages/shopEdit.html","编辑商品");
}
function getShopInfo(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var sid;
	if(localStorage.getItem('editSid')){
		sid = localStorage.getItem('editSid');
	}else{
		return false;
	}
	var data = {
		"key":sid,
		"token":token
	}
	var shopID = $("#shopID").val();
	$("#post-shop").html(dataShow(0));
	$.ajax({
		type : "post",
		url: API.shopInfo(),
		data:data,
		dataType: 'json',
		success : function(result) {
			if(result.title){
				
				var data = result;
				$("#title").val(data.title);
				$("#type").val(data.type);
				$("#shop-data-type a").removeClass("active");
				$("#shop-data-type a[data-type='"+data.type+"']").addClass("active");
				$("#imgurl").val(data.imgurl);
				$("#price").val(data.price);
				$("#num").val(data.num);
				if(data.imgurl!=""){
					$("#imgurlText").val("已上传图片");
				}
				shopeditor.clear();
				buyeditor.clear();
				shopeditor.insertValue(data.text);
				buyeditor.insertValue(data.value);
			}
		},
		error : function(e){
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function editShop(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var title = $("#title").val();
	var type = $("#type").val();
	var text = shopeditor.getMarkdown();
	var imgurl = $("#imgurl").val();
	var price = $("#price").val();
	var num = $("#num").val();
	var value = buyeditor.getMarkdown();
	if (title == ""||imgurl == ""||text == ""||price == ""||num == ""||value == "") {
		layer.msg("请输入正确的参数", {icon: 2});
		return false
	}
	if(price<=0||num<=0){
		layer.msg("请输入正确的参数", {icon: 2});
		return false
	}
	var sid;
	if(localStorage.getItem('editSid')){
		sid = localStorage.getItem('editSid');
	}
	var data = {
		'id':sid,
		'title':title,
		'type':type,
		'text':text,
		'imgurl':imgurl,
		'price':price,
		'num':num,
		'value':value,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.editShop(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"params":JSON.stringify(API.removeObjectEmptyKey(data)),
			"token":token,
		},
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("操作成功！", {icon: 1});
				localStorage.removeItem('editSid');
				var timer = setTimeout(function() {
					loadPage("pages/myshop.html","商品管理")
				}, 500);
				
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
function toShopDelete(id){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	 layer.confirm('确认删除该商品？', {
		btn: ['确定', '取消'],
	}, function(index) {
		var data = {
			key: id,
			token: token,
		}
		var index = layer.load(1, {
		  shade: [0.4,'#000']
		});
		
		$.ajax({
			type : "post",
			url: API.deleteShop(),
			data:data,
			dataType: 'json',
			success : function(result) {
				layer.close(index); 
				if(result.code==1){
					layer.msg("操作成功！", {icon: 1});
					var timer = setTimeout(function() {
						loadPage("pages/myshop.html","商品管理")
					}, 500);
					
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
function getShopType(id){
	id = id-1;
	var arr =["实体","源码","软件工具","付费阅读"];
	return arr[id];
}
function getSelOrder(isPage){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var page = $("#page").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#order").html(dataShow(0));
	}
	var data = {
		"limit":10,
		"page":page,
		"token":token
	}
	$.ajax({
		type : "post",
		url: API.orderSellList(),
		data:data,
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var type = "";
						var shopinfo= `
						<div class="order-shop">
							<a href="javascript:;">[该商品已失效！]</a>
							<p class="order-date">${API.formatDate(list[i].created)}</p>
						</div>
						`;
						var price = "";
						var toAddress = '';
						if(list[i].shopInfo){
							type = `<span class="order-type right">${getShopType(list[i].shopInfo.type)}</span>`;
							shopinfo = `
							<div class="order-shop">
								<a href="javascript:;">${list[i].shopInfo.title}</a>
								<p class="order-date">${API.formatDate(list[i].created)}</p>
							</div>
							`;
							price = `
							成交价格：<span class="order-price text-red">${list[i].shopInfo.price} 积分</span>
							`;
							if(list[i].shopInfo.type==1){
								toAddress = `<a href="javascript:;" class="right" onclick='userAddress(${JSON.stringify(list[i].address)})'>查看用户地址</a>`;
							}
							
						}
						html+=`
						<div class="order-box">
							<div class="order-title">
								<p>订单ID：${list[i].id}${list[i].created}
								${type}
								</p>
							</div>
							${shopinfo}
							<div class="order-data">
								<p>${price} 
								<a href="javascript:;" class="right" onclick="userEmail('${list[i].userEmail}')">联系该用户</a>
								${toAddress}
								</p>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#order").append(html);
					}else{
						$("#order").html(html);
					}
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$(".more").hide();
						$("#order").html(dataShow(1));
					}
				}
				
			}else{
				if(isPage){
					$(".more").hide();
				}else{
					$(".more").hide();
					$("#order").html(dataShow(1));
				}
			}
		},
		error : function(e){
			$(".more").hide();
			$("#order").html(dataShow(1));
		}
	});
}
function userEmail(text){
	if(text==""){
		layer.msg("该用户未配置邮箱或已失效", {icon: 2});
		return false;
	}
	layer.open({
		title:"联系用户",
		type: 1,
		area: ['320px', '200px'], 
		content: `
		<div class="layer-form">
			<div class="box-input text-center">
				${text}
			</div>
		</div>
			
		`,
		cancel: function(){
		}
	});
}
function userAddress(text){
	if(text==""){
		layer.msg("该用户未配置地址或已失效", {icon: 2});
		return false;
	}
	layer.open({
		title:"用户地址信息",
		type: 1,
		area: ['320px', '200px'], 
		content: `
		<div class="layer-form">
			<div class="box-input">
				${text}
			</div>
		</div>
			
		`,
		cancel: function(){
		}
	});
}
function pay(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var num = $("#num").val();
	if(num==""||num<=0){
		layer.msg("请输入正确的充值金额", {icon: 2});
		return false;
	}
	if(num<5){
		layer.msg("最低充值金额为5元", {icon: 2});
		return false;
	}
	var data = {
		num: num,
		token: token,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.scancodePay(),
		data:data,
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				var url = result.data;
				var codeImg = API.qrCode()+"?codeContent="+url;
				showCode(codeImg);
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
function wxPay(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var num = $("#wxnum").val();
	if(num==""||num<=0){
		layer.msg("请输入正确的充值金额", {icon: 2});
		return false;
	}
	if(num<5){
		layer.msg("最低充值金额为5元", {icon: 2});
		return false;
	}
	var data = {
		price: num,
		token: token,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.wxPay(),
		data:data,
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				var url = result.data.data;
				var codeImg = API.qrCode()+"?codeContent="+url;
				showCode(codeImg);
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
function toEPay(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var num = $("#money").val();
	var type = $("#epay-type").val();
	if(num==""||num<=0){
		layer.msg("请输入正确的充值金额", {icon: 2});
		return false;
	}
	if(num<5){
		layer.msg("最低充值金额为5元", {icon: 2});
		return false;
	}
	var data = {
		money: num,
		device:"pc",
		type:type,
		token: token,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.EPay(),
		data:data,
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				var payapi = result.payapi;
				var payurl="";
				if(result.data.payurl){
					payurl = result.data.payurl;
					var prefix= payurl.substring(0,2);
					if(prefix=="./"){
						payurl = payurl.replace("./","");
						payurl = payapi + payurl;
					}
				}
				if(result.data.qrcode){
					//这是手机扫码，无法跳转，所以要改成跳转形式
					//payurl = result.data.qrcode;
					var trade_no = result.data.trade_no;
					payurl = payapi + '/pay/qrcode/'+trade_no+'/?sitename=';
				}
				window.open(payurl)
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
function tokenPay(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var num = $("#token").val();
	if(num==""||num<=0){
		layer.msg("请输入正确的充值金额", {icon: 2});
		return false;
	}
	if(num<5){
		layer.msg("最低充值金额为5元", {icon: 2});
		return false;
	}
	var data = {
		num: num,
		token: token,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.tokenPay(),
		data:data,
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg(result.msg, {icon: 1});
				getAssets();
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
function showCode(img){
	var num = $("#num").val();
	layer.open({
		title:"请扫描二维码",
		type: 1,
		area: ['280px', '370px'], 
		content: `
		<div class="layer-form">
			<img src="${img}" class="col-10"/>
			
			<p class="text-center text-red pay-price">￥ ${num}</p>
		</div>
		`
	});
}
function withdraw(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var num = $("#num").val();
	var assets = $("#assets").text();
	if(num==""||num<=0){
		layer.msg("请输入正确的提现数量", {icon: 2});
		return false;
	}
	if(num>Number(assets)){
		layer.msg("您当前余额不足", {icon: 2});
		return false;
	}
	if(num<5000){
		layer.msg("最低提现数量为5000积分", {icon: 2});
		return false;
	}
	var data = {
		num: num,
		token: token,
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.userWithdraw(),
		data:data,
		dataType: 'json',
		success : function(result) {
			layer.close(index); 
			if(result.code==1){
				layer.msg("提现操作成功！", {icon: 1});
				var timer = setTimeout(function() {
					loadPage("pages/userwithdrawlist.html","提现记录")
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
function getWithdrawList(isPage){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var page = $("#page").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#withdrawlist").html(dataShow(0));
	}
	var data = {
		"type":"withdraw",
		"uid":uid
	}
	$.ajax({
		type : "post",
		url: API.withdrawList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":5,
			"page":page,
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var typestyle = getWithdrawStyle(list[i].cid);
						var type = `<span class="order-type right ${typestyle}">${getWithdrawType(list[i].cid)}</span>`;
						html+=`
						<div class="order-box">
							<div class="order-title">
								<p>订单ID：${list[i].id}
								${type}
								</p>
							</div>
							<div class="order-data">
								<p><span class="text-red">${list[i].num}积分</span>
								<span class="right">${API.formatDate(list[i].created)}<span>
								</p>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#withdrawlist").append(html);
					}else{
						$("#withdrawlist").html(html);
					}
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$(".more").hide();
						$("#withdrawlist").html(dataShow(1));
					}
				}
				
			}else{
				if(isPage){
					$(".more").hide();
				}else{
					$(".more").hide();
					$("#withdrawlist").html(dataShow(1));
				}
			}
		},
		error : function(e){
			$(".more").hide();
			$("#withdrawlist").html(dataShow(1));
		}
	});
}
function getPayList(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var page = $("#page").val();

	$("#paylist").html(dataShow(0));
	
	$.ajax({
		type : "post",
		url: API.payLogList(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					for(var i in list){
						var typestyle = getWithdrawStyle(list[i].cid);
						var type = `<span class="right text-orange">未支付</span>`;
						if(list[i].status==1){
							type = `<span class="right text-green">已支付</span>`;
						}
						html+=`
						<div class="order-box">
							<div class="order-title">
								<p>订单ID：${list[i].outTradeNo}
								${type}
								</p>
							</div>
							<div class="order-shop">
								<a href="javascript:;">${list[i].outTradeNo}</a>
							</div>
							<div class="order-data">
								<p><span class="text-red">${list[i].totalAmount} 积分</span>
								<span class="right">${API.formatDate(list[i].created)}<span>
								</p>
							</div>
						</div>
						`;
					}

					$("#paylist").html(html);
					
				}else{
					$(".more").hide();
					$("#paylist").html(dataShow(1));
					
				}
				
			}else{
				$(".more").hide();
				$("#paylist").html(dataShow(1));
				
			}
		},
		error : function(e){
			$(".more").hide();
			$("#paylist").html(dataShow(1));
		}
	});
}
function getWithdrawType(i){
	if(i==-2){
		i=2;
	}
	var arr=["已成功","审核中","已拒绝"];
	return arr[i];
}
function getWithdrawStyle(i){
	if(i==-2){
		i=2;
	}
	var arr=["status-green","status-orange","status-red"];
	return arr[i];
}
function getBuyOrder(isPage){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	var uid;
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
		uid = userInfo.uid;
	}else{
		return false;
	}
	var page = $("#page").val();
	if(isPage){
		page++;
		$(".more a").text("正在加载中...")
	}else{
		$("#buyorder").html(dataShow(0));
	}
	var data = {
		"token":token
	}
	$.ajax({
		type : "post",
		url: API.orderList(),
		data:data,
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					$(".more").show();
					$(".more a").text("加载更多");
					for(var i in list){
						var type = "";
						var shopinfo= `
						<div class="order-shop">
							<a href="javascript:;">[该商品已失效！]</a>
							<p class="order-date">${API.formatDate(list[i].created)}</p>
						</div>
						`;
						var price = "";
						var toValue = '';
						if(list[i].shopInfo){
							type = `<span class="order-type right">${getShopType(list[i].shopInfo.type)}</span>`;
							shopinfo = `
							<div class="order-shop">
								<a href="javascript:;">${list[i].shopInfo.title}</a>
								<p class="order-date">${API.formatDate(list[i].created)}</p>
							</div>
							`;
							price = `
							成交价格：<span class="order-price text-red">${list[i].shopInfo.price} 积分</span>
							`;
							if(list[i].shopInfo.type!=1){
								toValue = `<a href="javascript:;" class="right text-red" onclick='toInfo(${list[i].toid})'>查看收费内容</a>`;
							}
							
						}
						html+=`
						<div class="order-box">
							<div class="order-title">
								<p>订单ID：${list[i].id}${list[i].created}
								${type}
								</p>
							</div>
							${shopinfo}
							<div class="order-data">
								<p>${price} 
								<a href="javascript:;" class="right" onclick="userEmail('${list[i].merchantEmail}')">联系商家</a>
								${toValue}
								</p>
							</div>
						</div>
						`;
					}
					if(isPage){
						$("#page").val(page);
						$("#buyorder").append(html);
					}else{
						$("#buyorder").html(html);
					}
				}else{
					if(isPage){
						$(".more").hide();
					}else{
						$(".more").hide();
						$("#buyorder").html(dataShow(1));
					}
				}
				
			}else{
				if(isPage){
					$(".more").hide();
				}else{
					$(".more").hide();
					$("#buyorder").html(dataShow(1));
				}
			}
		},
		error : function(e){
			$(".more").hide();
			$("#buyorder").html(dataShow(1));
		}
	});
}
function toInfo(id){
	localStorage.setItem("vid",id);
	loadPage("pages/value.html","收费内容");
}
function getValue(){
	var token;
	var id;
	
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	if(localStorage.getItem("vid")){
		id = localStorage.getItem("vid");
	}else{
		return false;
	}
	var data = {
		key: id,
		token: token,
	}
	$.ajax({
		type : "post",
		url: API.shopInfo(),
		data:data,
		dataType: 'json',
		success : function(result) {
			if(result.value){
				$("#value textarea").html(result.value);
				var testEditormdView = editormd.markdownToHTML("value", {
					htmlDecode      : "style,script,iframe",  // you can filter tags decode
				});
			}
		},
		error : function(e){
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function getAssets(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
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
		url : API.getUserData(),
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var userData = result.data;
				$("#assets").text(userData.assets);
			}
		},
		error : function(e){
			
		}
	});
}
function allNotice(){
	window.open(noticeUrl);
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

function getVipStatus(){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	
	$.ajax({
		type : "post",
		url: API.userStatus(),
		header:{
			"Accept": "application/json; charset=utf-8", 
			"key":API.getKey()
		},
		data:{
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var isvip = result.data.isvip;
				var VipStatus = "未开通";
				if(isvip==1){
					if(result.data.vip==1){
						VipStatus = "永久";
					}else{
						VipStatus = formatDate(result.data.vip);
					}
					
				}
				$("#VipStatus").text(VipStatus);
				
			}
		},
		error : function(e){
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function getVipMain(){
	$("#vip-concent").html(dataShow(0));
	$.ajax({
		type : "post",
		url: API.getVipInfo(),
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var vipDiscount=result.data.vipDiscount;
				var vipPrice=result.data.vipPrice;
				var scale=result.data.scale;
				var html =`
					<div class="vip-box">
						<div class="vip-main">
							<h5>月付VIP<span class="text-red">${30*vipPrice}积分</span></h5>
							<p>为您的账号获得30天VIP期限</p>
							<button type="button" onclick="toBuyVip(30)">立即购买</button>
						</div>
					</div>
					<div class="vip-box">
						<div class="vip-main">
							<h5>季付VIP<span class="text-red">${90*vipPrice}积分</span></h5>
							<p>为您的账号获得90天VIP期限</p>
							<button type="button" onclick="toBuyVip(90)">立即购买</button>
						</div>
					</div>
					<div class="vip-box">
						<div class="vip-main">
							<h5>年付VIP<span class="text-red">${365*vipPrice}积分</span></h5>
							<p>为您的账号获得365天VIP期限</p>
							<button type="button" onclick="toBuyVip(365)">立即购买</button>
						</div>
					</div>
					<div class="vip-box permanentVip">
						<div class="vip-main">
							<h5>永久VIP<span class="text-black">${500*vipPrice}积分</span></h5>
							<p>为您的账号获得永久VIP期限</p>
							<button type="button" onclick="toBuyVip(500)">立即购买</button>
						</div>
					</div>
				`;
				$("#vip-concent").html(html);
				
			}
		},
		error : function(e){
			layer.alert("请求失败，请检查网络", {icon: 2});
		}
	});
}
function toBuyVip(day){
	var token;
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token");
	}else{
		return false;
	}
	 layer.confirm('确认要购买该VIP类型？', {
		btn: ['确定', '取消'],
	}, function(index) {
		var data = {
			day: day,
			token: token,
		}
		var index = layer.load(1, {
		  shade: [0.4,'#000']
		});
		
		$.ajax({
			type : "post",
			url: API.buyVIP(),
			data:data,
			dataType: 'json',
			success : function(result) {
				layer.close(index); 
				if(result.code==1){
					layer.msg("操作成功！", {icon: 1});
					var timer = setTimeout(function() {
						location.reload();
					}, 500);
					
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
function markHtml(text){
	var owoList=[];
	for(var i in OWOData){
		owoList = owoList.concat(OWOData[i].container);
	}
	for(var i in owoList){
		if(replaceSpecialChar(text).indexOf(owoList[i].data) != -1){
			text = replaceAll(replaceSpecialChar(text),owoList[i].data,"<img src='"+owoList[i].icon+"' class='tImg' />")
			
		}
	}
	return text;
	
	
}
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
function replaceSpecialChar(text) {
	if(!text){
		return false;
	}
	text = text.replace(/&quot;/g, '"');
	text = text.replace(/&amp;/g, '&');
	text = text.replace(/&lt;/g, '<');
	text = text.replace(/&gt;/g, '>');
	text = text.replace(/&nbsp;/g, ' ');
	return text;
}
$(function(){
	$("body").on('click','.pay-type a',function(){
		var type = $(this).attr("data-type");
		$('.pay-type a').removeClass("active");
		$(this).addClass("active");
		$(".pay-concent").hide();
		$("."+type).show();
	});
})