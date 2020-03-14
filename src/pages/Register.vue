<template>
  <div class="register">
    <div class="header">
        <hm-header>注册</hm-header>
    </div>
    <div class="logo">
      <hm-logo></hm-logo>
    </div>

    <hm-input type='text' placeholder="请输入用户名"></hm-input>

    <hm-input type='password' placeholder="请输入密码"></hm-input>

    <hm-button @click='register'>注册</hm-button>
  </div>
</template>

<script>
export default {
  methods:{
    register(){
      console.log('注册')
    }
  }
}
</script>

<style>

</style>