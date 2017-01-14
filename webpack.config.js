var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/home.js',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: [ 'react' , 'es2015' ] ,
                    plugins: [ 'react-html-attrs' , 'transform-class-properties' ]
                }
            },
            {
                test: /\.css$/,
                lader: 'style-loader!css-loader'
            }
        ]
    }
};
