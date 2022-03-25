var API_URL = 'https://api.ruletree.club/'; //API地址，需要先开启允许跨域
var WEB_URL = 'https://www.ruletree.club/'; //网站地址
var LOGO_URL = "https://www.ruletree.club/logo.png";

var webName = "规则之树";  //网站名称
var webEmail = "buxia97@126.com";  //站长邮箱
var footerLink = `
	<a href="#">网站首页</a>
	<a href="#">投稿说明</a>
	<a href="#">关于我们</a>
	<a href="#">问题反馈</a>
	<a href="#">免责申明</a>
`;
var CopyText = `规则之树版权所有。<a href="http://beian.miit.gov.cn" target="_blank" rel="nofllow">湘ICP备16007412号-3</a>`;  //底部版权
//用户头衔，自己修改名词
var rankList = ["小白","萌新","入门","熟手","大佬","巨佬","传说","古神"];

//头衔对应的背景颜色
var rankStyle = ["#6699CC","#666699","#009933","#FF9900","#ff007f","#FF0033","#660033","#000000"];

//链接规则(用于站内链接自动跳转)，请根据自己的网站文件链接自由发挥，比如我的就是
//https://www.ruletree.club/archives/2824/
//{cid}对应文章id，{slug}对应独立页面名称，其实本质上就是页面拼接。
var linkRule =WEB_URL+"archives/{cid}/" //普通文章
var pageRule =WEB_URL+"{slug}.html" //独立页面

//公告mid，可以是分类也可以是标签
var  noticeID = 12;