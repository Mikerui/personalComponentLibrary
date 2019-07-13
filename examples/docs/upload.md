<script>
  export default {
    data() {
      return {
        imgSrc:''
      };
    },
    mounted() {},
  };
</script>

# 图片上传

---

### 概述

解决了多张图片上传和 iphone6 图片上传图片旋转了 90 度的问题

::: demo #代码

```html
<img :src="imgSrc" />
<m-upload v-model="imgSrc" />

<script>
  export default {
    data() {
      return {
        imgSrc: '',
      };
    },
    mounted() {},
  };
</script>
```

:::

### Attributes

| 参数   | 说明   | 类型   | 可选值 | 默认值   |
| ------ | ------ | ------ | ------ | -------- |
| value  | 绑定值 | string | ——     | -        |
| type   | 同原生 | string | ——     | file     |
| accept | 同原生 | string | ——     | image/\* |

### Events

| 事件名称 | 说明        | 回调参数 |
| -------- | ----------- | -------- |
| change   | 返回 base64 | obj      |
