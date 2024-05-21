# RuleUser

RuleUser，一款基于Typecho的独立会员中心界面，后端接口采用RuleAPI，集成注册登录，扫码登录，在线投稿，商品发布，消息管理，在线充值和申请提现等。整套界面风格均为原创，未采用任何UI框架，独创的js页面载入模式，达到良好的高响应速度用户体验，后续将以模块化的方式接管Typecho已有功能体系。 


## 安装教程

[RuleProject全项目安装教程](https://www.yuque.com/buxia97/ruleproject)


## 二次开发说明

RuleUser的主要支持是Jquery，然后引入了Layer弹窗插件和editormd编辑器支持插件。不过目前的页面加载模式是独一无的，所以二开前需要理解目录对应的用法。

	/css   会员中心样式文件
	/editormd   Markdown编辑器和解析支持
	/font   图标库
	/img   图片素材文件
	/js  核心js文件（二开重要）
	/layer 弹窗插件
	/main  Typecho接管核心文件（二开重要）
	/owo 表情包支持
	/pages  所有页面文件

1.js目录下的base.js是整个会员中心的核心文件，内部的pageData(page)方法负责进入页面和执行页面初始的js。其中所有的js都是以function方法形式封装，请求采用jquery的ajax方法。以下方代码为例：

	if(page=="pages/inbox.html"){   //载入的页面文件
		getInbox();   //页面定义的初始方法
		menuActive(".menuUser");    //选择上级菜单高亮
	}
	
2.pages目录下是所有的页面，但是全局的头尾部和菜单都在base.js，所以pages目录只负责显示内容。创建新的文件后，就可以通过第一步的步骤让页面支持加载方法。同时，你可以通过如下的方法打开页面。

	loadPage("pages/inbox.html","我的消息")
	
3.main目录是接管typecho的支持，main.js是核心文件，test.html定义了所有的用法参考。

## 协议及申明

[许可协议 / 免责声明](https://www.yuque.com/buxia97/ruleproject/gm1pzr6h0e1eqvvc)