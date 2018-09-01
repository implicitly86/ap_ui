const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let config = {
    entry: './src/app/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        ts: 'ts-loader'
                    },
                    esModule: true
                    // other vue-loader mspProjectOptions go here
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
        */
        new CopyWebpackPlugin([
            {from: 'src/public', to: __dirname + "/dist", ignore: ['*.styl']}
        ]),
        new VueLoaderPlugin()
    ],
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"',
                    BASE_API_URL: '"http://localhost"',
                    BASE_API_PORT: '"8080"'
                }
            })
        ])
    }
    if (argv.mode === 'production') {
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                    BASE_API_URL: '"http://localhost"',
                    BASE_API_PORT: '"8080"'
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]);
        config.devtool = '#source-map';
        config.optimization = {
            minimize: true
        }
    }
    return config;
};
