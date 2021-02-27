import createApp from "./main";

// 用于首屏渲染
// context有renderer传入
export default context => {
  return new Promise((resolve, reject) => {
    // 1.获取路由器和app实例
    const { app, router } = createApp(context);
    // 2. 获取首屏地址
    router.push(context.url);
    // 3.等待路由就绪
    router.onReady(() => {
      resolve(app);
    }, reject);
  });
};
