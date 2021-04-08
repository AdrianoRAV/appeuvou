const express = require('express');
const router = express.Router();

const userController = require('./controllers/userControllers');


router.get('/:id', userController.get_user );

module.exports = router;