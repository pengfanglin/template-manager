<template>
  <div class="root"></div>
</template>

<script type="text/ecmascript-6">
  import Highcharts from 'highcharts/highstock';

  export default {
    props:{
      options:{
        type:Object,
        default:{}
      },
      styles:{
        type:Object,
        default:function () {
          return {width:'1200px',height:'600px'};
        }
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      Highcharts.setOptions({
        credits:{
          enabled: false // 禁用版权信息
        },
        lang:{
          contextButtonTitle:"图表导出菜单",
          decimalPoint:".",
          downloadJPEG:"下载JPEG图片",
          downloadPDF:"下载PDF文件",
          downloadPNG:"下载PNG文件",
          downloadSVG:"下载SVG文件",
          drillUpText:"返回 {series.name}",
          loading:"加载中",
          months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
          noData:"没有数据",
          numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
          printChart:"打印图表",
          resetZoom:"恢复缩放",
          resetZoomTitle:"恢复图表",
          shortMonths: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
          thousandsSep:",",
          weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
        }
      })
      this.initChart();
    },
    methods: {
      initChart() {
        this.$el.style.width = this.styles.width;
        this.$el.style.height =this.styles.height;
        this.chart = Highcharts.chart(this.$el, this.options);
      }
    },
    watch:{
      options(){
        this.initChart();
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
