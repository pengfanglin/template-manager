/**
 *作者：彭方林
 */
import MyDate from './common/my-date'
import Detail from './common/detail'
import MyInput from './common/my-input'
import MyLevel from './common/my-level'
import List from './common/list'
import MyImage from './common/my-image'
import MySelect from './common/my-select'
import Toolbar from './common/toolbar'
import WangEditor from './common/wang-editor'
import MyVideo from './common/my-video'
import CheckBox from './common/checkbox'
import MyImages from './common/my-images'
import MyAudio from './common/my-audio'
import Highcharts from './common/highcharts'
import Bread from './common/bread'

const lin={
  install:function(Vue){
    Vue.component('MyDate',MyDate);
    Vue.component('Detail',Detail);
    Vue.component('MyInput',MyInput);
    Vue.component('MyLevel',MyLevel);
    Vue.component('List',List);
    Vue.component('MyImage',MyImage);
    Vue.component('MySelect',MySelect);
    Vue.component('Toolbar',Toolbar);
    Vue.component('WangEditor',WangEditor);
    Vue.component('MyVideo',MyVideo);
    Vue.component('CheckBox',CheckBox);
    Vue.component('MyImages',MyImages);
    Vue.component('MyAudio',MyAudio);
    Vue.component('Highcharts',Highcharts);
    Vue.component('Bread',Bread);
  }
}
export default lin;
