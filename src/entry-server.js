import createApp from "./main";

// 用于首屏渲染
// context有renderer传入
export default context => {
  return new Promise((resolve, reject) => {
    // 1.获取路由器和app实例
    const { app, router, store } = createApp(context);
    // 2. 获取首屏地址
    router.push(context.url);
    // 3.等待路由就绪
    router.onReady(() => {
      // 处理异步数据
      // 获取当前匹配的组件，getMatchedComponents当前匹配组件数组
      const matched = router.getMatchedComponents();

      // 404
      if (!matched.length) {
        return reject({ code: 404 });
      }

      Promise.all(
        // 遍历matched，判断有无asyncData，有则执行，await完毕后再返回app
        matched.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            });
          }
        })
      )
        .then(() => {
          // 约定app的数据状态放入context.state
          // 渲染器将state序列化变为字符串，window.__INITIAL_STATE__
          // 未来在前端激活前再反序列化
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
