<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="center">
        <div class="name">
          <span v-if="info.gender == 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">
          <span>{{ info.create_date | data }}</span>
        </div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="收藏/视频"></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    this.$axios({
      method: 'get',
      url: `/user/${user_id}`,
      headers: {
        Authorization: token
      }
    }).then(res => {
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode == 200) {
        this.info = data
        // console.log(this.info)
      }
    })
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '确定退出本系统吗?'
        })
        .then(() => {
          localStorage.removeItem('token'), localStorage.removeItem('user_id')
          this.$router.push('/login')
          this.$toast.success('退出成功')
        })
        .catch(() => {
          this.$toast('退出成功')
        })
    }
  }
}
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
    .iconxingbienan {
      color: blue;
    }
    .iconxingbienv {
      color: pink;
    }
  }
}
</style>
