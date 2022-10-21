
// const { resolve } = require("core-js/fn/promise")
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir)
}
let pages = {
  about: {
    entry: 'src/application/about/about.js',
    template: 'src/application/about/about.html',
    filename: 'about.html',
    title: 'Index Page',
  },
  work: {
    entry: 'src/application/work/work.js',
    template: 'src/application/work/work.html',
    filename: 'work.html',
    title: 'work Page',
  }
}
module.exports = {
  lintOnSave: false,


  // 应用的架设路径，CLI默认你的项目部署在域名的根目录下所以publicPath默认为/
  publicPath: '/',
  // 构建后的文件是否启用哈希命名
  filenameHashing: true,
  // 是否在save文件时lint代码, 需要先安装cli-plugin-eslint
  // lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',

  chainWebpack: config => {
    // config.plugins.delete('prefetch-admin')
    config.resolve.alias
        .set("about", resolve("src/application/about"))
        .set("work", resolve("src/application/work"))
  },
  pages: pages,

}