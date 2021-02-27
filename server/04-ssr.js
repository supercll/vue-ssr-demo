// node服务器：koa,express,egg.js
const express = require("express");
const app = express();

// 获取文件绝对路径
const resolve = dir => require("path").resolve(__dirname, dir);

// 第 1 步：通过中间件开放dist/client静态文件目录，关闭默认下载index页的选项，不然到不了后面路由
app.use(express.static(resolve("../dist/client"), { index: false }));

// 服务端渲染模块vue-server-renderer
const { createBundleRenderer } = require("vue-server-renderer");

// 获取渲染器
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json");
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: require("fs").readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")), // 客户端清单
});

//  路由
app.get("*", async (req, res) => {
  try {
    //   构造上下文F
    const context = {
      url: req.url,
    };
    // 这里调用entry-server的方法创建实例，在调用toString方法生成html字符串，返回给前端
    const html = await renderer.renderToString(context);
    res.send(html);
  } catch (error) {
    res.status(500).send("服务器内部错误");
  }
});

// 监听
app.listen(3000);
