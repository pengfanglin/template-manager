<template>
  <div class="root box_start" v-if="!hide">
    <p :class="isEmpty(title)?'':'title'">{{title}}</p>
    <div class="select_content" :style="options">
      <label v-for="item in dataSource">
        <input type="checkbox" :value="item.value" :disabled="disable||item.disable" v-model="check">{{item.key}}
      </label>
    </div>
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
        default: function () {
          return [];
        }
      },
      value: {
        type: String,
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
      disable: {
        type: Boolean,
        default: false
      },
      hide: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: function () {
          return {width:'250px'};
        }
      }
    },
    data() {
      return {
        check: !this.isEmpty(this.initValue) ? this.initValue.split(',') : []
      }
    },
    watch: {
      check() {
        this.$emit('input',this.check.join(','));
      },
      value(){
        this.check=!this.isEmpty(this.initValue) ? this.initValue.split(',') : []
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
  .select_content {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    label {
      input {
        margin-right: 5px;
      }
    }
  }
</style>
