<template>
  <div class="role_root">
    <bread title="角色编辑"/>
    <toolbar :toolData="toolData" @toolClick="toolClick"></toolbar>
    <detail :baseData="baseData" :dataSource="role" @change="change" class="detail"></detail>
    <div v-for="parentModule in allModule" class="role_content">
      <div class="parent theme">
        <label>
          <input type="checkbox" :value="parentModule.moduleId" @change="parentChange(parentModule)"
                 v-model="myModule"/>
          <h1>{{parentModule.moduleName}}</h1>
        </label>
      </div>
      <div class="child-root">
        <div v-for="childModule in parentModule.systemModules" class="child">
          <label>
            <input type="checkbox" :value="childModule.moduleId" @change="childChange(parentModule,childModule)"
                   v-model="myModule"/>
            <h1>{{childModule.moduleName}}</h1>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {detail} from "../../common";

  export default {
    mixins: [detail],
    data() {
      return {
        role: {},
        myModule: [],
        allModule: [],
        selectModule: [],
        toolData: [{name: '保存'}]
      }
    },
    beforeMount() {
      if (this.$route.params.roleId !== '0') {
        this.post(this.api.getRoleDetail, {roleId: this.$route.params.roleId}, (data) => {
          this.role = data;
          if (!this.isEmpty(data.moduleIds)) {
            this.myModule = data.moduleIds.split(',').map((string) => {
              return parseInt(string);
            });
          }
        });
      }
      this.post(this.api.getSystemModuleTree, null, (data) => {
        this.allModule = data;
        //若父模块的任意一个子模块不存在于模块数组中，则将该父模块从数组中移除
        if (!this.isEmpty(data)) {
          data.forEach((parentModule) => {
            let temp = [];
            let flag = false;
            for (let index in parentModule.systemModules) {
              let childModuleId = parentModule.systemModules[index].moduleId;
              if (this.myModule.indexOf(childModuleId) === -1) {
                flag = true;
              }
            }
            if (flag) {
              this.myModule.forEach((item) => {
                if (parentModule.moduleId !== item && temp.indexOf(item) === -1) {
                  temp.push(item);
                }
              });
              this.myModule = temp;
            }
          })
        }
      });
      this.baseData = [
        {key: 'roleName', name: '角色名称'}
      ];
    },
    methods: {
      parentChange(parentModule) {
        //若模块数组中存在这个父模块id则将其所有的子模块id移除，否则将其所有的子模块id添加到模块数组中
        if (this.myModule.indexOf(parentModule.moduleId) === -1) {
          parentModule.systemModules.forEach((item) => {
            if (this.myModule.indexOf(item.moduleId) > -1) {
              this.myModule.splice(this.myModule.indexOf(item.moduleId), 1);
            }
          })
        } else {
          parentModule.systemModules.forEach((item) => {
            if (this.myModule.indexOf(item.moduleId) === -1) {
              this.myModule.push(item.moduleId);
            }
          })
        }
      },
      childChange(parentModule, childModule) {
        //如果模块数组中不存在这个子模块id，则把对应的父模块id从数组中移除
        if (this.myModule.indexOf(childModule.moduleId) === -1) {
          if (this.myModule.indexOf(parentModule.moduleId) > -1) {
            this.myModule.splice(this.myModule.indexOf(parentModule.moduleId), 1);
          }
        } else {
          //判断父模块的所有子模块是否都存在于模块数组中
          let allHave = true;
          parentModule.systemModules.forEach((item) => {
            if (this.myModule.indexOf(item.moduleId) === -1) {
              allHave = false;
            }
          });
          //如果当前父模块的所有子模块都存在数组中，则将父模块选中
          if (allHave) {
            if (this.myModule.indexOf(parentModule.moduleId) === -1) {
              this.myModule.push(parentModule.moduleId);
            }
          } else {
            if (this.myModule.indexOf(parentModule.moduleId) > -1) {
              this.myModule.splice(this.myModule.indexOf(parentModule.moduleId), 1);
            }
          }
        }
      },
      change(key, value) {
        this.role[key] = value;
      },
      toolClick(index) {
        switch (index) {
          case 0:
            //只要父模块中的任意一个子模块存在于数组中，则将该父模块添加到数组中
            this.allModule.forEach((parentModule) => {
              let childModules = parentModule.systemModules;
              for (let childIndex in childModules) {
                if (this.myModule.indexOf(childModules[childIndex].moduleId) > -1) {
                  if (this.myModule.indexOf(parentModule.moduleId) === -1) {
                    this.myModule.push(parentModule.moduleId);
                    break;
                  }
                }
              }
            })
            //将模块id数组,先升序排序，之后拼接成字符串
            this.role.moduleIds = this.myModule.sort((a, b) => {
              return a - b;
            }).join(',');
            if (this.isEmpty(this.role.roleId)) {
              this.post(this.api.insertRole, this.role);
            } else {
              this.post(this.api.updateRole, this.role);
            }
            break;
        }
      },
    }
  }
</script>
<style scoped lang="less">
  .parent {
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
    padding: 2px;

    h1 {
      color: #FFF;
    }
  }

  .child {
    display: inline-block;
    margin: 10px 0;
  }

  input {
    margin-left: 20px;
    cursor: pointer;
  }

  h1 {
    display: inline-block;
    cursor: pointer;
  }
</style>
