<template>
  <div class="root" v-if="!hide">
    <div class="splitter box_center">
      <p>{{header}}</p>
    </div>
    <div class="image-content">
      <div class="image-child" v-for="(src,index) in images" v-if="!isEmpty(src)">
        <img :src="buildSrc(src)" @error="imgError" :style="options"
             @click="changeBig(src)">
        <el-button type="danger" @click="removeImg(index)" v-if="!disable" size="mini"
                   style="width:50px;margin-top:10px;">删除
        </el-button>
      </div>
      <div class="image-child" v-if="!disable&&images.length<max">
        <img :src="require('../../assets/images/common/add.jpg')" @click="beginUp" @error="imgError"
             :style="options">
        <input type="file" ref="fileInput" name="file" @change="uploadImage" multiple="multiple"
               accept="image/png,image/jpg,image/jpeg,image/gif">
      </div>
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
   * options:自定义组件宽度高度，默认：'width:200px;height:600px;'
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
      header: {
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
          width:'100px',
          height:'100px'
        }
      },
      hide: {
        type: Boolean,
        default: false
      },
      not_hover: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: 3
      }
    },
    data() {
      return {
        images: !this.isEmpty(this.initValue) ? this.initValue.split(',') : [],
        isClick: false,
        src: '',
        okNumber: 0
      }
    },
    watch: {
      initValue() {
        this.images = !this.isEmpty(this.initValue) ? this.initValue.split(',') : [];
      },
      images() {
        this.$emit('change', this.filed, this.images.join(','));
      }
    },
    methods: {
      uploadImage(e) {
        let formData = new FormData();
        formData.append("path", this.isEmpty(this.path) ? '' : this.path);
        let length = this.max;
        if (e.target.files.length < length) {
          length = e.target.files.length;
        }
        for (let i = 0; i < length; i++) {
          if (e.target.files[i].type.indexOf('image')>-1) {
            this.photoCompress(e.target.files[i], {
                quality: 0.2
              }, (base64Codes) => {
                formData.append(e.target.name, base64Codes, e.target.value);
                this.okNumber++;
                if (this.okNumber === length) {
                  this.ajaxFileUpload(1, formData);
                }
              }
            )
          } else {
            formData.append(e.target.name, e.target.files[i], e.target.value);
            this.okNumber++;
            if (this.okNumber === length) {
              this.ajaxFileUpload(1, formData);
            }
          }
        }
      },
      doSuccess(index, data) {
        this.$message.success("上传成功");
        this.okNumber = 0;
        this.images = this.images.concat(data);
        this.$emit('change', this.filed, this.images.join(','));
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
      removeImg(id) {
        let temp = [];
        this.images.forEach((item, index) => {
          if (index !== id) {
            temp.push(item);
          }
        });
        this.images = temp;
      },
      buildSrc(src) {
        if (src.indexOf('.jpg') === -1 && src.indexOf('.png') === -1 && src.indexOf('.jpeg') === -1 && src.indexOf('.gif') === -1) {
          return this.homeUrl + '/images/common/file_default_img.jpg';
        } else {
          return this.homeUrl + src;
        }
      },
      changeBig(src) {
        if (this.not_hover) {
          this.beginUp();
        }
        this.src = src;
        this.isClick = !this.isClick;
      },
      changeSmall(e) {
        this.isClick = !this.isClick;
      }
    }
  }
</script>
<style scoped lang="less">
  .root {
    display: flex;
    justify-content: flex-start;
    margin: 10px;
    padding: 10px 0;
    box-shadow: 0 2px 2px 1px rgba(0, 0, 0, .06), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .splitter {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    width: 150px;
    font-size: 16px;
    p {

    }
    img {
      margin-left: 10px;
      width: 25px;
      height: 25px;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .image-content {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 10px;
  }

  .image-child {
    cursor: pointer;
    border-radius: 5px;
    margin: 5px;
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    text-align: center;
    > a {
      margin-bottom: 5px;
    }
  }

  .image-child img {
    border: 1px #e2e2e2 solid;
    border-radius: 5px;
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
  input {
    display: none;
  }
</style>
