# ReactDOM

## ReactDOM.render()

```javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app')
);
```

## ReactDOM.findDOMNode()

```javascript
ReactDOM.findDOMNode(this.refs[refName])
```

# React

## React.createClass()

```javascript
React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
```

> 组件类的第一个字母必须大写 ; 组件类只能包含一个顶层标签

### props

* getDefaultProps: function() { return {} }
* this.props[propName]
* this.props.children

### special props

```javascript
class -> className
for -> htmlFor
style{{opacity: .5}}
colspan -> colSpan
rowspan -> rowSpan
defaultValue select/input[text]
defaultChecked input[radio, checkbox]
key
ref
dangerouslySetInnerHTML={{__html: ''}}
{...props}
```

### state

* getInitialState: function() { return {} }
* this.state[stateName]
* this.setState({})

#  表单

* event.target.value      input、textarea
* event.target.checked    checkbox、radio
* event.target.selected   option

# Component Lifecycle

## Mounting [已插入真实 DOM]

* constructor()
* componentWillMount()
* render()
* componentDidMount()

## Updating [正在被重新渲染]

* componentWillReceiveProps()
* shouldComponentUpdate()
* componentWillUpdate(object nextProps, object nextState)
* render()
* componentDidUpdate(object prevProps, object prevState)

## Unmounting [已移出真实 DOM]

* componentWillUnmount()

# Other APIs

## Component APIs

* setState()
* forceUpdate()

## Class Properties

* defaultProps
* displayName
* propTypes

## Instance Properties

* props
* state

```javascript
import React, {Component, propTypes} from 'react'

export default class extends Component {
  static defaultProps = {

  }
  static propTypes = {
    visible: propTypes.bool.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {

    }
  }
}
```

# PropTypes

```javascript
React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
});
```

* React.PropTypes.array
* React.PropTypes.bool
* React.PropTypes.func
* React.PropTypes.number
* React.PropTypes.object
* React.PropTypes.string
* React.PropTypes.node
* React.PropTypes.element
* React.PropTypes.instanceOf(Message)
* React.PropTypes.oneOf([])
* React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.instanceOf(Message) ])
* React.PropTypes.arrayOf(React.PropTypes.number)
* React.PropTypes.objectOf(React.PropTypes.number)
* React.PropTypes.shape({color: React.PropTypes.string, fontSize: React.PropTypes.number })
* React.PropTypes.func.isRequired
* React.PropTypes.any.isRequired
* customProp: function(props, propName, componentName) {}

# Event

> SyntheticEvent 、 nativeEvent

* boolean bubbles
* boolean cancelable
* DOMEventTarget currentTarget
* boolean defaultPrevented
* number eventPhase
* boolean isTrusted
* DOMEvent nativeEvent
* void preventDefault()
* boolean isDefaultPrevented()
* void stopPropagation()
* boolean isPropagationStopped()
* DOMEventTarget target
* number timeStamp
* string type


| Event Type | Event names | Properties |
|-|-|-|
| Mouse | onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp |  altKey button buttons clientX clientY ctrlKey getModifierState(key) metaKey pageX pageY relatedTarget screenX screenY shiftKey |
| Wheel | onWheel | deltaMode deltaX deltaY deltaZ |
| Keyboard | onKeyDown onKeyPress onKeyUp | altKey charCode ctrlKey getModifierState(key) key keyCode locale location metaKey repeat shiftKey which |
| Focus | onFocus onBlur | DOMEventTarget relatedTarget |
| Form | onChange onInput onSubmit ||
| Touch | onTouchCancel onTouchEnd onTouchMove onTouchStart | altKey changedTouches ctrlKey getModifierState(key) metaKey shiftKey targetTouches touches |
| Selection | onSelect ||
| Clipboard | onCopy onCut onPaste | DOMDataTransfer clipboardData |
| UI | onScroll | detail view |
| Image | onLoad onError | |
| Media | onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting | |
| Transition | onTransitionEnd | propertyName pseudoElement elapsedTime |
| Animation | onAnimationStart onAnimationEnd onAnimationIteration | animationName pseudoElement elapsedTime |
| Composition | onCompositionEnd onCompositionStart onCompositionUpdate | string data |


# Top-Level API

## React

* React.Component
* React.createClass
* React.createElement
* React.cloneElement
* React.createFactory
* React.isValidElement
* React.DOM
* React.PropTypes
* React.Children
  * React.Children.map
  * React.Children.forEach
  * React.Children.count
  * React.Children.only
  * React.Children.toArray

## ReactDOM

* ReactDOM.render
* ReactDOM.unmountComponentAtNode
* ReactDOM.findDOMNode

## ReactDOMServer
* ReactDOMServer.renderToString
* ReactDOMServer.renderToStaticMarkup

## Term

* React Elements
* Factories
* React Nodes
* React Components
