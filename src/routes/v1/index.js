const express = require('express');
const authRoute = require('./admin/auth');
const userRoute = require('./admin/user');
const commonRoute = require('./common');
const docsRoute = require('./admin/docs');
const config = require('../../config/config');

const router = express.Router();

const adminPrefix = 'admin';
const adminRoutes = [
  {
    path: `/${adminPrefix}/auth`,
    route: authRoute,
  },
  {
    path: `/${adminPrefix}/users`,
    route: userRoute,
  },
];

const commonPrefix = 'common';
const commonRoutes = [
  {
    path: `/${commonPrefix}/`,
    route: commonRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

adminRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

commonRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
