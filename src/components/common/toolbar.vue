<template>
  <div class="root box_start">
    <el-button type="primary" round :disabled="item.disable" size="small" v-for="(item,index) in toolData" v-if="!item.hide" @click="toolClick(index)" :key="Math.random()" class="operation_button">{{item.name}}</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 详情页工具栏
   * title：链接的显示文本
   * toolData：工具栏右侧按钮的遍历模板
   */
export default {
  props:[
    'toolData'
  ],
  data(){
    return{
    }
  },
  methods:{
    toolClick(index){
      this.$emit('toolClick',index);
    }
  },
}
</script>
<style scoped>
  .root{
    padding-left:20px;
    margin:5px 0;
  }
  .operation_button{
    margin-left: 10px;
  }
</style>
