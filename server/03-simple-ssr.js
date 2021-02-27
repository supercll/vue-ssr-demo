// node服务器：koa,express
const express = require("express");
const app = express();

// 服务端渲染模块vue-server-renderer
const { createRenderer } = require("vue-server-renderer");
// 获取渲染器
const renderer = createRenderer();

const Vue = require("vue");

// 路由
app.get("*", async (req, res) => {
    req.url;
    // 创建一个vue应用
    const vm = new Vue({
        template: "<div>name: {{name}}</div>",
        data() {
            return {
                name: "lc",
            };
        },
    });

    try {
        const html = await renderer.renderToString(vm);  // 异步的字符串输出器
        res.send(html);
    } catch (error) {
        res.status(500).send("服务器内部错误");
    }
});

// 监听
app.listen(3000);
