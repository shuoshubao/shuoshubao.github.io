# Number

## 阶乘

```
const factorial = (N) => Array.from(new Array(N), (v, i) => i + 1).reduce((prev, cur) => prev * cur)

factorial(5) // 120
```

# Array

```
需求
// 数据源
const data = [
  '1000001001',
  '1000001002',
  '1000001003',
  '2000001009',
  '2000001008',
]
需要得到
{
  '10000': ['1001', '1002', '1003'],
  '20000': ['1009', '1008']
}

const convertArrayToJson = arr => arr.reduce((prev, cur) => {
  const short = cur.slice(0, 6)
  const temp = prev[short]
  if(temp) {
    prev[short].push(cur)
  }else {
    prev[short] = [cur]
  }
  return prev
}, {})

const ret = convertArrayToJson(data)
```

# Object

## filter 筛选对象

```javascript
const filter = (json, attrs) => attrs.reduce((prev, cur) => {
  prev[cur] = json[cur]
  return prev
}, {})

const data = {
  name: 'shuoshubao',
  age: 25,
  sex: 1
}

const filterData = filter(data, ['name', 'age'])
// {name: 'shuoshubao', age: 25}
```

## omit 过滤对象

```javascript
const omit = (json, attrs) => Object.keys(data).filter(v => !attrs.includes(v)).reduce((prev, cur) => {
  prev[cur] = json[cur]
  return prev
}, {})

const data = {
  name: 'shuoshubao',
  age: 25,
  sex: 1
}

const omitData = omit(data, ['name', 'age'])
// {sex: 1}
```
