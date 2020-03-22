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
    <div class="go-register">
      没有账号? 去
      <router-link to="/register">注册</router-link>
    </div>
    <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<script>
export default {
  methods: {
    async login() {
      // console.log('登录')
      // 通过this.$axios()发送请求
      const result1 = this.$refs.username.test(this.username);
      const result2 = this.$refs.password.test(this.password);
      // console.log(result1,result2)
      if (!result1 || !result2) {
        return;
      }
      const res = await this.$axios({
        method: "post",
        url: "/login",
        data: {
          username: this.username,
          password: this.password
        }
      });
      // console.log(res.data);
      const { statusCode, message, data } = res.data;
      if (statusCode == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user.id);
        this.$toast.success(message);
        this.$router.push("/user");
      } else {
        this.$toast.fail(message);
      }
    }
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    // console.log(this.$route);
    (this.username = this.$route.params.username),
      (this.password = this.$route.params.password);
  }
};
</script>

<style lang="less" scoped>
.go-register {
  float: right;
  margin-right: 30px;
}
</style>
