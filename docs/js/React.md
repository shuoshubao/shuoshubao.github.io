# ReactDOM

## ReactDOM.render()

    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('app')
    );

## ReactDom.findDOMNode()

    ReactDom.findDOMNode(this.refs[refName])

# React

## React.createClass()

    var HelloMessage = React.createClass({
      render: function() {
        return <h1>Hello {this.props.name}</h1>;
      }
    });

> 组件类的第一个字母必须大写 ; 组件类只能包含一个顶层标签

### props

* getDefaultProps: function() { return {} }
* this.props[propName]
* this.props.children

      // Special Props
      class -> className
      for -> htmlFor
      style{{opacity: .5}}
      key
      dangerouslySetInnerHTML={{__html: ''}}
      ref
      // Transferring Props
      {...props}

### state

* getInitialState: function() { return {} }
* this.state[stateName]
* this.setState({}) 修改状态值，每次修改以后，自动调用 this.render 方法，重新渲染组件

#  表单

* event.target.value      input、textarea
* event.target.checked    checkbox、radio
* event.target.selected   option

# 组件的生命周期

## 状态

* Mounting：已插入真实 DOM
* Updating：正在被重新渲染
* Unmounting：已移出真实 DOM

## 状态处理函数

* componentWillMount()
* componentDidMount()
* componentWillUpdate(object nextProps, object nextState)
* componentDidUpdate(object prevProps, object prevState)
* componentWillUnmount()

# PropTypes

    var MyTitle = React.createClass({
      propTypes: {
        title: React.PropTypes.string.isRequired,
      },
      render: function() {
         return <h1> {this.props.title} </h1>;
       }
    });

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