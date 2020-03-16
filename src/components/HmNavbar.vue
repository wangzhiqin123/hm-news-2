<template>
  <div class="hm-navbar">
    <div class="left">
      {{ title }}
    </div>
    <div class="center">
      {{ content }}
    </div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: String
  }
};
</script>

<style lang="less" scoped>
.hm-navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  margin-left: 20px;
  display: flex;
  .left {
    font-size: 14px;
  }
  .center {
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: #999;
  }
  .right {
    width: 30px;
    text-align: center;
  }
}
</style>
