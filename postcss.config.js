module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                "> 1%",
                "last 2 versions",
                'iOS>7',
                'Android>4'
            ]
        }),
        require('postcss-pxtorem')({
            rootValue: 100,
            propList: ['*']
          })
    ]

};
