export const encodeText = text => {
  return new TextEncoder().encode(text).toString()
}

export const decodeText = arrary => {
  return new TextDecoder().decode(new Uint8Array(arrary))
}
