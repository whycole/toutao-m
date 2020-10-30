/**
 * PostCSS 的配置文件
 * PostCSS是基于nodejs运行的一个处理css的工具
 * 所以它的配置文件也是运行在nodejs中
 */

// PostCSS配置文件需要导出一个对象
module.exports = {
    // 配置要使用的相关插件
    plugins: {
        // 自动添加游览区厂商声明的前缀，用来兼容不同的浏览器
        // VueCLI已经在内部默认配置了 autoprefixer
        // autoprefixer： {
        //     browsers 用来配置要兼容到的系统（浏览器）环境
        // }
        // 这个配置没有问题，但是写到这里会有控制台编译警告
        //      为什么？ 因为VueCLI是通过项目中的
        //      .browserslistrc文件来配置兼容的环境信息
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },
        // 把px转为rem
        'postcss-pxtorem': {
            // 转换的根元素基准值
            // 正常情况下按照你的设计稿来
            // 750 宽的设计稿， 750 /10 = 75
            // 375 宽的设计稿， 375 / 10 = 37.5
            // vant 组件库是基于 375 宽写的
            // 移动端页面一般都是以iphone 6/7/8 为原型设计的
            // vant 组件库是基于逻辑像素 375 写的
            // 设计稿都是基于物理像素 750 宽设计的
            // 所以如果设置为 75，那么我们就可以在设计稿中测量多少就写多少
            // 但是 vant 的样式会变得很小，小了一半
            // 所以我们还必须设置成 37.5，
            // 但是在测量设计稿的时候必须让你测量的单位/2
            rootValue: 37.5,
            // 需要转换的css属性，*就是所有属性都要转换
            propList: ['*'],
        },
    },
};