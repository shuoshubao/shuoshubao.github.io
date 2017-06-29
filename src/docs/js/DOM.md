# Node

* document.documentElement
* document.head
* document.body

## 节点
* Document
* DocumentType
* Element
* Attribute
* Text
* DocumentFragment

## 属性

* nodeName
* nodeType

* ownerDocument
* baseURI


* childNodes
* firstNode
* lastChild
* nextSibling
* previousSibling
* parentNode
* parentElement

* textContent
* nodeValue

## 方法

* appendChild()
* hasChildNodes()
* insertBefore()
* removeChild()
* replaceChild()
* cloneNode()
* contains()
* compareDocumentPosition()
* isEqualNode()

* normalize()


# NodeList

* Node.childNodes
* document.querySelectorAll()
* document.getElementsByTagName()

## 属性

* length
* 数字索引

## 方法

* item(i)

> item(i) 等价于 NodeList[i]


# HTMLCollection

* docuement.anchors
* document.images
* document.links
* document.scripts
* docuement.forms
* document.embeds



## 属性

* length
* 数字索引

## 方法

* item(i)
* namedItem(name / id)

> item(i) 等价于 NodeList[i]
>
> namedItem(name / id) 等价于 NodeList[name / id]

# ParentNode, ChildNode

* children
* firstElementChild
* lastElementChild
* childElementCount
* remove()
* before()
* after()
* replaceWith()

# Element

## 属性

* attributes
* id
* tagName
* innerHTML
* children
* firstElementChild
* lastElementChild
* childElementCount
* nextElementSibling
* previousElementSibling
* className
* classList
	* add()
	* remove()
	* contains()
	* toggle()
	* item()
	* toString()
* clientHeight
* clientLeft
* clientTop
* clientWidth
* scrollHeight
* scrollWidth
* scrollLeft
* scrollTop

* dataset
* style

* offsetParent
* offsetTop
* offsetLeft
* tabindex

## 方法
* 选择器
	* querySelector()
	* querySelectorAll()
	* getElementsByTagName()
	* getElementsByClassName()
* 节点
	* remove()
	* before()
	* after()
	* replaceWith()
	* closest()
	* matches()
* 属性
	* hasAttribute()
	* getAttribute()
	* setAttribute()
	* removeAttribute()
* scrollIntoView()
* focus()
* elementFromPoint()

# table元素

## 属性

* caption
* tHead
* tBodies
* tFoot
* rows
* rows.cells


## 方法

* createCaption
* deleteCaption
* createTHead
* deleteTHead
* insertRow
* deleteRow
* insertCell
* deleteCell


# EventTarget

## 部署

* window对象
* document节点
* Element节点
* XMLHttpRequest

## 方法

* addEventListener()
* removeEventListener()
* dispatchEvent()
