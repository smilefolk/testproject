const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');

const router = express.Router();
router.route('/')
    .get(controller.listUser)
    .post(controller.createUser)
    
router.route('/:id')
    .patch(controller.updateUser)
    .delete(controller.removeUser)
    
module.exports = router;
