<template>
  <div>
    <p>hello, <em>{{msg}}</em></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'shuoshubao'
      }
    }
  }
</script>

<style lang="scss" scoped>
  p {
    margin: 0;
    em {
      color: cyan;
    }
  }
</style>
