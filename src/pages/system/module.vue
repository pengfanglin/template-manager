<template>
  <div class="module_root">
    <bread :title="title"/>
    <toolbar :toolData="toolData" @toolClick="toolClick"/>
    <list v-bind="$data" @operationClick="operationClick" @goPage="goPage" @sizeChange="sizeChange"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import {list} from '../../common'

  export default {
    mixins: [list],
    data() {
      return {
        toolData: [{name: '添加'}],
        parentId: this.isEmpty(this.$route.params.moduleId) ? 0 : this.$route.params.moduleId
      }
    },
    created() {
      this.getData(1);
      this.baseData = [
        {key: 'moduleId', name: 'ID'},
        {key: 'moduleName', name: '名称'},
        {key: 'sort', name: '权重'},
        {key: 'createTime', name: '创建时间'},
        {
          name: '操作',
          type: 'operation',
          data: [
            {name: '子模块'},
            {name: '详情'},
            {name: '删除', type: 'confirm', color: 'danger', message: '确定删除？'}
          ]
        },
      ];
      this.baseData[4].data[0].hide = this.level === '2';
    },
    watch: {
      $route(to, from) {
        if (to.path.split('/')[1] === from.path.split('/')[1]) {
          this.parentId = this.$route.params.moduleId;
          this.level = this.$route.params.level;
          this.baseData[4].data[0].hide = this.level === '2';
          this.params.page = 1;
          this.title = decodeURIComponent(this.$route.params.title);
          this.baseData[4].data[0].name = '子模块';
          this.getData(this.page);
        }
      }
    },
    methods: {
      getData(page) {
        this.params.page = page ? page : this.params.page;
        this.loading();
        this.params.parentId = this.parentId;
        this.post(this.api.getSystemModuleList, this.params, (data) => {
          this.dataSource = data.data;
          this.total = data.total;
        });
      },
      operationClick(index, rowId) {
        switch (index) {
          case 0:
            this.$router.push('/module/' + this.dataSource[rowId].moduleId + "/" + (++this.level) + "/" + encodeURIComponent(this.dataSource[rowId].moduleName));
            break;
          case 1:
            this.$router.push('/module_editor/' + this.dataSource[rowId].moduleId + '/' + this.parentId);
            break;
          case 2:
            this.post(this.api.deleteSystemModule, {moduleId: this.dataSource[rowId].moduleId}, () => {
              this.$message.success('删除成功');
              this.getData();
            });
            break;
        }
      },
      toolClick(index) {
        switch (index) {
          case 0:
            this.$router.push('/module_editor/' + 0 + "/" + this.parentId);
            break;
        }
      }
    }
  }
</script>
<style scoped>

</style>
