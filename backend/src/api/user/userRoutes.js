const express = require('express');
const router = express.Router();

const userController = require('./controllers/userControllers');


router.get('/:id', userController.get_user );

router.post('/', userController.create_user);

module.exports = router;

