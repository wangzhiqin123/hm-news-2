import Vue from "vue";
import App from "./App.vue";
import "./styles/base.css";
import "./styles/iconfont.css";
// 自动适配所有的屏幕
import "lib-flexible";
//导入路由
import router from "./router";
import axios from "axios";
// 全局导入vant组件库
// import Vant from "vant";
// import "vant/lib/index.css";
// Vue.use(Vant);

// 按需导入vant组件
import { Button, Toast } from "vant";
Vue.use(Button);
Vue.use(Toast);

// 配置基础路径
axios.defaults.baseURL = "http://localhost:3000";
// 把axios绑定到了vue的原型上，所有的vue实例（组件）都可以通过 this.axios访问到axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// -------------- 全局注册组件 -----------------
// 1.注册头部组件
import HmHeader from "./components/HmHeader.vue";
Vue.component("hm-header", HmHeader);
// 2.注册logo组件
import HmLogo from "./components/HmLogo.vue";
Vue.component("hm-logo", HmLogo);
// 3.注册登录按钮组件
import HmButton from "./components/HmButton.vue";
Vue.component("hm-button", HmButton);
// 4. 注册登录页input框组件
import HmInput from "./components/HmInput.vue";
Vue.component("hm-input", HmInput);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
