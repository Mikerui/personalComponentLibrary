import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
// import Test from '../packages/Test/index';
import './assets/css/md.scss';
import 'highlight.js/styles/color-brewer.css';

import DemoBlock from './components/DemoBlock';
Vue.component('demo-block', DemoBlock);
// Vue.use (Test);

import mikeUi from '../packages/index';
Vue.use(mikeUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');