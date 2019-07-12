<template>
  <div class="role_root">
    <bread title="角色列表"/>
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
        toolData: [{name: '添加'}]
      }
    },
    beforeMount() {
      this.getData(1);
      this.baseData = [
        {key: 'roleId', name: 'ID'},
        {key: 'roleName', name: '名称'},
        {key: 'createTime', name: '创建时间'},
        {
          name: '操作',
          type: 'operation',
          data: [
            {name: '详情'},
            {name: '删除', type: 'confirm', color: 'danger', message: '确定删除？'}
          ]
        },
      ];
    },
    methods: {
      getData(page) {
        this.params.page = page ? page : this.params.page;
        this.loading();
        this.post(this.api.getRoleList, this.params, (data) => {
          this.dataSource = data.data;
          this.total = data.total;
        });
      },
      operationClick(index, rowId) {
        switch (index) {
          case 0:
            this.$router.push('/role_editor/' + this.dataSource[rowId].roleId);
            break;
          case 1:
            this.post(this.api.deleteRole, {roleId: this.dataSource[rowId].roleId}, () => {
              this.$message.success('删除成功');
              this.getData(this.page);
            });
            break;
        }
      },
      toolClick(index) {
        switch (index) {
          case 0:
            this.$router.push('/role_editor/' + 0);
            break;
        }
      }
    }
  }
</script>
<style scoped>

</style>
