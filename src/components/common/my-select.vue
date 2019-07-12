<template>
  <div class="root box_start" v-if="!hide">
    <p :class="isEmpty(title)?'':'title'">{{title}}</p>
    <el-select
      v-model="tempValue"
      @change="(val)=>$emit('input',val)"
      :disabled="disable"
      :placeholder="placeholder"
      :filterable="filterable"
      :style="options"
      :size="size"
      :multiple="multiple">
      <el-option
        v-for="(item,index) in dataSource"
        :key="index"
        :label="item[showValue]"
        :value="item[selectValue]"
      ></el-option>
    </el-select>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 下拉选择框
   * dataSource：数据源
   * value:初始值
   * selectValue:选择时返回值从哪个字段取值
   * showValue：选择是显示值从哪个字段取值
   * title：组件左侧文本
   * disable:为true时禁用组件
   * hide：为true时隐藏组件
   */
  export default {
    props: {
      dataSource: {
        type: Array,
        default: []
      },
      value: {
        type: null,
        default: ''
      },
      selectValue: {
        type: String,
        default: 'value'
      },
      showValue: {
        type: String,
        default: 'label'
      },
      title: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: function () {
          return {width:'250px'};
        }
      },
      disable: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      hide: {
        type: Boolean,
        default: false
      },
      filterable: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'medium'
      },
      multiple:{
        type:Boolean,
        default:false
      }
    },
    data() {
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
