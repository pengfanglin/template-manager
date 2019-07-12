module.exports = {
    //打包后的静态资源使用相对路径访问，这样可以在本地直接打开
    publicPath: './',
    //将所有静态资源打包到一个目录
    assetsDir:'manager',
    pages: {
        index: {
            entry: 'src/main.js',
            //模板文件，默认模板文件是放在public目录，打包的时候会多拷贝一份，所以改为根目录
            template: 'public/index.html',
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    //不使用代码检测
    lintOnSave: false,
    // 不生成map映射文件
    productionSourceMap: false,
  devServer: {
    port: 8888, // 端口号
    host: 'localhost',
    https: false,
    open: true, //配置自动启动浏览器
  }
};