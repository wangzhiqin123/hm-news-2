<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
        </div>
        <div class="center">
          <div class="name">{{item.nickname}}</div>
          <div class="date">{{item.create_date | data}}</div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getFollow()
  },
  methods: {
    async getFollow() {
      const res = await this.$axios({
        method: 'get',
        url: '/user_follows'
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode == 200) {
        this.list = data
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定取消关注吗?'
        })
        const res = await this.$axios({
          method: 'get',
          url: `/user_unfollow/${id}`
        })
        console.log(res.data)
        const { statusCode, message } = res.data
        if (statusCode == 200) {
          this.$toast.success(message)
          this.getFollow()
        }
      } catch {
        this.$toast('操作取消')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  height: 80px;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  .left {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
    }
  }
  .center {
    flex: 1;
    margin-left: 10px;
    .name {
      font-size: 16px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    height: 30px;
    line-height: 30px;
    background: #ccc;
    border-radius: 15px;
    padding: 0 10px;
  }
}
</style>
