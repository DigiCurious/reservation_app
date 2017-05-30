const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './components/newreservation.js',

    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
            {
                loader: 'babel-loader',

                // Skip any files outside of your project's `src` directory
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],

                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,

                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime', 'transform-class-properties'],
                    presets: ['react', 'stage-0', 'es2015']
                }
            }
        ]
    }
};
