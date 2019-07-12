<template>
  <div class="root">
    <bread title="系统账号"/>
    <div class="search_content">
      <my-input title="账号" v-model="params.username"></my-input>
      <my-select title="状态" v-model="params.disable" :dataSource="states"/>
    </div>
    <toolbar :toolData="toolData" @toolClick="toolClick"/>
    <list v-bind="$data" @operationClick="operationClick" @check="check" @goPage="goPage" @sizeChange="sizeChange"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import {list} from '../../common'

  export default {
    mixins: [list],
    data() {
      return {
        states: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '正常',
            value: '0'
          },
          {
            label: '禁用',
            value: '1'
          }
        ],
        toolData: [{name: '搜索'}, {name: '添加'}]
      }
    },
    created() {
      this.getData(1);
      this.baseData = [
        {key: 'accountId', name: 'ID'},
        {key: 'username', name: '用户名'},
        {key: 'isDisableShow', name: '状态'},
        {key: 'headImg', name: '头像', type: 'img'},
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
        this.post(this.api.getSystemAccountList, this.params, (data) => {
          this.dataSource = data.data;
          this.total = data.total;
        });
      },
      operationClick(index, rowId) {
        switch (index) {
          case 0:
            this.$router.push('/system_account_editor/' + this.dataSource[rowId].accountId);
            break;
          case 1:
            this.post(this.api.deleteSystemAccount, {accountId: this.dataSource[rowId].accountId}, (data) => {
              this.$message.success('删除成功');
              this.getData();
            });
            break;
        }
      },
      toolClick(index) {
        switch (index) {
          case 0:
            this.getData(1);
            break;
          case 1:
            this.$router.push('/system_account_editor/' + 0);
            break;
        }
      }
    }
  }
</script>
<style scoped>

</style>
