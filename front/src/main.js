
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from "./store";
import axios from "./config/axios";
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue';

Vue.prototype.$http = axios
Vue.use(ElementUI, { locale })


new Vue({ el: '#app', router, store, render: h => h(App) })