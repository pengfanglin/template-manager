<template>
<div class="layout_root">
  <router-view/>
</div>
</template>
<script type="text/ecmascript-6">
  export default {

  }
</script>
<style lang="less">
  html{
    height:100%;
  }
  body {
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 16px;
    color: #666;
    background: #eee;
    height:100%;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    font: inherit;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
    user-select: none;
  }
  .splitter{
    width:100%;
    text-align: center;
    color:#fff;
    border-radius: 5px;
    font-size: 20px;
    background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(64,158,255, 0.8)), to(rgba(108, 191, 255, 0.9)));
  }
  .layout_root{
    height:100%;
  }
  //列表组件搜索域
  .search_content{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    >*{
      margin:10px 0;
    }
  }
  /**
  公共样式
   */
  .box_center{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
  .box_center_column{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
  .box_between{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .box_between_column{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  .box_start{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
  }
  .box_start_column{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }
  .box_end{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
  }
  .box_end_column{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
  }
  .width_all{
    width:100%;
  }
  .shrink{
    flex-shrink: 0;
  }
  .center{
    align-items: center;
    text-align: center;
  }
  .icon{
    background: center center no-repeat;
    background-size:cover;
  }
  .theme{
    background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(64,158,255, 0.8)), to(rgba(108, 191, 255, 0.9)));
  }
</style>
