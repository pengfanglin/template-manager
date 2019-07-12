<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 10px">
    <el-breadcrumb-item :to="{ path:item.path}" v-for="item in titles" :key="Math.random()">{{item.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    props: {
      title:{
        type:String,
        default:'返回'
      }
    },
    data(){
      return{
        titles:[]
      }
    },
    watch:{
      title(){
        this.addTitle();
      }
    },
    mounted(){
      this.addTitle();
    },
    methods:{
      go(index){
        this.$router.go(-(this.titles.length-index-1));
      },
      addTitle(){
        let titles=[];
        if(!this.isEmpty(sessionStorage.titles)){
          titles=JSON.parse(sessionStorage.titles);
        }
        let titleIndex=-1;
        titles.forEach((item,index)=>{
          if(this.$route.path===item.path){
            titleIndex=index;
          }
        });
        if(titleIndex<0){
          titles.push({
            title:this.title,
            path:this.$route.path
          });
          sessionStorage.titles=JSON.stringify(titles);
        }else{
          if(titles.length-titleIndex-1>0){
            titles.splice(titleIndex+1,titles.length-titleIndex-1);
            sessionStorage.titles=JSON.stringify(titles);
          }
        }
        this.titles=titles;
      }
    }
  }
</script>

<style scoped lang="less">

</style>
