<template>
  <div class="hm-button" @click='clickFn'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods:{
    clickFn(){
      // console.log('hhaa')
      this.$emit('click')
    }
  }
}
</script>

<style lang='less' scoped>
  .hm-button{
    margin: 20px;
    height: 50px;
    line-height: 50px;
    background-color: #c30;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    text-align: center;
  }
</style>