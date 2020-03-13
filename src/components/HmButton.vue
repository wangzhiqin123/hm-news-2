<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {

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