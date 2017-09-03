import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {Button} from 'antd'

@observer
class App extends React.Component {
  constructor() {
    super()
    this.store = observable({
      number: 0,
      list: []
    })
  }
  plus = () => {
    this.store.number += 1
  }
  minus = () => {
    this.store.number -= 1
  }
  search = () => {
    fetch('https://raw.githubusercontent.com/shuoshubao/blog/master/data/db.json')
    .then(rs => rs.json())
    .then(rs => {
      this.store.list = Object.entries(rs).map(([k, v]) => ({
        name: k,
        num: v.length,
        text: v.map(v => v.title).join('、')
      }))
    })
  }
  remove = index => {
    this.store.list.splice(index, 1)
  }
  render() {
    console.log('render')
    const {number, list} = this.store
    return (
      <div>
        <Button type="primary" onClick={this.plus}>plus</Button>
        <Button type="primary" onClick={this.minus}>minus</Button>
        <br />
        <Button icon="search" onClick={this.search}>搜索类别</Button>
        <div>{`store.number: ${number}`}</div>
        <div>类别: </div>
        <ul>
          {
            list.map((v, i) => (
              <li key={v.name}>
                <div>
                  <span>{`${v.name}: ${v.num}`}</span>
                  <span onClick={this.remove.bind(this, i)}>删除</span>
                </div>
                <div>{`${v.text}`}</div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
