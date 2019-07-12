<template>
  <div class="list_root">
    <div class="splitter">
      <p>{{header}}</p>
    </div>
    <el-table
      class="el-table"
      :data="dataSource"
      :stripe="true"
      :border="true"
      size="small"
      :header-cell-style="tableHeaderColor"
      @select="select"
      @select-all="selectAll"
      style="width: 100%">
      <el-table-column
        v-if="!isEmpty(checkKey)"
        type="selection"
        width="40"></el-table-column>
      <el-table-column
        align="center"
        v-for="(base,column) in baseData"
        :min-width="column===baseData.length-1?'100px':''"
        v-if="isEmpty(base.hide)||base.hide===false"
        :key="Math.random()"
        :label="base.name">
        <template slot-scope="scope">
          <div v-if="base.type==='img'" class="box_center">
            <img class="img"
                 :src="isEmpty(scope.row[base.key])?homeUrl+defaultImg:scope.row[base.key].indexOf('http')>-1?scope.row[base.key]:(homeUrl+scope.row[base.key])"
                 @click="changeBig(scope.$index,$event)" @error="imgError">
          </div>
          <div v-else-if="base.type==='operation'" class="box_center">
            <el-button
              :key="Math.random()"
              v-for="(operation,index) in base.data"
              v-if="!operation.hide"
              size="mini"
              :type="isEmpty(operation.color)?'':operation.color"
              @click="operationClick(index,scope.$index,base.data)">{{operation.name}}</el-button>
          </div>
          <h1 v-else>{{scope.row[base.key]}}</h1>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="showPage!==false"
      class="page"
      @size-change="sizeChange"
      @current-change="goPage"
      :current-page="params.page"
      :page-sizes="[2,10,50,100,200,500]"
      :page-size="params.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :background="true"
      :pager-count="15"></el-pagination>
    <img v-if="showImgRowId!==-1" :src="src.indexOf('http')>-1?src:(homeUrl+src)" @click="changeSmall" @error="imgError" class="img_click">
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 列表遍历组件
   * baseData:组件遍历模板
   * dataSource：数据源
   * operationData:右侧操作栏遍历模板
   * total：总共多少条结果，分页用
   * page:当前第几页
   * header:顶部标题栏文本，默认不显示
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
        type:Array,
        default:function () {
          return [];
        }
      },
      params:{
        type:Object,
        default:{
          page:1,
          limit:10
        }
      },
      total:{
        type:Number,
        default:0
      },
      textColor:{
        type:String,
        default:'#666'
      },
      header:{
        type:String,
        default:''
      },
      checkKey:{
        type:String,
        default:''
      },
      showPage:{
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        checked:[],
        allCheck:false,
        rowId:0,
        showImgRowId:-1,
        src:'',
        imgFiled:''
      }
    },
    methods:{
      tableHeaderColor({row, column, rowIndex}){
        if (rowIndex === 0) {
          return 'background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(64,158,255, 0.8)), to(rgba(108, 191, 255, 0.9)));color:#fff;'
        }
      },
      operationClick(index,rowId,data){
        if(data[index].type==='confirm'){
          this.confirm('提示',data[index].message,(select)=>{
            if(select){
              this.$emit('operationClick',index,rowId);
            }
          },'warning');
        }else if(data[index].type==='prompt'){
          this.prompt('提示',data[index].message,(select,val)=>{
            if(select){
              this.$emit('operationClick',index,rowId,val);
            }
          },data[index].pattern,data[index].errorMessage);
        }else{
          this.$emit('operationClick',index,rowId);
        }
      },
      goPage(page){
        this.$emit('goPage',page);
      },
      sizeChange(size){
        this.$emit('sizeChange',size);
      },
      imgError(e){
        e.target.src=this.defaultImg;
      },
      change(rowId,filed,event){
        this.$emit('change',rowId,filed,event.target.value);
      },
      uploadImage(rowId,filed,path,e) {
        this.rowId=rowId;
        this.imgFiled=filed;
        let formData = new FormData();
        formData.append("path", this.isEmpty(this.path)?'':this.path);
        if(e.target.value.indexOf('.jpg')>-1||e.target.value.indexOf('.jpeg')>-1||e.target.value.indexOf('.png')>-1||e.target.value.indexOf('.gif')>-1){
          this.photoCompress(e.target.files[0], {
              quality: 0.2
            },(base64Codes)=>{
              formData.append(e.target.value, base64Codes,e.target.value);
              this.ajaxFileUpload(1, formData);
            }
          )
        }else{
          formData.append(e.target.value, e.target.files[0],e.target.value);
          this.ajaxFileUpload(1, formData);
        }
      },
      doSuccess(rowId, data) {
        this.$message.success("上传成功");
        this.$emit('change',this.rowId,this.imgFiled,data[0]);
      },
      doFailed(index, error) {
        this.$message.error(error);
      },
      beginUp(rowId){
        this.$refs.fileInput[rowId].click();
      },
      changeBig(showImgRowId,e){
        this.showImgRowId=showImgRowId;
        this.src=e.target.src;
      },
      changeSmall(e){
       this.showImgRowId=-1;
      },
      select(selection, row){
        let checked=[];
        selection.forEach(item=>{
          checked.push(item[this.checkKey]);
        })
        this.$emit('check',checked);
      },
      selectAll(selection){
        let checked=[];
        selection.forEach(item=>{
          checked.push(item[this.checkKey]);
        })
        this.$emit('check',checked);
      }
    }
  }
</script>
<style scoped lang="less">
  .el-table{
    border-radius:10px;
  }
  .list_root {
    display: flex;
    flex-flow: column nowrap;
    align-content: center;
    border-left: 1px #f1f1f1 solid;
  }
  .splitter{
    margin-bottom: 5px;
  }
 .img{
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .img_click{
    width:800px;
    height:800px;
    border:1px #ccc solid;
    border-radius: 5px;
    position: fixed;
    z-index: 4;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .page{
    text-align: center;
    margin-top:10px;
  }
</style>
