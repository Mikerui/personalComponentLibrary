// 导入单个组件
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/icon/local.css';
import 'vant/lib/index.css';
Vue.use(Vant);

import mUpload from './m-upload/index.js';
// 以数组的结构保存组件，便于遍历
const components = [
  mUpload
];

// 定义 install 方法
const install = function (Vue) {
  // if (install.installed) return
  components.map(component => Vue.component(component.name, component));
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// 导出的对象必须具备一个 install 方法，组件导出
export default {
  install,
  // 组件列表 组件模块
  ...components,
};
// import {
//   get,
//   post,
//   postJson,
//   del,
//   put
// } from './axionConfig/index';
// import {
//   billUtils
// } from './utils/index';
// 工具类导出单独导出请求模块
// export {
//   post,
//   postJson,
//   del,
//   put,
//   get,
//   billUtils
// };