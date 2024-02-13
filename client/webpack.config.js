const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/WidgetWrapper.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'widget-bundle.js',
        library: 'MyWidget',
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
        },
        {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        ]
    },
    plugins: [
        new Dotenv(),
        // new webpack.DefinePlugin({
        //   'process.env.REACT_APP_ENDPOINT': JSON.stringify(process.env.REACT_APP_ENDPOINT),
        //     //   'process.env.REACT_APP_CONSTANT2': JSON.stringify(),
        // }),
    ],
};
