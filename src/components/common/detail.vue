<template>
  <div class="list_root">
    <div class="splitter">
      <p>{{header}}</p>
    </div>
    <div class="detail_content">
      <div v-for="(base,index) in baseData" class="list_detail" v-if="!base.hide">
        <my-image v-if="base.type==='img'" v-model="dataSource[base.key]" :title="base.name" v-bind="base" :options="{width:'60px',height:'60px'}" type="image"></my-image>
        <my-video v-else-if="base.type==='video'" v-model="dataSource[base.key]" :title="base.name" v-bind="base"></my-video>
        <my-audio v-else-if="base.type==='audio'" v-model="dataSource[base.key]" :title="base.name" v-bind="base"></my-audio>
        <my-select v-else-if="base.type==='select'" v-model="dataSource[base.key]" :title="base.name" :dataSource="base.dataSource" v-bind="base"></my-select>
        <check-box v-else-if="base.type==='check'" v-model="dataSource[base.key]" :title="base.name" :dataSource="base.dataSource" v-bind="base"></check-box>
        <level v-else-if="base.type==='level'" v-model="dataSource[base.key]" :title="base.name" :dataSource="base.dataSource" v-bind="base"></level>
        <my-date v-else-if="base.type==='date'||base.type==='datetime'" v-model="dataSource[base.key]" :title="base.name" :type="base.type" v-bind="base"></my-date>
        <my-input v-else v-model="dataSource[base.key]" :title="base.name" :type="base.type" v-bind="base"></my-input>
      </div>
    </div>
    <div class="operation_root">
      <el-button :type="isEmpty(item.type)?'primary':item.type" v-for="(item,index) in toolDataComputed" v-if="!item.hide" @click="toolClick(index)" :key="index" class="operation_button" round>{{item.name}}</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 详情组件（遍历对象属性，生成表单，三等分）
   * baseData中type的类型包含：img：图片 select:下拉框 search：搜索框 level:多层级选择器 date:日期选择器
   *    datetime：时间选择器 textarea：文本域 input：文本输入框 text：只读文本框（相当于禁用组件）
   * baseData:组件遍历的模板
   * dataSource:组件遍历的数据源
   * header:顶部标题栏的文字，默认不显示标题栏
   */
  export default {
    props:{
      baseData:{
        type:Array,
        default:function () {
          return [];
        }
      },
      dataSource:{
        type:Object,
        default:function () {
          return {};
        }
      },
      header:{
        type:String,
        default:''
      },
      toolData:{
        type:Array,
        default:function () {
          return [];
        }
      }
    },
    data() {
      return {
        toolDataComputed:[]
      }
    },
    created() {
      if(!this.isEmpty(this.toolData)){
        this.toolDataComputed=this.toolData.concat([{name:'返回'}]);
      }
    },
    methods:{
      toolClick(index){
        if(index===this.toolDataComputed.length-1){
          this.$router.back(-1);
        }else{
          this.$emit('toolClick',index);
        }
      }
    }
  }
</script>
<style scoped>
  .list_root{
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
  }
  .detail_content{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .list_detail{
    width:33%;
    margin:10px 0;
  }
  .operation_root{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding:20px 0;
  }
  .operation_button{
    margin: 0 10px;
  }
</style>
