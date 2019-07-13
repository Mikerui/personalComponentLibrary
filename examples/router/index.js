import Vue from 'vue';
import Router from 'vue-router';
// import giud from '../docs/giud.md'
import navConfig from './nav.json';

Vue.use(Router);

let routes = [];

Object.keys(navConfig).forEach(header => {
  routes = routes.concat(navConfig[header]);
});
const addComponent = router => {
  router.forEach(route => {
    if (route.items) {
      addComponent(route.items);
      routes = routes.concat(route.items);
    } else {
      if (route.type === 'views') {
        route.component = r =>
          require.ensure([], () => r(require(`../views/${route.name}.vue`)));
        return;
      }
      route.component = r =>
        require.ensure([], () => r(require(`../docs/${route.name}.md`)));
    }
  });
};
addComponent(routes);

// export default new Router({
//   // mode: 'history',
//   base: process.env.BASE_URL,
//   routes: routes
// })

const router = new Router({
  // base: process.env.BASE_URL,
  routes,
  // mode: 'history',
});

router.beforeEach((to, from, next) => {
  // 如果是没有的路由，则去首页
  if (!to.matched.length) {
    next({
      path: '/',
    });
    return;
  }
  next(true);
});
export default router;