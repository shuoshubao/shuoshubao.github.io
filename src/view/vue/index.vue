<!-- <template>
  <div>
    <p>hello, <em>{{msg}}</em></p>
  </div>
</template>
 -->
<script>
  const data = {name: 1}
  const x = () => {}
  const y = {...data}
  console.log(x, y);
  export default {
    data() {
      return {
        msg: 'shuoshubao'
      }
    },
    render(h) {
        return (
            <div>hi</div>
        )
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
