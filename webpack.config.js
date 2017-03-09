var config = {
    entry: './index.js',

    output: {
        path: './',
        filename: 'bundle.js',
    },

    devServer: {
        inline: true,
        historyApiFallback: true,
        port: 3000
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },

    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}

module.exports = config;