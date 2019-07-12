<template>
  <div class="top_root theme">
    <div class="top_left">
      <p>后台模板</p>
    </div>
    <div class="top_right box_center">
      <p class="username" @click="userInfo">{{systemAccount.username}}</p>
      <img class="icon" :src="homeUrl+systemAccount.headImg" @error="imgError">
      <img class="icon" :src="require('../../assets/icon/exit.png')" @click="exit">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        systemAccount: this.$store.getters.systemAccount,
        mouse: false
      }
    },
    methods: {
      imgError(e) {
        e.target.src = this.defaultImg;
      },
      userInfo() {
        this.$router.push('/user_info');
      },
      exit() {
        sessionStorage.clear();
        this.$router.push('/login');
      }
    }
  }
</script>
<style scoped lang="less">
  .top_root {
    box-shadow: 30px 5px 30px #409EFF;
    height: 40px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    p{
      color: #fff;
      line-height: 40px;
    }
    .top_left {
      float: left;
      >p{
        margin-left: 50px;
      }
    }
    .top_right {
      display: flex;
      float: right;
      margin-right: 30px;
      >img:nth-child(2) {
        width: 25px;
        height: 25px;
        border-radius: 15px;
        margin: 0 10px;
      }
      >img:nth-child(3) {
        width: 25px;
        height: 25px;
        border-radius: 15px;
      }
      .username{
        cursor: pointer;
      }
    }
  }
</style>
