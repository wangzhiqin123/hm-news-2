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
    ></hm-input>

    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式错误"
    ></hm-input>

    <hm-button @click="login">登录</hm-button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // console.log('登录')
      // 通过this.$axios()发送请求
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
          alert('恭喜你，登陆成功')
          this.$router.push('/user')
        } else {
          alert('用户名或密码错误')
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
