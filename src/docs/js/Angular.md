# 指令 ng-

* ng-app
* ng-model
* ng-eventType
* ng-controller

> 指令都写在html标签中

# 服务 $

* $rootScope
* $scope

```
$scope.$watch(str, function(newVal, oldVal) {} [, ifWatchAll])
$scope.$watch(function(){})
```

* $timeout
* $interval
  * $interval.cancel()
* $filter

> 依赖注入：需要什么服务，就在形参列表中添加服务名, 服务都写在函数中

* $timeout(function() {});
* $interval(function() {});
* $filter('filterName')(arg1, arg2, arg3);

# 过滤器 filter

* currency
* number
* date
* json
* limitTo
* filter
* orderBy
* lowercase/uppercase

> 写在 \{ filter : arg1 : arg2 : arg3 \} 中

> \| 称为 `管道`

> `:` 后面是`参数`，多个参数用多个 `:`

# 模块化

* angular.module()
* controller()
* run()
* filter()

```
var mod1 = angular.module('appName', [需要依赖的模块数组]);
mod1.controller('Aaa', ['$scope', '$rootScope', function($scope, $rootScope) {}]);
mod1.run(['$rootScope', function($rootScope) {}]);
mod1.filter('filterName', function(){
  return function(str) {
    return str
  }
});
```

# 工具方法

* angular.module()
* angular.bind()
* angular.copy()
* angular.extend()
* angular.isNumber()
* angular.isString()
* angular.isUndefined()
* angular.isDefined()
* angular.isObject()
* angular.isDate()
* angular.isArray()
* angular.isFunction()
* angular.isElement()
* angular.version
* angular.equeals()
* angular.forEach()
* angular.element()
* angular.identity()
* angular.noop()
* angular.lowercase()
* angular.uppercase()
* angular.bootstrap()
* angular.injector()

> angular.element() 底下有一堆的DOM操作函数，类似于jQuery

# jqLite

* angular.element()
* prop()
* attr() * Does not support functions as parameters
* css() * Only retrieves inline-styles, does not call getComputedStyle()
* hasClass()
* addClass()
* removeClass()
* toggleClass()
* clone()
* after()
* append()
* prepend()
* detach()
* empty()
* remove()
* wrap()
* replaceWith()
* on() : Does not support namespaces, selectors or eventData
* one() : Does not support namespaces or selectors
* off() : Does not support namespaces or selectors
* bind() : Does not support namespaces, selectors or eventData
* unbind() : Does not support namespaces
* triggerHandler() * Passes a dummy event object to handlers.
* find() * Limited to lookups by tag name
* eq()
* children() * Does not support selectors
* parent() * Does not support selectors
* next() * Does not support selectors
* ready()
* contents()
* data()
* removeData()
* val()
* text()
* html()
* removeAttr()

# 迭代指令
* $index
* $first
* $middle
* $last
* $even
* $odd
* ng-repeat-start
* ng-repeat-end

# 事件指令

* ng-click/dblclick
* ng-mousedown/up
* ng-mouseenter/leave
* ng-mousemove/over/out
* ng-keydown/up/press
* ng-focus/blur
* ng-submit
* ng-selected
* ng-change
* ng-copy
* ng-cut
* ng-paste

> `ng-change` 必须和 `ng-model` 同时存在

# input指令

* ng-disabled
* ng-readonly
* ng-checked
* ng-value

* ng-bind
* ng-bind-template
* ng-bind-html
* ng-cloak
* ng-non-bindable

# 属性指令

* ng-class
* ng-style
* ng-href
* ng-src
* ng-attr-(suffix)

> 注：表达式必须在 `{}` 中，其他的指令必须是在字符串中

# 样式指令

* ng-show
* ng-hide
* ng-if
* ng-swtich
  * on
  * default
  * when
* ng-open

# DOM指令

* ng-init
* ng-include
* ng-model
  * ng-model-option
  * updateOn
* ng-controller
  * as

> `ng-model-option` 的值 \{\} 中

# 标签指令

* \<a\>
* \<select\>
  * ng-options
  * for in
* \<textarea\>
* \<input\>
* \<form\>

# 表单验证

* $valid
* $invalid
* $pristine
* $dirty
* $error
* ng-minlength
* ng-maxkength
* ng-pattern

```
ng-valid
ng-invalid
ng-pristine
ng-dirty
```

> 1. novalidate
> 2. `name` 的方式进行查找
> 3. 配合 `ng-model`

# 自定义指令

directive (angular.module)

```
mod.directive('directiveName', function() {
  return {
    restrict: 'AECM',
    replace: false | true,
    transclude: false | true,
    template: 'str',
    templateUrl: 'url',
    scope: false | true | {},
    controller: ['$scope', function($scope) {}],
    link: function(scope, element, attr, reController) {}
  }
});
```

* restrict
  * A: attribute
  * E: element
  * C: class
  * M: comment

* transclude

> 配合 `ng-transclude`

* template / templateUrl : 模板
* scope
  * false
  * true : 独立作用域
  * {} : 隔离作用域 ： 传入数据
    * 绑定策略
    * @ : 绑定空字符串
    * = : 绑定变量
    * & : 绑定函数
* controller : 定义共享属性和方法
* link : DOM操作



# $http服务

* method : GET / POST / JSONP
* url : ''
* params: json
* data : string / json
* headers : object
* transformRequest : fn
* transformResponse : fn
* cache : boolean / Cache object
* timeout : number
* widthCredentials : boolean

# $location服务

* absUrl()
* path()
* hash()
* search()
* replace()
* host
* port()
* protocol()

# $anchorScroll服务

* $anchorScroll()

# $cacheFactory服务

```
var cache = $cacheFactory(name[, {capacity: num}])
```

* info()
  * id
  * size
  * [capacity]
* put(name, value)
* get(name)
* remove()

# $log服务

* log()
* info()
* warn()
* error()

# $interpolate服务

# $q服务

* defer()
* resolve()
* reject()
* notify()
* then()
* promise

> promise的实现

# 供应商

> 服务的相关初始配置操作

* config()
  * provider
  * $interpolateProvider
    * startSymbol()
    * endSymbol()
  * $logProvider
    * debugEnabled()
  * $anchorScrollProvider
    * disableAutoScrolling()

# factory 自定义服务

```
mod.factory('serviceName', ['', '', function() {
  return {

  }
}]);
```

> 不能进行初始化配置，即没有供应商

# provider 自定义服务

```
mod.provider('serviceName', [function() {
  return {
    $get: function() {

    }
  }
}]);
```

> $get
>
> 可以使用供应商

# constant / value

> 都是定义常量，但constant可以使用config, 且不用加Provider后缀
