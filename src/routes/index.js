const express = require('express');
const configurationRoutes = require("./configuration.routes");
const projectRoutes = require("./project.routes");

const router = express.Router();

const routes = [
    {
      path: '/projects',
      route: projectRoutes,
    },
    {
      path: '/configurations',
      route: configurationRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path,route.route);
});

module.exports = router; 
