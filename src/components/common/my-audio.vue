<template>
  <div class="root" v-if="!hide">
    <div :class="isEmpty(title)?'':'image_title'">
      <p>{{title}}</p>
    </div>
    <div class="root_content">
      <img class="show" v-if="isEmpty(src)" :src="defaultImg" @error="imgError" :style="{width:'60px',height:'60px'}"/>
      <audio class="show" v-else controls="controls" :src="src.indexOf('http')>-1?src:(homeUrl+src)" @error="imgError"
             :style="options"></audio>
      <input type="file" accept="audio/mpeg" name="file" ref="fileInput" @change="uploadImage">
      <img :src="require('../../assets/images/common/upload-icon.png')" class="upload_icon" @click="beginUp"
           v-if="!disable">
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
   * options:自定义组件宽度高度，默认：'width:100px;height:100px;'
   * hide:为true时隐藏组件
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
      options: {
        type: Object,
        default: {
          width: '60px',
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
        src: !this.isEmpty(this.initValue) ? this.initValue : '',
      }
    },
    watch: {
      initValue() {
        this.src = !this.isEmpty(this.initValue) ? this.initValue : '';
      }
    },
    methods: {
      uploadImage(e) {
        let formData = new FormData();
        formData.append("path", this.isEmpty(this.path) ? '' : this.path);
        formData.append(e.target.name, e.target.files[0], e.target.value);
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
      imgError(e) {
        e.target.src = this.defaultImg;
      },
      beginUp() {
        if (!this.disable) {
          this.$refs.fileInput.click();
        }
      },
    }
  }
</script>
<style scoped lang="less">
  .root {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
  }

  .image_title {
    width: 150px;
    text-align: right;
    margin-right: 10px;
    float: left;
  }

  .root_content {
    cursor: pointer;
    border-radius: 5px;
  }

  .root_content > .show {
    border: 1px #2d6da3 solid;
    border-radius: 5px;
  }

  .root_content {
    .upload_icon {
      width: 30px;
      height: 30px;
    }
  }

  input {
    display: none;
  }
</style>
