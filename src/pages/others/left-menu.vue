<template>
  <el-menu ref="menu" :default-active="defaultModuleId" background-color="#545c64" text-color="#fff"
           active-text-color="#ffd04b" @open="open" @select="menuClick" :unique-opened="true">
    <el-submenu :index="parentIndex+''" v-for="(parent,parentIndex) in systemModules" @select="menuClick($event)"
                :key="Math.random()">
      <template slot="title">
        <span>{{parent.moduleName}}</span>
      </template>
      <el-menu-item :index="parentIndex+','+childIndex" v-for="(child,childIndex) in parent.systemModules"
                    :key="Math.random()" :href="child.moduleUrl">{{child.moduleName}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        systemModules: [],
        defaultModuleId: this.isEmpty(sessionStorage.defaultModuleId) ? '0,0' : sessionStorage.defaultModuleId
      }
    },
    mounted() {
      this.post(this.api.leftMenuTree, {accountId: this.$store.getters.systemAccount.accountId}, (data) => {
        this.systemModules = data;
        let leftMenuList = [];
        data.forEach((parent) => {
          parent.systemModules.forEach((child) => {
            leftMenuList.push(child.moduleUrl);
          })
        });
        sessionStorage.leftMenuTree = JSON.stringify(leftMenuList);
        this.$store.commit('leftMenuList', data);
        if (!this.isEmpty(data) && !this.isEmpty(data[0].systemModules)) {
          let ids = this.defaultModuleId.split(',');
          this.$router.push(data[ids[0]].systemModules[ids[1]].moduleUrl);
        }
      });
    },
    methods: {
      open(index) {
        this.systemModules.forEach((item, parentIndex) => {
          if (parentIndex === parseInt(index)) {
            this.defaultModuleId = parentIndex + ',0';
            this.$router.push(item.systemModules[0].moduleUrl);
          }
        });
      },
      menuClick(index, path, e) {
        this.defaultModuleId = index;
        this.$router.push(e.$attrs.href);
      }
    },
    watch: {
      defaultModuleId() {
        sessionStorage.defaultModuleId = this.defaultModuleId;
      },
      $route(to) {
        let ids = this.defaultModuleId.split(',');
        if (to.path !== this.systemModules[ids[0]].systemModules[ids[1]].moduleUrl) {
          this.systemModules.forEach((parent, parentIndex) => {
            parent.systemModules.forEach((child, childIndex) => {
              if (child.moduleUrl === to.path) {
                this.defaultModuleId = parentIndex + ',' + childIndex;
              }
            })
          })
        }
      }
    }
  }
</script>
<style scoped>

</style>
