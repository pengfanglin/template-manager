<template>
  <div class="root box_start" v-if="!hide">
    <p :class="isEmpty(title)?'':'title'">{{title}}</p>
    <el-date-picker
      v-model="tempValue"
      @change="(val)=>$emit('input',val)"
      :type="type"
      :placeholder="placeholder"
      :disabled="disable"
      :style="options"
      :size="size"
      value-format="yyyy-MM-dd HH:mm:ss"
    ></el-date-picker>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 日期时间组件
   * type:组件类型 date：日期选择器 datetime：日期时间选择器
   * title:组件左边的文字
   * value:初始值
   * disable:为true的时候会被禁用
   * hide:为true的时候隐藏组件
   * placeholder:默认提示文字
   */
  export default {
    props:{
      type:{
        type:String,
        default:'datetime'
      },
      title:{
        type:String,
        default:''
      },
      value:{
        type:String,
        default:''
      },
      disable:{
        type:Boolean,
        default:false
      },
      hide:{
        type:Boolean,
        default:false
      },
      placeholder:{
        type:String,
        default:''
      },
      options: {
        type: Object,
        default: function () {
          return {width:'250px'};
        }
      },
      size:{
        type:String,
        default:'medium'
      }
    },
    data () {
      return {
        tempValue:this.value
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
