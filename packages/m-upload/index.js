// 导入组件，组件必须声明 name
import mUpload from './src/m-upload';
// 为组件添加 install 方法，用于按需引入
mUpload.install = function (Vue) {
  Vue.component(mUpload.name, mUpload);
};
export default mUpload;