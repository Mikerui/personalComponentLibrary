<template>
  <div>
    <div class="van-uploader">
      <van-icon name="photograph" />
      <input
        :type="type"
        @change="uploadIMG"
        :accept="accept"
        class="van-uploader__input"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
/**
 * v-model 返回图片路径，base64格式
 * 已经解决iPhone6下面上传图片旋转的问题\
 * input 可以通过绑定input时间来获取，变化
 */
import Exif from 'exif-js';
export default {
  name: 'm-upload',
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'file',
    },
    accept: {
      type: String,
      default: 'image/*',
    },
  },
  data() {
    return {
      isAddImg: true,
    };
  },
  methods: {
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picavalue = files[0];
      console.log(this.picavalue.size / 1024);
      if (this.picavalue.size / 1024 > 20000) {
        this.$toast(this.$t('language.imgMaxSize'));
      } else {
        this.imgPreview(this.picavalue);
      }
    },
    //获取图片
    imgPreview(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, 'Orientation');
      });
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();
        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          console.log('********未压缩前的图片大小********');
          console.log(result.length);
          img.onload = function() {
            let data = self.compress(img, Orientation);
            // self.imgList.push(data.substring(23));
            // self.imgList.push(data);
            self.uploadPost(data);
          };
        };
      }
    },
    // 上传图片
    uploadPost(strFile) {
      this.$emit('change', strFile);
      this.$emit('input', strFile);
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, 'right', canvas); //转两次
            this.rotateImg(img, 'right', canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1);
      // console.log("*******压缩后的图片大小*******");
      // console.log(ndata)
      // console.log(ndata.length);
      return ndata;
    },
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext('2d');
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.van-uploader {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 555;
}
</style>
