<template>
  <div class="my-comments">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        @load="onLoad"
        :immediate-check="false"
        finished-text="没有更多了"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">{{item.create_date | data('YYYY-MM-DD HH:mm')}}</div>
          <div class="parent" v-if="item.parent">
            <div class="parent-name">回复：{{item.parent.user.nickname}}</div>
            <div class="parent-content">{{item.parent.content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="link">
            <div class="title one-txt-cut">原文：{{item.post.title}}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const res = await this.$axios({
        method: 'get',
        url: 'user_comments',
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode == 200) {
        // 实现每一页的数据追加，而不是替换
        // this.list = data
        this.list = [...this.list, ...data]
        console.log(this.list)
        // loading改成false，才能处理下一次的数据加载
        this.loading = false
        // 判断数据是否加载完成，如果加载完成则停止加载，finished的值变成true
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      console.log('我要加载更多数据了')
      setTimeout(() => {
        this.pageIndex++
        this.getComments()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .time {
    color: #999;
    font-size: 12px;
  }
  .parent {
    background-color: #ddd;
    padding: 5px;
    margin-top: 5px;
    border-radius: 5px;
    .parent-name,
    .parent-content {
      height: 25px;
      line-height: 25px;
      color: #999;
    }
    .parent-name {
      font-size: 12px;
    }
    .parent-content {
      font-size: 14px;
    }
  }
  .content {
    font-size: 14px;
    height: 35px;
    line-height: 35px;
  }
  .title {
    font-size: 12px;
    color: #999;
  }
}
</style>
