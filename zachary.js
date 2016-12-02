/* ===========================================================
 * zachary.js 0.0.1 (Beta)
 *
 * https://github.com/alvarotrigo/pagePiling.js
 * MIT licensed
 *
 * Copyright (C) 2015 zjresume.com - A frame by Zachary
 *
 * ========================================================== */
var $$ = function() {};
$$.prototype = {
	/*将一个对象的所有属性拷贝给另一个对象*/
	extend:function(tar,source) {
		//遍历对象
		for(var i in source){
			tar[i] = source[i];
		}
		return tar;
	}
}
$$ = new $$();
//基础
$$.extend($$,{
	//随机数
	random: function (begin, end) {
		return Math.floor(Math.random() * (end - begin)) + begin;
	},
})

/*数据类型判断*/
$$.extend($$,{
	//数据类型检测
	isNumber:function (val){
		return typeof val === 'number' && isFinite(val)
	},
	isBoolean:function (val) {
		return typeof val ==="boolean";
	},
	isString:function (val) {
		return typeof val === "string";
	},
	isUndefined:function (val) {
		return typeof val === "undefined";
	},
	isObj:function (str){
		if(str === null || typeof str === 'undefined'){
			return false;
		}
		return typeof str === 'object';
	},
	isNull:function (val){
		return  val === null;
	},
	isArray:function (arr) {
		if(arr === null || typeof arr === 'undefined'){
			return false;
		}
		return arr.constructor === Array;
	},
})

/*字符串操作*/
$$.extend($$,{
	//去除左边空格
	ltrim:function(str){
		return str.replace(/(^\s*)/g,'');
	},
	//去除右边空格
	rtrim:function(str){
		return str.replace(/(\s*$)/g,'');
	},
	//去除空格
	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	//简单的数据绑定formateString
	formateString:function(str, data){
		return str.replace(/@\((\w+)\)/g, function(match, key){
			return typeof data[key] === "undefined" ? '' : data[key]});
	},
})

/*ajax框架*/
$$.extend($$,{
	getAjax:function(URL,fn){
		var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					fn(xhr.responseText);
				}else{
					alert("错误的文件！");
				}
			}
		};
		xhr.open("get",URL,true);
		xhr.send();

		//闭包形式，因为这个函数只服务于ajax函数
		function createXHR() {
			//本函数来自于《JavaScript高级程序设计 第3版》第21章
			if (typeof XMLHttpRequest != "undefined") {
				return new XMLHttpRequest();
			} else if (typeof ActiveXObject != "undefined") {
				if (typeof arguments.callee.activeXString != "string") {
					var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
							"MSXML2.XMLHttp"
						],
						i, len;
					for (i = 0, len = versions.length; i < len; i++) {
						try {
							new ActiveXObject(versions[i]);
							arguments.callee.activeXString = versions[i];
							break;
						} catch (ex) {
						}
					}
				}
				return new ActiveXObject(arguments.callee.activeXString);
			} else {
				throw new Error("No XHR object available.");
			}
		}
	}
})

