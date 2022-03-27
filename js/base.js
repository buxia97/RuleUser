main();
header();
footer();
$(function(){
	//内容部分
	if(localStorage.getItem("page")){
		var page = localStorage.getItem("page");
		var pageName = localStorage.getItem("pageName");
		loadPage(page,pageName);
	}else{
		loadPage("pages/home.html","用户首页");
	}
	//登陆判断
	if(!localStorage.getItem("token")){
		$("#main").hide();
		$("#isLogin").show();
		isLogin();
		login();
	}else{
		userInfo();
	}
	
	//导航部分
	$("body").on('click','.menu-box>a',function(){
		$(".menu-box a").removeClass("active");
		$(this).addClass("active");
		$(this).next().toggle();
	});
	
});
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
			<a href="javascript:;" class="post-to">发布
			</a>
		</div>
		<div class="menu">
			<div class="menu-main">
				<div class="menu-box">
					<a href="javascript:;" class="active" onclick='loadPage("pages/home.html","用户首页")'><i class="iconfont icon-color"></i>用户首页</a>
				</div>
				<div class="menu-box">
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
				<div class="menu-box">
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
				<div class="menu-box">
					<a href="javascript:;"><i class="iconfont icon-trade-assurance"></i>财务中心<i class="iconfont icon-moreunfold"></i></a>
					<div class="menu-sub">
						<div class="menu-sub-box">
							<a href="javascript:;" onclick='loadPage("pages/pay.html","在线充值")'>在线充值</a>
						</div>
						<div class="menu-sub-box">
							<a  href="javascript:;" onclick='loadPage("pages/userwithdrawlist.html","提现申请")'>提现申请</a>
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
			<a href="javascript:;">
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
	}
	if(page=="pages/userinfo.html"){
		
	}
	if(page=="pages/inbox.html"){
		getInbox();
	}
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
	var html = `
		<div class="box-input">
			<input type="text" placeholder="请输入用户名(必填)" value="" id="username"/>
		</div>
		<div class="box-input">
			<input type="text" placeholder="请输入邮箱(必填)" value="" id="email"/>
		</div>
		<div class="box-input">
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
		<div class="box-btn">
			<button type="button" onclick="toRegister()">立即注册</button>
		</div>
		<div class="form-links">
			<a href="javascript:;" onclick="login()">用户登录</a>
			<a href="javascript:;" onclick="register()">用户注册</a>
			<br/>
			<p class="margin-top">注册即为同意<a href="#">《用户协议》</a></p>
		</div>
		`;
	$("#isLogin-form").html(html);
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
	var username = $("#username").val();
	var userpass = $("#userpass").val();
	var code = $("#code").val();
	var email = $("#email").val();
	var repass = $("#repass").val();
	
	if(username==""||userpass==""||email==""||code==""){
		layer.msg("请输入正确的参数", {icon: 2});
		return false;
	}
	if(userpass!=repass){
		layer.msg("两次密码不一致", {icon: 2});
		return false;
	}
	var data = {
		'name':username,
		'code':code,
		'password':userpass,
		'mail':email
	}
	var index = layer.load(1, {
	  shade: [0.4,'#000']
	});
	
	$.ajax({
		type : "post",
		url: API.userRegister(),
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
	var timer = setTimeout(function() {
		location.reload();
		clearTimeout('timer')
	}, 1000)
}
function userInfo(){
	if(localStorage.getItem('userinfo')){
		var userInfo = JSON.parse(localStorage.getItem('userinfo'));
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
		var userhtml =`
			<a href="javascript:;"><img src="${userInfo.avatar}" /></a>
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
		
		var userinfohtml = `
			<a href="/"><img src="${userInfo.avatar}" /></a>
			<div class="user-rand">
				<span style="background-color: ${lvStyle};">${lvText}</span>
				${customize}
			</div>
			<div class="user-title">
				${name}
			</div>
		`;
		$("#userInfo").html(userinfohtml);
		
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
function toLinks(cid){
	var url = linkRule.replace("{cid}",cid);
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
						var img = ``;
						if(list[i].images.length>0){
							img = `<img src="${list[i].images[0]}" />`;
						}
						html+=`
						<div class="index-archives-box overflow-hidden">
							<a href="${toLinks(list[i].cid)}" target="_blank">
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
										<h5>${list[i].allowComment}</h5>
										<p>评论量</p>
									</div>
									<div class="col-25 right">
										<h5>${list[i].likes}</h5>
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
							<a href="${toLinks(list[i].cid)}"  target="_blank"><span>${formatDate(list[i].created)}</span> ${list[i].title}</a>
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
						var img = ``;
						if(list[i].images.length>0){
							img = `<img src="${list[i].images[0]}" />`;
						}
						html+=`
						<div class="padding col-33 left">
							<a href="${toLinks(list[i].cid)}" target="_blank">
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
									
									${list[i].text}
									
								</div>
								<div class="comment-links">
									发表在：<a href="${toLinks(list[i].cid)}" target="_blank">${list[i].contenTitle}</a>
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
function getInbox(){
	$("#inbox").html(dataShow(0));
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
		data:{
			"searchParams":JSON.stringify(API.removeObjectEmptyKey(data)),
			"limit":10,
			"page":1,
			"token":token
		},
		dataType: 'json',
		success : function(result) {
			if(result.code==1){
				var list = result.data;
				var html = ``;
				if(list.length>0){
					$(".more").show();
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
									发表在：<a href="${toLinks(list[i].cid)}" target="_blank">${list[i].contenTitle}</a>
									<div class="reply right"><a href="javascript:;" onclick="reply('${list[i].author}','${list[i].coid}','${list[i].cid}')">回复</a></div>
								</div>
							</div>
						</div>
						`;
					}
					$("#inbox").html(html);
				}else{
					$("#inbox").html(dataShow(1));
				}
				
			}
		},
		error : function(e){
			$("#inbox").html(dataShow(1));
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
				<textarea class="text reply-text" id="text" placeholder="请输入评论的内容"></textarea>
			</div>
			<div class="comments-owo">
				<a href="javascript:;" class="toOwo" onclick="toOwo()"><i class="iconfont icon-smile"></i></a>
				<div class="owo">
					
				</div>
			</div>
		</div>
			
		`
	});
	OWO();
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