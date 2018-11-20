const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = (() => {
    const root = __dirname;
    return {
        root,
        src: path.join(root, 'src'),
        out: path.join(root, 'dist'),
        nodeModules: path.join(root, 'node_modules')
    };
})();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    bail: true,
    entry: {
        toripota2018late: path.join(paths.src, 'toripota2018late.scss')
    },
    output: {
        path: paths.out,
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: (isProduction ? false : 'cheap-module-eval-source-map'),
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: paths.src,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {
        port: parseInt(process.env.PORT || '8080', 10)
    }
};
