const path = require('path');

module.exports = {
    entry: './entry.js', // Your main JS file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: {
            name: 'OneLang',
            type: 'umd', // Universal Module Definition
        },
        globalObject: 'this', // For compatibility with different environments
    },
    mode: 'development',
};
