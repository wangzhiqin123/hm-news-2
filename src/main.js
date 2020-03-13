import Vue from "vue";
import App from "./App.vue";
import "./styles/base.css";
import "./styles/iconfont.css";
// 自动适配所有的屏幕
import "lib-flexible";
//导入路由
import router from "./router";
Vue.config.productionTip = false;

// ----------全局注册组件
// 1.注册头部组件
import HmHeader from "./components/HmHeader.vue";
Vue.component("hm-header", HmHeader);
// 2.注册logo组件
import HmLogo from "./components/HmLogo.vue";
Vue.component("hm-logo", HmLogo);
// 3.注册登录按钮组件
import HmButton from "./components/HmButton.vue";
Vue.component("hm-button", HmButton);









new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