/*事件框架*/
$$.extend($$,{
	/*事件绑定*/
	on: function (id, type, fn) {
		var dom = $$.isString(id)?document.getElementById(id):id;
		if(dom.addEventListener ) {
			dom.addEventListener(type, fn, false);
		}else if(dom.attachEvent){
			//如果支持 --IE
			dom.attachEvent('on' + type, fn);
		}
	},
	/*点击*/
	click : function(id,fn){
		this.on(id,'click',fn);
	},
	/*鼠标移上*/
	mouseover:function(id,fn){
		this.on(id,'mouseover',fn);
	},
	/*鼠标离开*/
	mouseout:function(id,fn){
		this.on(id,'mouseout',fn);
	},
	/*鼠标悬浮*/
	hover:function (id,fnover,fnout){
		if(fnover){
			$$.on(id,"mouseover",fnover);
		}
		if(fnout){
			$$.on(id,"mouseout",fnout);
		}
	},
	//获取事件event对象
	getEvent:function (e){
		return e?e:window.event;
	},
	/*获取目标元素*/
	getTarget :function (e){
		var event = $$.getEvent(e)
		/*短路表达式*/
		return event.target || event.srcElement
	},
	//阻止默认行为
	preventDefault:function(event){
		var event = $$.getEvent(event);
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//阻止冒泡
	stopPropagation:function(event){
		var event = $$.getEvent(event);
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
})

/*选择框架*/
$$.extend($$,{
	$id:function(str){
		return document.getElementById(str)
	},
	/*tag选择器 ：g恩局标签选择一个元素*/
	$tag:function (tag,context){
		if(typeof context == 'string'){
			context = $$.$id(context);
		}

		if(context){
			return context.getElementsByTagName(tag);
		}else{
			return document.getElementsByTagName(tag);
		}
	},
	/*class选择器：根据class获取元素*/
	$class:function (context,className) {
		context = document.getElementById(context);
		if(context.getElementsByClassName){
			return context.getElementsByClassName(className);
		}else{
			var arr=[];
			dom = context.getElementsByTagName('*');
			for(var i,len=dom.length;i<len;i++) {
				if(dom[i].className && dom[i].className ==className ) {
					arr.push(dom[i]);
				}
			}
		}
		return arr;
	},
	//分组
	$group:function(content) {
		var result=[],doms=[];
		var arr = $$.trim(content).split(',');
		for(var i=0,len=arr.length;i<len;i++) {
			var item = $$.trim(arr[i])
			var first= item.charAt(0)
			var index = item.indexOf(first)
			if(first === '.') {
				doms=$$.$class(item.slice(index+1))
				pushArray(doms,result)

			}else if(first ==='#'){
				doms=[$$.$id(item.slice(index+1))]
				pushArray(doms,result)
			}else{
				doms = $$.$tag(item)
				pushArray(doms,result)
			}
		}
		return result;

		//封装重复的代码
		function pushArray(doms,result){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	/*层次*/
	$gardation:function (select){
		var sel = $$.trim(select).split(' ');
		var result=[];
		var context=[];
		for(var i = 0, len = sel.length; i < len; i++){
			result=[];
			var item = $$.trim(sel[i]);
			var first = sel[i].charAt(0)
			var index = item.indexOf(first)
			if(first ==='#'){
				//如果是#，找到该元素，
				pushArray([$$.$id(item.slice(index + 1))]);
				context = result;
			}else if(first ==='.'){

				if(context.length){
					for(var j = 0, contextLen = context.length; j < contextLen; j++){
						pushArray($$.$class(item.slice(index + 1), context[j]));
					}
				}else{
					pushArray($$.$class(item.slice(index + 1)));
				}
				context = result;
			}else{
				//如果是标签
				if(context.length){
					for(var j = 0, contextLen = context.length; j < contextLen; j++){
						pushArray($$.$tag(item, context[j]));
					}
				}else{
					pushArray($$.$tag(item));
				}
				context = result;
			}
		}
		return context;
		//封装重复的代码
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//多组 + 层次
	$select:function(str) {
		var result = [];
		var item = $$.trim(str).split(',');
		for(var i = 0, glen = item.length; i < glen; i++){
			var select = $$.trim(item[i]);
			var context = [];
			context = $$.$cengci(select);
			pushArray(context);
		};
		return result;
		//封装重复的代码
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//html5实现的选择器
	$all:function(selector,context){
		context = context || document;
		return  context.querySelectorAll(selector);
	},
})

/*css框架*/
$$.extend($$,{
	//显示
	show:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'block');
		}
	},

	//隐藏
	hide:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'none');
		}
	},

	/*css*/
	css:function(context, key, value){
		var dom = $$.isString(context)?$$.$all(context) : context;
		//如果是数组
		if(dom.length){
			//如果value不为空，则表示设置
			if(value){
				for(var i = dom.length - 1; i >= 0; i--){
					setStyle(dom[i],key, value);
				}
				//如果value为空，则表示获取
			}else{
				return getStyle(dom[0]);
			}
			//如果不是数组
		}else{
			if(value){
				setStyle(dom,key, value);
			}else{
				return getStyle(dom);
			}
		}
		function getStyle(dom){
			if(dom.currentStyle){
				return dom.currentStyle[key];
			}else{
				return getComputedStyle(dom,null)[key];
			}
		}
		function setStyle(dom,key,value){
			dom.style[key] = value;
		}
	},
	//元素高度宽度概述
	//计算方式：clientHeight clientWidth innerWidth innerHeight
	//元素的实际高度+border，也不包含滚动条
	Width:function (id){
		return $$.$id(id).clientWidth
	},
	Height:function (id){
		return $$.$id(id).clientHeight
	},

	//元素的滚动高度和宽度
	//当元素出现滚动条时候，这里的高度有两种：可视区域的高度 实际高度（可视高度+不可见的高度）
	//计算方式 scrollwidth
	scrollWidth:function (id){
		return $$.$id(id).scrollWidth
	},
	scrollHeight:function (id){
		return $$.$id(id).scrollHeight
	},

	//元素滚动的时候 如果出现滚动条 相对于左上角的偏移量
	//计算方式 scrollTop scrollLeft
	scrollTop:function (id){
		return $$.$id(id).scrollTop
	},
	scrollLeft:function (id){
		return $$.$id(id).scrollLeft
	},

	//获取屏幕的高度和宽度
	sHeight:function (){
		return  window.screen.height
	},
	sWidth:function (){
		return  window.screen.width
	},

	//文档视口的高度和宽度
	wWidth:function (){
		return document.documentElement.clientWidth
	},
	wHeight:function (){
		return document.documentElement.clientHeight
	},
	//文档滚动区域的整体的高和宽
	wScrollHeight:function () {
		return document.body.scrollHeight
	},
	wScrollWidth:function () {
		return document.body.scrollWidth
	},
	//获取滚动条相对于其顶部的偏移
	wScrollTop:function () {
		var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
		return scrollTop
	},
	//获取滚动条相对于其左边的偏移
	wScrollLeft:function () {
		var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
		return scrollLeft
	}
})

