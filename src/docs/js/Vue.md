# 全局配置

## Vue.config

* silent
* optionMergeStrategies
* devtools
* errorHandler
* warnHandler
* ignoredElements
* keyCodes
* performance
* productionTip

# 全局API

* Vue.component
* Vue.nextTick
* Vue.directive
* Vue.filter
* Vue.mixin
* Vue.extend
* Vue.set
* Vue.delete
* Vue.use
* Vue.compile
* Vue.version

# 选项

```
new Vue({
    // DOM
    el: '#el',
    template: '',
    render: createElement => {},
    renderError: (createElement, err) => {},

    // 数据
    props: [],
    propsData: {},
    data: {},
    computed: {
        extraData: function() {}
    },
    methods: {
        extraData: function() {}
    },
    watch: {
        extraData: function() {}
    },
    // 生命周期
    beforeCreate: () => {},
    created: () => {},
    beforeMount: () => {},
    mounted: () => {},
    beforeUpdate: () => {},
    updated: () => {},
    activated: () => {},
    deactivated: () => {},
    beforeDestroy: () => {},
    destroyed: () => {},
    // 资源
    directives: {} // 指令
    filters: {}, // 过滤器
    components: {} // 组件
    // 组合
    parent
    mixins
    extends
    provide
    inject
    // 其他
    name
    delimiters
    functional
    model
    inheritAttrs
    comments: false, // 保留且渲染模板中的 HTML 注释
})
```

> 过滤器 `filter` 只能用于两个地方: mustache 插值和 v-bind 表达式

# 实例属性

* .$refs
* .$data
* .$props
* .$el
* .$options
* .$root
* .$parent
* .$children
* .$attrs
* .$listeners
* .$slots
* .$scopedSlots
* .$isServer

# 实例方法

## 数据

* .watch()
* .set()
* .delete()

## 事件

* .$on()
* .$once()
* .$off()
* .$emit()

## 生命周期

* .$mount()
* .$forceUpdate()
* .$nextTick()
* .$destroy()

## 指令 directive

* v-text
* v-html
* v-show
* v-if
* v-else
* v-else-if
* v-for
* v-on -> `@`
* v-bind => `:`
* v-model
* v-once
* v-pre
* v-cloak

# 事件

```
// 传参
<button v-on:click="hi">button</button>
<button @click="hi">button</button>
<button @click="hi('a')">button</button>
<button @click="hi('a', $event)">button</button>

> 事件对象: `$event`

// 事件修饰符
.stop
.prevent
.capture
.self
.once

// 按键
.enter
.tab
.delete
.esc
.space
.up
.down
.left
.right

// 修饰键
.ctrl
.alt
.shift
.meta

// 滑鼠按键修饰符
.left
.right
.middle

```
