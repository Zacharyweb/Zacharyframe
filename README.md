# Zachary框架（仿jQuery）

## 框架说明

本框架仅用于作者对jQuery的一些学习研究。

## 浏览器支持

* 支持IE6+、Firefox、Opera 、Safari 、Chrome浏览器。

## 使用方法

### 01.基础框架

* 对象扩展方法
```javascript
    $$.extend(target,source);
```

* 获取指定范围内随机数
```javascript
    $$.random(begin,end);
```

* 判断数据类型
```javascript
     $$.isNumber(param);
     $$.isBoolean(param);
     $$.isString(param);
     $$.isUndefined(param);
     $$.isObj(param);
     $$.isNull(param);
     $$.isArray(param);
```

* 字符串操作
```javascript
     $$.ltrim(str); //去除左边的空格
     $$.rtrim(str); //去除右边的空格
     $$.trim(str); //去除空格
     $$.formateString(str, data); //简单的数据绑定formateString
```

```javascript
     //$$.formateString(str, data)使用方法
     var images = {imgSrc:'img/01.jpg'};
     str = '<imgsrc="@(imgSrc)"/>';
     var result = $.formateString(html,images);
     //result === <imgsrc="'+ images.imgSrc +'"/>
```

* Ajax框架
```javascript
     $$.getAjax(URL,callback);
```

### 02.事件框架

* 绑定事件
```javascript
     $$.on(id,type,fn);
```

* 鼠标事件
```javascript
     $$.click(id,fn);
     $$.mouseover(id,fn);
     $$.mouseout(id,fn);
     $$.hover(id,fn);
```

* 获取事件event对象
```javascript
     $$.getEvent(event);
```

* 获取事件目标
```javascript
     $$.getTarget(event);
```

* 阻止默认行为
```javascript
     $$.preventDefault(event);
```

* 阻止冒泡
```javascript
     $$.stopPropagation(event);
```

### 03.选择框架

* 获取元素
```javascript
     $$.$id(str);
     $$.$tag(str);
     $$.$class(str);
```

* 组选择，例：li,span
```javascript
     $$.$group(str)
```

* 层次选择，例：div ul li
```javascript
     $$.$gardation(str);
```

* 层次+组选择，例：div ul li，div p span
```javascript
     $$.$select(str)
```

* 获取context容器里的所有元素
```javascript
     $$.$all(selector,context);
```

### 04.CSS样式框架

* show()、hide()方法
```javascript
     $$.show(obj);
     $$.hide(obj);
```

* 获取样式或获取样式
```javascript
     $$.css(obj,attr,[value]);
```

* 获取元素的宽、高
```javascript
     $$.Width(id);
     $$.Height(id);
```

* 获取元素的滚动高度和宽度
```javascript
     $$.scrollWidth(id);
     $$.scrollHeight(id);
```

* 获取元素滚动的时候 如果出现滚动条 相对于左上角的偏移量
```javascript
     $$.scrollTop(id);
     $$.scrollLeft(id);
```

* 获取屏幕的高度和宽度
```javascript
     $$.sHeight();
     $$.sWidth();
```

* 获取文档视口的高度和宽度
```javascript
     $$.wWidth();
     $$.wHeight();
```

  * 获取文档滚动区域的整体的高和宽
```javascript
     $$.wScrollHeight();
     $$.wScrollWidth();
```

  * 获取滚动条相对于其顶部的偏移
```javascript
     $$.wScrollTop();
```

  * 获取滚动条相对于其左边的偏移
```javascript
     $$.wScrollLeft();
```

### 05.属性框架

* 获取属性或设置属性
```javascript
     $$.attr(obj,attr,[value]);
```

* 添加类名
```javascript
     $$.addClass(obj,name);
```

* 移除类名
```javascript 
     $$.removeClass(obj,name);
```

* 判断是否存在类名
```javascript
     $$.hasClass(obj,name);
```

### 05.内容框架
* 设置或者获取元素的内容
```javascript
     $$.html(obj,[value]);
```

### 06.运动框架

* $$.animate(obj,json,[fn])方法
```javascript
     $$.animate(obj,json,[fn]);
```

```javascript
     $$.animate($$.$id('idName'),{left:200},[fn]);
```

#### 以上内容仅用于个人学习 。