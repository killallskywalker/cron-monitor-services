const express = require('express');
const validate = require('../middleware/validate');
const {createConfiguration , configurationList , updateConfiguration , configurationDetail , deleteConfiguration , check , callback} = require("../controller/configuration.controller");
const { create } = require("../validation/configuration.validation");

let router = express.Router();

router.post('/create',validate(create),createConfiguration);
router.get('/all',configurationList);
router.put('/update/:id',updateConfiguration);
router.get('/show/:id',configurationDetail);
router.delete('/delete/:id',deleteConfiguration);
router.get('/check/:id',check);
router.get('/callback',callback);

module.exports = router;
