<template>
  <div class="register">
    <div class="header">
      <hm-header>注册</hm-header>
    </div>
    <div class="logo">
      <hm-logo></hm-logo>
    </div>

    <hm-input
      type="text"
      placeholder="用户名/手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hm-input>

    <hm-input
      type="text"
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="昵称必须是3-7位的中文"
      ref="nickname"
    ></hm-input>

    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码必须是3-6位的数字"
      ref="password"
    ></hm-input>

    <hm-button @click="register">注册</hm-button>
    <div class="go-login">
      没有账号? 去
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      nickname: "",
      password: ""
    };
  },
  methods: {
    register() {
      const status1 = this.$refs.username.test(this.username);
      const status2 = this.$refs.nickname.test(this.nickname);
      const status3 = this.$refs.password.test(this.password);
      if (!status1 || !status2 || !status3) {
        return;
      }
      console.log("注册");
      this.$axios({
        method: "post",
        url: "/register",
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data.statusCode == 200) {
          this.$toast.success("注册成功");

          this.$router.push({
            name:"login",
            params:{ username: this.username, password: this.password }
          });
        } else {
          this.$toast.fail("用户名或密码格式错误");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.go-login {
  float: right;
  margin-right: 30px;
}
</style>
