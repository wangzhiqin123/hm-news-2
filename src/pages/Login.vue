<template>
  <div class="login">
    <div class="header">
      <hm-header>登录</hm-header>
    </div>

    <div class="logo">
      <hm-logo></hm-logo>
    </div>

    <hm-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式错误"
      ref="username"
    ></hm-input>

    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式错误"
      ref="password"
    ></hm-input>

    <hm-button @click="login">登录</hm-button>
    <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // console.log('登录')
      // 通过this.$axios()发送请求
      const result1 = this.$refs.username.test(this.username)
      const result2 = this.$refs.password.test(this.password)
      // console.log(result1,result2)
      if (!result1 || !result2) {
        return
      }
      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res)
        if (res.data.statusCode == 200) {
          this.$toast.success('登录成功')
          this.$router.push('/user')
        } else {
          this.$toast.fail('用户名或密码错误')
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style></style>
