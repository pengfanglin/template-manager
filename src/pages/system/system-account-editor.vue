<template>
  <div>
    <bread title="系统账号编辑"/>
    <div class="editor_root box_center">
      <my-image init-value="/images/others/head.jpg"/>
      <el-form ref="form" :rules="rules" :model="systemAccount" label-width="80px" style="width:40%;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="systemAccount.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="$route.params.accountId==='0'">
          <el-input v-model="systemAccount.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="systemAccount.isDisable">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button round type="primary" @click="toolClick(0)">确定</el-button>
          <el-button round @click="$router.back();">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        toolData: [{name: '确定'}],
        systemAccount: {
          isDisable: '0'
        },
        dialogVisible: false,
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          email: [
            {type: 'email', required: true, message: '请输入邮箱地址', trigger: 'change'},
            {min: 1, max: 20, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'change'},
            {validator: this.validator.mobile, trigger: 'blur'},
            {length: 11, message: '长度为11个字符', trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请选择角色', trigger: 'change'},
          ]
        }
      }
    },
    created() {
      if (this.$route.params.accountId !== '0') {
        this.post(this.api.getSystemAccountDetail, {accountId: this.$route.params.accountId}, (data) => {
          this.systemAccount = data;
        });
      }
    },
    methods: {
      imgError(e) {
        e.target.src = this.defaultImg;
      },
      toolClick(index) {
        switch (index) {
          case 0:
            this.$refs.form.validate(valid => {
              if (valid) {
                let params = {};
                params.username = this.systemAccount.username;
                params.email = this.systemAccount.email;
                params.phone = this.systemAccount.phone;
                params.isDisable = this.systemAccount.isDisable;
                params.headImg = this.systemAccount.headImg;
                if (this.isEmpty(this.systemAccount.accountId)) {
                  params.password = this.systemAccount.password;
                  this.post(this.api.insertSystemAccount, params, () => {
                    this.$message.success('保存成功');
                    this.$router.back();
                  });
                } else {
                  params.accountId = this.systemAccount.accountId;
                  this.post(this.api.updateSystemAccount, params, () => {
                    this.$message.success('保存成功');
                    this.$router.back();
                  });
                }
              }
            });
            break;
        }
      },
    }
  }
</script>
<style scoped lang="less">
</style>
