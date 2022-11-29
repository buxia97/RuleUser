# RuleUser

RuleUser，一款基于Typecho的独立会员中心界面，后端接口采用RuleAPI，集成注册登录，扫码登录，在线投稿，商品发布，消息管理，在线充值和申请提现等。整套界面风格均为原创，未采用任何UI框架，独创的js页面载入模式，达到良好的高响应速度用户体验，后续将以模块化的方式接管Typecho已有功能体系。 

当前版本为开源带授权端版。


## 后端接口

本开源版本会即时支持最新的RuleApi版本（可能并未发布正式版），所以在下载使用时，请将RuleApi更新到最新内测版，命令如下：


	sh /opt/ruleapi.sh updateBeta


## 安装教程

可以参考如下链接完成安装配置。并且，RuleUser可以独立运行，无需Typecho网页界面。

[Typecho独立会员中心，前后端分离，充值付费功能集成，APP扫码登录](https://www.ruletree.club/archives/2979/)

## 授权端配置教程

RuleUser采用本地授权验证模式，即PHP生成授权码，js解析授权码，不存在远程验证地址，所以无论授权端是否存在，都不会影响用户使用。

1.授权端文件为根目录authorize.php文件，只需要将它和shouquan.html放在支持php环境的主机即可。**注意，这两个文件不能发给售卖的用户，而是仅能作为自己的授权服务端。**

2.定义独属于自己的授权码，很简单，打开authorize.php文件后可以看到如下的代码：

	$encry1 = "MRqwErtYuiTplKjhgfdSaZXcvbNmQrUMzC+Ay=";
	$encry2 = "qaZWsXedCrfvtgbyhNujmikolpFG+QERxGBn=H";
	$encry3 = "mNBvcXzLkjhGfdsApoIuYtrEWqJH=MxZla+SVy";

将这三个字段中的字符自己改变顺序或者替换即可，支持英文的大小写和英文非空格符号（特别注意，同一个字段内字符不能重复，重复可能导致授权出错。）

同时，以下的代码用于替换www头和尾部随机拼接，也可以根据情况自己修改。

    if($plan==0){
        $planVlaue="Gjk==";
        $www = "iurer";
        $planArr=$encry1;
    }
    if($plan==1){
        $planVlaue="MwL==";
        $www = "jjetg";
        $planArr=$encry2;
    }
    if($plan==2){
        $planVlaue="qvB==";
        $www = "cdpvc";
        $planArr=$encry3;
    }

3.完成授权端授权生产修改后，打开js目录下的base.js，这里就是整个项目的核心支持。依次搜索encry1、encry2、encry3这三个字段，将字段内容改成php文件对应即可。在这个js文件中，三个字段会以如下形式出现。

	var encry1 = "MRqwErtYuiTplKjhgfdSaZXcvbNmQrUMzC+Ay=";
	
然后，搜索loginUser()方法，内部就是base.js解析授权码的方法，同样的，把一些关键的字段改为和authorize.php一致即可。

4.在售卖用户或者自己使用时，为了防止授权被破解，请将js文件加密处理。主要加密的文件只有一个，那就是base.js


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

## 版权申明

当你被邀请进入该项目Github库时，即代表您可以随意进行二次开发售卖，无需申明基于RuleUser，也无需保留任何RuleUser的版权，并可以针对二次开发和使用问题随时发起咨询。

但请勿用于任何违法违规项目，一经发现将踢出该库，不再提供任何支持。我难以查询验证，但请针对这点保持自觉，遵守国家法律。