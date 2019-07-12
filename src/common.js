import {functions} from "./function";
import {api} from "./api";

export const common = {
  install: function (Vue) {
    //项目访问前缀
    Vue.prototype.homeUrl = functions.apiUrl;
    //项目访问前缀
    Vue.prototype.imgUrl = functions.imgUrl;
    //项目访问前缀
    Vue.prototype.uploadPath = functions.uploadPath;
    //默认显示图片路径
    Vue.prototype.defaultImg = require('./assets/images/common/404.png');
    //判断参数是否为空或者undefined
    Vue.prototype.isEmpty = functions.isEmpty;
    //Axios的post请求的再封装
    Vue.prototype.post = functions.post;
    //Axios的get请求的再封装
    Vue.prototype.postStream = functions.postStream;
    //ajax请求封装
    Vue.prototype.ajaxFileUpload = functions.ajaxFileUpload;
    //请求成功的回调
    Vue.prototype.doSuccess = functions.doSuccess;
    //请求失败的回调
    Vue.prototype.doError = functions.doError;
    //弹出输入框
    Vue.prototype.prompt = functions.prompt;
    //弹出确认框
    Vue.prototype.confirm = functions.confirm;
    //随机生成指定长度的字符串
    Vue.prototype.randomString = functions.randomString;
    //获取当前时间
    Vue.prototype.getCurrentTime = functions.getCurrentTime;
    //表单验证
    Vue.prototype.validate = functions.validate;
    //图片压缩
    Vue.prototype.photoCompress = functions.photoCompress;
    //遮罩开启
    Vue.prototype.loading = functions.loading;
    //遮罩关闭
    Vue.prototype.loadingClose = functions.loadingClose;
    //接口url
    Vue.prototype.api = api;
    /**
     * 自定义指令自动获得焦点
     */
    Vue.directive('focus', {
      inserted: (el) => {
        el.focus();
      }
    })
    Vue.prototype.validator = {
      mobile: (rule, value, callback) => {
        if (isEmpty(value)) {
          callback();
        } else if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('手机号格式错误'));
        } else {
          callback();
        }
      },
      float: (rule, value, callback) => {
        if (isNaN(parseFloat(value))) {
          callback(new Error('请输入合法数字'));
        } else {
          callback();
        }
      },
      number: (rule, value, callback) => {
        if (isEmpty(value)) {
          callback();
        }
        if (isNaN(parseInt(value))) {
          callback(new Error('请输入合法数字'));
        } else {
          callback();
        }
      }
    }
  }
};
/**
 * 列表组件通用属性
 */
export const list = {
  data() {
    return {
      baseData: [],//表格组件配置
      dataSource: [],//表格数据源
      toolData: [],//顶部工具栏配置
      checked: '',//多选框选中值（逗号分隔）
      params: {//表格数据源请求接口参数对象
        page: 1,//第几页
        limit: 10,//每页取多少条
      },
      total: 0,//总共多少条数据
      title: decodeURIComponent(this.$route.params.title),//当前页标题
      level: this.isEmpty(this.$route.params.level) ? 1 : this.$route.params.level,//多级页面，当前层级
    }
  },
  methods: {
    /**
     * 表格搜索框值改变
     * @param key 改变的字段
     * @param value 改变的值
     */
    paramsChange(key, value) {
      this.params[key] = value;
    },
    /**
     * 跳转到指定页
     * @param page 指定页
     */
    goPage(page) {
      this.params.page = page;
      this.getData(this.params.page);
    },
    /**
     * 每页显示数量更改
     * @param size 每页显示数量
     */
    sizeChange(size) {
      this.params.limit = size;
      this.getData(1);
    },
    /**
     * 复选框改变时触发
     * @param checked 选中键数组
     */
    check(checked) {
      this.checked = checked.join(',');
    }
  }
};
/**
 * 详情组件通用属性
 */
export const detail = {
  data() {
    return {
      baseData: [],//详情组件配置
      dataSource: {}//详情数据源
    }
  },
  methods: {
    /**
     * 详情组件值改变
     * @param key 改变的字段
     * @param value 改变的值
     */
    change(key, value) {
      this.dataSource[key] = value;
    },
  }
};
