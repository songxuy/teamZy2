module.exports = {
    presets:[
      [
        "@babel/preset-env",{
          "useBuiltIns": "usage"
        }
      ]
    ],
    plugins: [
       // 添加这个
      '@babel/plugin-syntax-dynamic-import'
    ]
}