<template>
  <div class="root box_start" v-if="!hide">
    <p :class="isEmpty(title)?'':'title'">{{title}}</p>
    <el-input
      v-model="tempValue"
      @change="(val)=>$emit('input',val)"
      clearable
      :type="type"
      :placeholder="placeholder" :disabled="disable"
      :maxlength="type==='text'?max:100"
      :style="options"
      :size="size"
    ></el-input>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 文本框组件
   * type:文本框类型 textarea：文本域 text:文本框
   * title:组件左侧显示的文字
   * value：组件的初始值
   * disable:为true时禁用组件
   * options:对象，定义文本框css属性：{'width':'200px','height':'60px'}
   * hide：为true时隐藏
   * placeholder:文本框的默认提示内容（输入内容后自动消失）
   * max:最大输入长度
   * size:组件大小
   */
  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: null,
        default: ''
      },
      disable: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: function () {
          return {width:'250px'};
        }
      },
      hide: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      max: {
        type: Number,
        default: 50
      },
      size: {
        type: String,
        default: 'medium'
      }
    },
    data() {
      return {
        tempValue: this.value
      }
    },
    watch:{
      value(){
        this.tempValue=this.value;
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
</style>
