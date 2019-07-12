<template>
  <div class="root box_start" v-if="!hide">
    <p :class="isEmpty(title)?'':'title'">{{title}}</p>
    <div class="root_content">
      <img class="show" :src="src.indexOf('http')>-1?src:(homeUrl+src)" @click="changeBig" @error="imgError"
           :style="options" title="点击放大">
      <input type="file" :accept="isEmpty(type)||type==='image'?'image/png,image/jpg,image/jpeg,image/gif':''"
             name="file" ref="fileInput" @change="uploadImage">
      <img :src="require('../../assets/images/common/upload-icon.png')" class="upload-icon" @click="beginUp"
           v-if="!disable&&!not_hover">
    </div>
    <img v-if="isClick&&!not_hover" :src="src.indexOf('http')>-1?src:(homeUrl+src)" @click="changeSmall"
         @error="imgError" class="img_click">
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 图片组件（只支持单张上传）
   * initValue:初始值
   * path：图片上传后保存路径，后台代码默认为：/images/others
   * title：组件左侧文本
   * disable:为true时禁用组件
   * filed:所属表单字段名
   * options:自定义组件宽度高度，默认：'width:100px;height:100px;'
   * hide:为true时隐藏组件
   * type: 文件选择器类型  image:图片，其他全为文件
   */
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      path: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      disable: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: function () {
          return {
            width: '60px',
            height: '60px'
          }
        }
      },
      hide: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'image'
      },
      not_hover: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        src: !this.isEmpty(this.initValue) ? this.initValue : this.defaultImg,
        img_class: 'leave',
        isClick: false
      }
    },
    watch: {
      value() {
        this.src = !this.isEmpty(this.value) ? value : this.defaultImg;
      }
    },
    methods: {
      uploadImage(e) {
        if (this.isEmpty(e.target.value)) {
          return;
        }
        let formData = new FormData();
        formData.append("path", this.isEmpty(this.path) ? '' : this.path);
        if ((e.target.files[0].type.indexOf('image') > -1) && e.target.files[0].size > 1024 * 40) {
          this.photoCompress(e.target.files[0], {
              quality: 0.5
            }, (base64Codes) => {
              formData.append(e.target.name, base64Codes, e.target.value);
              this.ajaxFileUpload(1, formData);
            }
          )
        } else {
          formData.append(e.target.name, e.target.files[0], e.target.value);
          this.ajaxFileUpload(1, formData);
        }
      },
      doSuccess(index, data) {
        this.$message.success("上传成功");
        this.src = data[0];
        this.$emit('input',data[0]);
        this.$refs.fileInput.value='';
      },
      doFailed(index, error) {
        this.$message.error(error);
      },
      imgError(e) {
        e.target.src = this.defaultImg;
      },
      beginUp() {
        if (!this.disable) {
          this.$refs.fileInput.click();
        }
      },
      changeBig() {
        if (this.not_hover) {
          this.beginUp();
        }
        this.isClick = !this.isClick;
      },
      changeSmall() {
        this.isClick = !this.isClick;
      }
    }
  }
</script>
<style scoped lang="less">
  .root {
    .title {
      width: 100px;
      font-size: 18px;
      text-align: right;
      margin-right: 10px;
    }
  }
  .root_content {
    cursor: pointer;
    border-radius: 5px;
    .show {
      border: 1px #2d6da3 solid;
      border-radius: 5px;
    }
    .upload-icon {
      width: 30px;
      height: 30px;
    }
    input {
      display: none;
    }
  }
  .img_click {
    width: 800px;
    height: 800px;
    border: 1px #2d6da3 solid;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
</style>
