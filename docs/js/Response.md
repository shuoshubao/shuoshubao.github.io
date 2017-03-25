# Syntax

```
var response = new Response(body, init);
```

## Parameters

### body

* Blob
* BufferSource
* FormData
* ReadableStream
* URLSearchParams
* USVString

### init

```
{
  status,
  statusText,
  headers
}
```

# Properties

* bodyUsed
* headers
* ok
* redirected
* status
* statusText
* type
* url

# Method

* redirect(url, status)
* error()
* clone()
* [Body](/#js/Body)

# Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)