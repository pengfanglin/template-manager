<template>
  <div class="root" v-if="!hide">
    <div :class="isEmpty(title)?'':'image_title'">
      <p>{{title}}</p>
    </div>
    <div class="image-content">
      <video controls="controls" :src="homeUrl+src" @click="beginUp" :style="options">
        <source type="video/mp4"/>
        <source type="video/flv"/>
        <source type="video/avi"/>
        <source type="video/mov"/>
        <source type="video/mkv"/>
      </video>
      <input type="file" accept="video/mp4,video/flv,video/avi，video/mov,video/mkv" ref="fileInput"
             @change="uploadImage">
    </div>
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
   * options:自定义组件宽度高度，默认：'width:200px;height:60px;'
   * hide:为true时隐藏组件
   * type: 文件选择器类型  image:图片，其他全为文件
   */
  export default {
    props: {
      initValue: {
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
      filed: {
        type: String,
        default: ''
      },
      options:{
        type: Object,
        default: {
          width: '200px',
          height: '60px'
        }
      },
      hide: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        src: !this.isEmpty(this.initValue) ? this.initValue : this.defaultImg
      }
    },
    watch: {
      initValue() {
        this.src = !this.isEmpty(this.initValue) ? this.initValue : this.defaultImg;
      }
    },
    methods: {
      uploadImage(e) {
        let formData = new FormData();
        formData.append(e.target.value, e.target.files[0]);
        formData.append("path", this.isEmpty(this.path) ? '' : this.path);
        this.ajaxFileUpload(1, formData);
      },
      doSuccess(index, data) {
        this.$message.success("上传成功");
        this.src = data[0];
        this.$emit('change', this.filed, data[0]);
      },
      doFailed(index, error) {
        this.$message.error(error);
      },
      beginUp() {
        if (!this.disable) {
          this.$refs.fileInput.click();
        }
      }
    }
  }
</script>
<style scoped>
  .root {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
  }

  .image_title {
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }

  .image-content {
    cursor: pointer;
    border-radius: 5px;
    border: 1px #2d6da3 solid;
  }

  input {
    display: none;
  }
</style>