/*属性*/
$$.extend($$,{
	attr:function (context,key,value){
		var doms = $$.$all(context)
		//设置模式
		if(value){
			for(var i =0;i<doms.length;i++){
				doms[i].setAttribute(key,value)
			}
		}else{
			//获取模式
			return doms[0].getAttribute(key)
		}
	},
	//动态添加和移除class
	addClass:function (context, name){
		var doms = $$.$all(context);
		//如果获取的是集合
		if(doms.length){
			for(var i= 0,len=doms.length;i<len;i++){
				addName(doms[i]);
			}
			//如果获取的不是集合
		}else{
			addName(doms);
		}
		function addName(dom){
			dom.className = dom.className + ' ' + name;
		}
	},
	removeClass:function (context, name){
		var doms = $$.$all(context);
		for(var i= 0,len=doms.length;i<len;i++){
			removeName(doms[i],name);
		}
		function removeName(dom,name){
			dom.className =  dom.className.replace(name,'')
		}
	},
	hasClass: function (context,name){
		var doms = $$.$all(context)
		var flag = true;
		for(var i= 0,len=doms.length;i<len;i++){
			flag = flag && check(doms[i],name)
		}
		return flag;
		//判定单个元素
		function check(element,name){
			return -1<(" "+element.className+" ").indexOf(" "+name+" ")
		}
	}
})

/*内容框架*/
$$.extend($$,{
	/*设置或者获取元素的内容*/
	html:function (context,value){
		var doms = $$.$all(context)
		//设置模式
		if(value){
			for(var i = 0;i<doms.length;i++){
				doms[i].innerHTML = value
			}
		}else{
			/*获取模式*/
			return doms[0].innerHTML
		}
	}
})

/*动画框架*/
$$.extend($$,{
	animate:function(obj,json,fn) {
        clearInterval(obj.timer);
        function getStyle(obj,attr){  
	        if(obj.currentStyle){
	            return obj.currentStyle[attr];  
	        }
	        else{
	            return window.getComputedStyle(obj,null)[attr];  
	        }
	    };
        obj.timer = setInterval(function() {
            var flag = true;  
            for(var attr in json){  
                var current = 0;
                if(attr == "opacity"){
                    current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                }
                else{
                    current = parseInt(getStyle(obj,attr)); 
                }
                var step = ( json[attr] - current) / 10;  
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if(attr == "opacity"){
                    if("opacity" in obj.style){
                        obj.style.opacity = (current + step) /100;
                    }
                    else{ 
                        obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                    }
                }
                else if(attr == "zIndex"){
                    obj.style.zIndex = json[attr];
                }
                else{
                    obj.style[attr] = current  + step + "px" ;
                }
                if(current != json[attr]){
                    flag =  false;
                }
            }
            if(flag)  
            {
                clearInterval(obj.timer);
                if(fn)  
                {
                    fn(); 
                }
            }
        },10)
    }
})