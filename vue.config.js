module.exports = {
    css:{
        loaderOptions:{
            scss:{
                additionalData: '@import "@/assets/styles.scss";'
            }
        }
    },
    transpileDependencies:[
        /\bvue-awesome\b/
    ]
}