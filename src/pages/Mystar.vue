<template>
  <div class="my-stay">
    <hm-header>我的收藏</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="bottom">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments.length}}跟帖</span>
          </div>
        </div>
        <img :src="item.cover[0].url" alt />
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
  async created() {
    //   this.$axios({
    //     method: 'get',
    //     url: '/user_star'
    //   }).then(res => {
    //     // console.log(res.data)
    //     const { statusCode, data } = res.data
    //     if (statusCode == 200) {
    //       this.list = data
    //       console.log(this.list)
    //     }
    //   })
    //   // this.$axios.get('/user_star')
    // }

    const res = await this.$axios('/user_star')
    const { statusCode, data } = res.data
    if (statusCode == 200) {
      this.list = data
      console.log(this.list)
    }
  }
}
</script>

<style lang='less' scoped>
.item {
  // height: 100px;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  .info {
    float: left;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .bottom {
      span {
        color: #999;
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  img {
    height: 80px;
    width: 120px;
    float: right;
    object-fit: cover;
  }
}
</style>