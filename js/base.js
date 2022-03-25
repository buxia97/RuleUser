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
	
	//导航部分
	$("body").on('click','.menu-box>a',function(){
		$(".menu-box a").removeClass("active");
		$(this).addClass("active");
		$(this).next().toggle();
	});
	
});

function header(){
	var html = `
	<div class="header-top">
		<div class="logo">
			<a href="/"><img src="${LOGO_URL}" /></a>
		</div>
		<div class="user">
			<a href="/"><img src="https://gravatar.helingqi.com/wavatar/83d6d5237f4c908679fefff60a590269?d=mm" /></a>
		</div>
		<div class="top-links">
			
			<a href="/" style="color: #e61f18;"><i class="iconfont icon-icondownload"></i>客户端</a>
			<a href="/"><i class="iconfont icon-email"></i>消息</a>
		</div>
		
	</div>
	<div class="header-left">
		<div class="user-info">
			<a href="/"><img src="https://gravatar.helingqi.com/wavatar/83d6d5237f4c908679fefff60a590269?d=mm" /></a>
			<div class="user-rand">
				<span style="background-color: #FF9900;">熟手</span>
				<span>站长</span>
			</div>
			<div class="user-title">
				规则之树
			</div>
		</div>
		<div class="post">
			<a href="#" class="post-to">发布
			<i class="iconfont icon-xiala"></i>
			</a>
		</div>
		<div class="menu">
			<div class="menu-main">
				<div class="menu-box">
					<a href="javascript:;" class="active" onclick='loadPage("pages/home.html","用户首页")'><i class="iconfont icon-color"></i>用户首页</a>
				</div>
				<div class="menu-box">
					<a href="#"><i class="iconfont icon-bussinessman"></i>个人中心<i class="iconfont icon-moreunfold"></i></a>
					<div class="menu-sub">
						<div class="menu-sub-box">
							<a href="#">信息设置</a>
						</div>
						<div class="menu-sub-box">
							<a href="#">我的消息</a>
						</div>
						<div class="menu-sub-box">
							<a href="#">我的收藏</a>
						</div>
					</div>
				</div>
				<div class="menu-box">
					<a href="#"><i class="iconfont icon-form"></i>创作中心<i class="iconfont icon-moreunfold"></i></a>
					<div class="menu-sub">
						<div class="menu-sub-box">
							<a href="#">文章管理</a>
						</div>
						<div class="menu-sub-box">
							<a href="#">商品管理</a>
						</div>
						<div class="menu-sub-box">
							<a href="#">已出售订单</a>
						</div>
					</div>
				</div>
				<div class="menu-box">
					<a href="#"><i class="iconfont icon-trade-assurance"></i>财务中心<i class="iconfont icon-moreunfold"></i></a>
					<div class="menu-sub">
						<div class="menu-sub-box">
							<a href="#">在线充值</a>
						</div>
						<div class="menu-sub-box">
							<a href="#">提现申请</a>
						</div>
						<div class="menu-sub-box">
							<a href="#">购买订单</a>
						</div>
					</div>
				</div>
				<div class="menu-box">
					<a href="#"><i class="iconfont icon-lights"></i>意见反馈</a>
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
			<a href="#">
				Top
			</a>
		</div>
		<div class="tool-box">
			<a href="#">
				<i class="iconfont icon-help"></i>
				<p>问题反馈</p>
			</a>
		</div>
		<div class="tool-box">
			<a href="#">
				<i class="iconfont icon-scanning"></i>
				<p>APP下载</p>
			</a>
		</div>
	</div>
	`;
	$("#footer").html(html);
}
function loadPage(url,title){
	loading();
	var webTitle = title + " - "+webName;
	$("title").text(webTitle);
	$.ajax({
		type : "get",
		url : url,
		success : function(result) {
			$("#main .content").html(result);
		},
		error : function(e){
			Layer.alert("页面加载失败", {icon: 2});
		}
	});
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