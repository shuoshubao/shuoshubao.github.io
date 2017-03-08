# Fetch

## base

```javascript
fetch(url)
fetch(url, {
  method,
  headers,
  body,
  credentials,
})
fetch(Request)
```

```
fetch(url)
.then(response => response.json())
.then(rs => {})
```

## stream数据流

> 数据流只能读取一次，一旦读取，数据流就空了。再次读取就不会得到结果。

# Headers

```javascript
var headers = new Headers();
headers.append(name, value);

var headers = new Headers({});
```

## Headers.prototype

* .has()
* .set()
* .append()
* .get()
* .getAll()
* .delete()

# Request

```javascript
var request = new Request(url);

```

## Request.prototype

* .url
* .bodyUsed
* .credentials
* .headers
* .integrity
* .method
* .mode // 'same-origin'、'no-cors'（默认值）、'cors'
* .redirect
* .referrer
* .referrerPolicy
* .clone()
* .json()
* .text()
* .formData()
* .blob()
* .arrayBuffer()

# Response

* Response.error()
* Response.redirect(url, status)

## Response.prototype

* .url
* .ok
* .status
* .statusText
* .body
* .headers
* .type // 'basic'、'cors'、'opaque'
* .clone()
* .json()
* .text()
* .formData()
* .blob()
* .arrayBuffer()


# Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch)