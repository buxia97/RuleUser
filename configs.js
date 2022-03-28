//var API_URL = 'https://api.ruletree.club/'; //API地址，需要先开启允许跨域
var API_URL = 'http://127.0.0.1:8081/';

var WEB_URL = 'https://www.ruletree.club/'; //网站地址
var LOGO_URL = "https://www.ruletree.club/logo.png";

var webName = "规则之树";  //网站名称
var webEmail = "buxia97@126.com";  //站长邮箱

var opinionUrl = "https://www.ruletree.club/help.html";  //意见反馈地址
var appUrl = "https://www.pgyer.com/J9bd"; //APP下载地址

//底部链接
var footerLink = `
	<a href="https://www.ruletree.club">网站首页</a>
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
var noticeID = 97;
var recommendID = 394;


//接口和公共方法定义
var API = {
	userLogin:function(){
		return API_URL + 'typechoUsers/userLogin';
	},
	RegSendCode:function(){
		return API_URL + 'typechoUsers/RegSendCode';
	},
	SendCode:function(){
		return API_URL + 'typechoUsers/SendCode';
	},
	userApi:function(){
		return API_URL + 'typechoUsers/apiLogin';
	},
	userRegister:function(){
		return API_URL + 'typechoUsers/userRegister';
	},
	userFoget:function(){
		return API_URL + 'typechoUsers/userFoget';
	},
	getUserInfo:function(){
		return API_URL + 'typechoUsers/userInfo';
	},
	getUserList:function(){
		return API_URL + 'typechoUsers/userList';
	},
	userEdit:function(){
		return API_URL + 'typechoUsers/userEdit';
	},
	getUserData:function(){
		return API_URL + 'typechoUsers/userData';
	},
	userDelete:function(){
		return API_URL + 'typechoUsers/userDelete';
	},
	userRecharge:function(){
		return API_URL + 'typechoUsers/userRecharge';
	},
	
	userWithdraw:function(){
		return API_URL + 'typechoUsers/userWithdraw';
	},
	withdrawList:function(){
		return API_URL + 'typechoUsers/withdrawList';
	},
	withdrawStatus:function(){
		return API_URL + 'typechoUsers/withdrawStatus';
	},
	manageUserEdit:function(){
		return API_URL + 'typechoUsers/manageUserEdit';
	},
	apiBind:function(){
		return API_URL + 'typechoUsers/apiBind';
	},
	userBindStatus:function(){
		return API_URL + 'typechoUsers/userBindStatus';
	},
	getMarkList:function(){
		return API_URL + 'typechoUserlog/markList';
	},
	getIsMark:function(){
		return API_URL + 'typechoUserlog/isMark';
	},
	userStatus:function(){
		return API_URL + 'typechoUsers/userStatus';
	},
	addLog:function(){
		return API_URL + 'typechoUserlog/addLog';
	},
	removeLog:function(){
		return API_URL + 'typechoUserlog/removeLog';
	},
	removeLog:function(){
		return API_URL + 'typechoUserlog/removeLog';
	},
	
	
	getCommentsList:function(){
		return API_URL + 'typechoComments/commentsList';
	},
	setComments:function(){
		return API_URL + 'typechoComments/commentsAdd';
	},
	commentsDelete:function(){
		return API_URL + 'typechoComments/commentsDelete';
	},
	commentsAudit:function(){
		return API_URL + 'typechoComments/commentsAudit';
	},
	
	
	//根据标签或者分类获取文章
	getMetaContents:function(){
		return API_URL + 'typechoMetas/selectContents';
	},
	getMetasList:function(){
		return API_URL + 'typechoMetas/metasList';
	},
	getContentsList:function(){
		return API_URL + 'typechoContents/contensList';
	},
	getContentsInfo:function(){
		return API_URL + 'typechoContents/contentsInfo';
	},
	contensAdd:function(){
		return API_URL + 'typechoContents/contensAdd';
	},
	
	contensUpdate:function(){
		return API_URL + 'typechoContents/contensUpdate';
	},
	contensImage:function(){
		return API_URL + 'typechoContents/ImagePexels';
	},
	allData:function(){
		return API_URL + 'typechoContents/allData';
	},
	contentsDelete:function(){
		return API_URL + 'typechoContents/contentsDelete';
	},
	contentsAudit:function(){
		return API_URL + 'typechoContents/contentsAudit';
	},
	getForeverblog:function(){
		return API_URL + 'typechoContents/foreverblog';
	},
	//文章是否评论过
	isCommnet:function(){
		return API_URL + 'typechoContents/isCommnet';
	},
	//下面这个方法涉及图片上传，自己修改定义接口路径
	upload:function(){
		//return API_URL + 'upload/ossUpload';//OSS对象存储接口
		//return API_URL + 'upload/cosUpload';//COS对象存储接口
		//return API_URL + 'upload/ftpUpload'; //远程ftp上传接口
		return API_URL + 'upload/localUpload'; //本地上传接口
	},
	shopList:function(){
		return API_URL + 'typechoShop/shopList';
	},
	shopInfo:function(){
		return API_URL + 'typechoShop/shopInfo';
	},
	addShop:function(){
		return API_URL + 'typechoShop/addShop';
	},
	editShop:function(){
		return API_URL + 'typechoShop/editShop';
	},
	deleteShop:function(){
		return API_URL + 'typechoShop/deleteShop';
	},
	buyShop:function(){
		return API_URL + 'typechoShop/buyShop';
	},
	isBuyShop:function(){
		return API_URL + 'typechoShop/isBuyShop';
	},
	auditShop:function(){
		return API_URL + 'typechoShop/auditShop';
	},
	orderList:function(){
		return API_URL + 'typechoUserlog/orderList';
	},
	orderSellList:function(){
		return API_URL + 'typechoUserlog/orderSellList';
	},
	
	//文章挂载商品
	mountShop:function(){
		return API_URL + 'typechoShop/mountShop';
	},
	//支付宝当面付
	scancodePay:function(){
		return API_URL + 'pay/scancodePay';
	},
	//充值二维码生成
	qrCode:function(){
		return API_URL + 'pay/qrCode';
	},
	payLogList:function(){
		return API_URL + 'pay/payLogList';
	},
	
	IsNull(obj) {
		return (obj != null && obj != undefined);
	},
	//获取日期
	formatDate(datetime) {
		var datetime = new Date(parseInt(datetime * 1000));
		// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
		var year = datetime.getFullYear(),
			month = ("0" + (datetime.getMonth() + 1)).slice(-2),
			date = ("0" + datetime.getDate()).slice(-2),
			hour = ("0" + datetime.getHours()).slice(-2),
			minute = ("0" + datetime.getMinutes()).slice(-2);
		//second = ("0" + date.getSeconds()).slice(-2);
		// 拼接
		var result = year + "-" + month + "-" + date + " " + hour + ":" + minute;
		// 返回
		return result;
	},
	//移除数据中的空对象
	removeObjectEmptyKey(json) {
	    var value;
	    for (var key in json) {
	        if (json.hasOwnProperty(key)) {
	            value = json[key];
	            if (value === undefined || value === '' || value === null) {
	                delete json[key]
	            }
	        }
	    }
	    return json;
	},
	
}