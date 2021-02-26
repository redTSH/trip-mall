const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取绝对路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    mode: 'development',
    // webpack入口文件
    entry: {
        index: './src/pages/index/index.js'
    },
    // webpack输出路径
    output: {
        // 输出目录
        path: resolve('dist'),
        // 输出文件名
        filename: 'js/[name].js'
    },
    // source-map 调试用的，出错的时候直接定位到原始代码
    devtool: 'cheap-module-eval-sourse-map',
    resolve: {
        // 自动补全的扩展名 import的时候就可以省略后缀
        extensions: ['.js'],
        // 路径别名,引入的时候就不用一层一层往上翻，直接用api/...就行
        alias: {
            api: resolve('src/api'),
            fonts: resolve('src/assets/fonts'),
            images: resolve('src/assets/images'),
            styles: resolve('src/assets/styles'),
            components: resolve('src/components'),
            pages: resolve('src/pages')
        }
    },
    // 不同类型模块的处理规则
    module: {
        rules: [
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 模板文件
            {
                test: /\.art$/,
                loader: 'art-template-loader'
            },
            // 图片
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                options: {
                    // 小于10K的图片转成base64编码的dataURL字符串写道代码中
                    limit: 10000,
                    // 将其他图片转移到
                    name: 'images/[name].[ext]',
                    esModule: false
                }
            },
            // 字体文件
            {
                test: /\.(eot|ttf|otf|svg|woff2?)$/,
                loader: 'url-loader',
                options: {
                    limit: 15000,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 自动将依赖注入html模板，并输出最终的html文件到目标文件夹
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/index/index.art'
        })
    ]
}