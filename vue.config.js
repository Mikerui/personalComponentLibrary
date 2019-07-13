const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
// exports.vueMarkdown = vueMarkdown;
module.exports = {
  publicPath: './',
  devServer: {
    port: 8082,
    disableHostCheck: true
  },
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html',
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('examples'))
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true,
        use: [
          [
            require('markdown-it-container'),
            'example-code',
            {
              validate: function (params) {
                return params.trim().match(/^demo\s+(.*)$/)
              },
              render(tokens, index) {
                let {
                  nesting,
                  info
                } = tokens[index]
                if (nesting === 1) {
                  let content = info.trim().match(/^demo\s+(.*)$/) || []
                  let description = content.length > 1 ? content[1] : ''
                  var md = require('markdown-it')()
                  if (description) {
                    description = md.render(description)
                  }
                  let code = tokens[index + 1].content
                  return `
                    <demo-block>
                        <div class="source" slot="source">${code}</div>
                         ${description}
                        <div class="highlight" slot="highlight">`
                } else {
                  return `
                        </div>
                    </demo-block>\n`
                }
              },
            },
          ],
        ],
      })
  },
};