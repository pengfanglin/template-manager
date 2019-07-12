import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
  systemAccount:{},
  load:{},
  webSocket:null,
  leftMenuList:[]
}
const getters={
  systemAccount(state){
    if(Object.keys(state.systemAccount).length===0&&sessionStorage.systemAccount!==undefined){
      state.systemAccount=JSON.parse(sessionStorage.systemAccount);
    }
    return state.systemAccount;
  },
  load(state){
    return state.load;
  },
  webSocket(state){
    return state.webSocket;
  },
  leftMenuList(state){
    if(Vue.prototype.isEmpty(state.leftMenuList)&&sessionStorage.leftMenuList!==undefined){
      state.leftMenuList=JSON.parse(sessionStorage.leftMenuList);
    }
    return state.leftMenuList;
  }
}
const mutations={
  systemAccount(state,systemAccount){
    state.systemAccount=systemAccount;
  },
  load(state,load){
    state.load=load;
  },
  webSocket(state,webSocket){
    state.webSocket=webSocket;
  },
  leftMenuList(state,leftMenuList){
    state.leftMenuList=leftMenuList;
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
});
