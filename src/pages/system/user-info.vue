<template>
  <div class="editor_root">
    <bread title="用户信息"/>
    <detail :baseData="baseData" v-bind="$data" @change="change"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import {detail} from '../../common'

  export default {
    mixins: [detail],
    data() {
      return {
        toolData: [{name: '保存'}],
        dataSource: this.$store.getters.systemAccount,
      }
    },
    created() {
      this.baseData = [
        {key: 'username', name: '账号', disable: true},
        {key: 'password', name: '密码', type: 'password'},
        {key: 'email', name: '邮箱'},
        {key: 'phone', name: '电话'},
        {key: 'headImg', name: '头像', type: 'img', path: '/images/account/headImg'}
      ];
    },
    methods: {
      toolClick(index) {
        switch (index) {
          case 0:
            if (this.isEmpty(this.dataSource.phone)) {
              this.$message.error('手机号不能为空');
              return;
            }
            if (!/^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/.test(this.dataSource.phone)) {
              this.$message.error('手机号不合法');
              return;
            }
            let params = {};
            params.password = this.dataSource.password;
            params.email = this.dataSource.email;
            params.phone = this.dataSource.phone;
            params.headImg = this.dataSource.headImg;
            params.accountId = this.dataSource.accountId;
            this.post(this.api.updateSystemAccount, params, (data) => {
              this.$message.success('保存成功');
              sessionStorage.systemAccount = JSON.stringify(data);
              this.$store.commit('systemAccount', data);
              this.$router.back();
            });
            break;
          case 1:
            this.$router.back();
            break;
        }
      },
    }
  }
</script>
<style scoped>

</style>
