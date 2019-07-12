<template>
  <div class="editor_root">
    <bread title="模块详情"/>
    <detail :baseData="baseData" :dataSource="module" :toolData="toolData" @toolClick="toolClick"></detail>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {

    data() {
      return {
        module: {},
        toolData: [{name: '保存'}],
        parentId: this.$route.params.parentId
      }
    },
    created() {
      if (this.$route.params.moduleId !== '0') {
        this.post('system/getSystemModuleDetail', {moduleId: this.$route.params.moduleId}, (data) => {
          this.module = data;
        });
      }
      this.baseData = [
        {key: 'moduleName', name: '名称'},
        {key: 'moduleUrl', name: '路径'},
        {key: 'sort', name: '权重'}
      ];
      if (this.$route.params.parentId === '-1') {
        this.baseData[1].disable = true;
      }
    },
    methods: {
      toolClick(index) {
        switch (index) {
          case 0:
            let params = {};
            params.moduleName = this.module.moduleName;
            params.moduleUrl = this.module.moduleUrl;
            params.sort = this.module.sort;
            if (this.isEmpty(this.module.moduleId)) {
              params.parentId = this.parentId;
              this.post(this.api.insertSystemModule, params, () => {
                this.$message.success('保存成功');
                this.$router.back();
              });
            } else {
              params.moduleId = this.module.moduleId;
              this.post(this.api.updateSystemModule, params, () => {
                this.$message.success('保存成功');
                this.$router.back();
              });
            }
            break;
        }
      },
    }
  }
</script>
<style scoped>

</style>
