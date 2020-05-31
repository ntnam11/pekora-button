module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/pekora-button/'
        : '',
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "~@/assets/common.scss";
                `
            }
        }
    }
}