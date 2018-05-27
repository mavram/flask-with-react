
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')


const paths = {
    src: path.resolve('src'),
    app: path.resolve('src', 'js'),
    appInfo: path.resolve('dist', 'app.json'),
    html: path.resolve('src', 'index.html')
}


const getJsLoader = (t) => {
    return {
        test: t,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'stage-3']
                }
            },
            {
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    emitError: true
                }
            }
        ]
    }
}


const getCssLoader = () => {
    return {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }
}


const getPlugins = () => {
    let plugins = []

    const appInfo = require('./package.json')

    plugins.push(
        new HtmlWebPackPlugin({
            template: paths.html,
            title: appInfo.name,
            version: appInfo.version
        })
    )

    plugins.push(
        new CopyWebpackPlugin([
            {
                from: 'package.json',
                to: paths.appInfo,
                transform: (content, path) => {
                    return JSON.stringify({
                        name: appInfo.name,
                        version: appInfo.version,
                        description: appInfo.description,
                        license: appInfo.license,
                        author: appInfo.author,
                        repository: appInfo.repository
                    },
                    null,
                    '    ')
                }
            }
          ])
    )

    return plugins
}

module.exports = {
    output: {
        filename: 'index.js'
    },

    resolve: {
        modules: ['node_modules', paths.app],
        extensions: ['.js', '.jsx', '.json', '.css']
    },

    module: {
        rules: [
            getJsLoader(/\.js$/),
            getJsLoader(/\.jsx$/),
            getCssLoader()
        ]
    },

    plugins: getPlugins(),

    performance: {
        maxAssetSize: 500000,
        maxEntrypointSize: 500000
      },

    devtool: process.env.NODE_ENV === 'production' ? 'cheap-source-map' : 'source-map'
}
