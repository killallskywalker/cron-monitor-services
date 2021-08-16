const express = require('express');
const validate = require('../middleware/validate');
const { createProject , projectList , updateProject , projectDetail , removeProject } = require("../controller/project.controller");
const { create } = require("../validation/project.validation");

let router = express.Router();

router.post('/create',validate(create),createProject);
router.get('/all',projectList);
router.put('/update/:id',updateProject);
router.get('/show/:id',projectDetail);
router.delete('/delete/:id',removeProject);

module.exports = router;
