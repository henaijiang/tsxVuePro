import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import dataV from '@jiaminghi/data-view';
import VCharts from 'v-charts';
import $ from 'jquery';
import 'element-ui/lib/theme-chalk/index.css';
import 'v-charts/lib/style.css';
import "font-awesome/css/font-awesome.css";
import HUI from "tsvue-h-ui"
Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

Vue.use(HUI)
Vue.use(dataV)
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
