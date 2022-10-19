const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@components': resolvePath('./src/components'),
            '@hooks': resolvePath('./src/hooks'),
            '@pages': resolvePath('./src/pages'),
            '@redux': resolvePath('./src/redux'),
            '@assets': resolvePath('./src/assets'),
            '@services': resolvePath('./src/services')
        }
    },
}