
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')


const appInfo = require('../app.json')
const paths = {
    src: path.resolve('src'),
    app: path.resolve('src', 'js'),
    html: path.resolve('src', 'index.html')
}


const getJsLoader = (t) => {
    return {
        test: t,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['env', 'react', 'stage-3']
        }
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

    plugins.push(
        new HtmlWebPackPlugin({
            template: paths.html,
            title: appInfo.name,
            version: appInfo.version
        })
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

    devtool: 'inline-source-map'
}
