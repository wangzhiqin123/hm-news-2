<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img src="../images/2.jpg" alt="" />
      </div>
      <div class="center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          <span>吴世勋</span>
        </div>
        <div class="time">
          <span>2020-02-20</span>
        </div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="收藏/视频"></hm-navbar>
    <hm-navbar title="设置"></hm-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 100px;
  align-items: center;
  border-bottom: 2px solid #ccc;
  padding: 0 20px;
  .left {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    margin-left: 10px;
    .name {
      span {
        font-size: 18px;
      }
    }
    .time {
      span {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
