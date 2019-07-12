<template>
  <el-container>
    <el-header height="40px">
      <top class="top"/>
    </el-header>
    <el-container>
      <el-aside width="200px" class="left_content">
        <left-menu/>
      </el-aside>
      <el-main class="right_content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script type="text/ecmascript-6">
  import LeftMenu from './left-menu.vue'
  import Top from './top.vue'
  export default {
    components: {
      LeftMenu,Top
    }
  }
</script>
<style>
  .el-container{
    width:100%;
    height:100%;
  }
  .el-main{
    padding:0;
  }
  .el-aside{
    height:100%;
    background: #545c64;
  }
  .el-aside::-webkit-scrollbar {
    display:none
  }
  .right_content{
    padding:20px 10px 0 10px;
  }
</style>
