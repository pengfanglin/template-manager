<template>
  <div class="root box_start" v-if="!hide">
    <p :class="isEmpty(title)?'':'title'">{{title}}</p>
    <el-cascader
      expand-trigger="hover"
      :options="dataSource"
      clearable
      v-model="text"
      @change="change"
      :props="props"
      :placeholder="placeholder"
      :style="options"
      :size="size"
      :change-on-select="changeOnSelect"
    ></el-cascader>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 多级选择组件
   * title:组件左侧显示的文字
   * dataSource:数据源
   * selectValue：选择后取值的字段
   * shoeValue：选择后显示值的字段
   * disable:为true时组件禁用
   * initValue：初始值
   * childName：多层级选择的时候子数据源字段名
   * filed:组件所属表单的字段名
   * result:返回值类型  one：只返回最后一次选择的值  many：将多次选择的值用-拼接返回
   * join:多个返回值的拼接字符，默认-
   * hide：为true是隐藏组件
   * tip：输入框默认提示文本
   */
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      dataSource: {
        type: Array,
        default: []
      },
      selectValue: {
        type: String,
        default: 'value'
      },
      showValue: {
        type: String,
        default: 'label'
      },
      disable: {
        type: Boolean,
        default: false
      },
      value: {
        type: null,
        default: ''
      },
      childName: {
        type: String,
        default: 'dataSource'
      },
      join: {
        type: String,
        default: '-'
      },
      param: {
        type: String,
        default: 'many'
      },
      result: {
        type: String,
        default: 'many'
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
        default: '请选择'
      },
      size: {
        type: String,
        default: 'medium'
      },
      changeOnSelect: {
        type: Boolean,
        default: true
      },
      paramType: {
        type: String,
        default: 'string'
      }
    },
    data() {
      return {
        text: [],
        tempValue: [],
        find: false,
        props: {
          value: this.selectValue,
          label: this.showValue,
          children: this.childName,
          disabled:'disable'
        }
      }
    },
    watch:{
      dataSource(){
        this.reload();
      },
      value(){
        if (this.paramType === 'number') {
          this.text = this.value.split(this.join).map(Number);
        }else{
          this.text = this.value.split(this.join);
        }
      }
    },
    methods: {
      reload() {
        this.clearNullChildArray(this.dataSource);
      },
      change(value) {
        this.$emit('input', this.filed, value.join(this.join));
      },
      //将级联菜单中空的数据数组删除
      clearNullChildArray(array) {
        if (array.constructor === Object) {
          for (let i in array) {
            if (array[i].constructor === Array && array[i].length > 0) {
              this.clearNullChildArray(array[i]);
            } else if (array[i].constructor === Array && array[i].length === 0) {
              delete array[i];
            }
          }
        } else if (array.constructor === Array) {
          for (let i in array) {
            if (array[i].constructor === Object) {
              this.clearNullChildArray(array[i]);
            } else if (array[i].constructor === Array && array[i].length === 0) {
              delete array[i];
            }
          }
        }
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
