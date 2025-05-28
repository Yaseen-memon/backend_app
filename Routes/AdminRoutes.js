const express = require('express');
const router = express.Router();
// const { register, login, dashboard } = require('../controllers/adminControllers');
const {createUser,searchAdmin,loginUser  } =require('../controllers/adminResgisterController')
const {addCategory} = require('../controllers/categorycontroller')

// const auth = require('../Middleware/auth');

router.post('/user', createUser);
router.post('/admin/search', searchAdmin);
router.post('/admin/login', loginUser);
router.post('/categories', addCategory);
// router.post('/login', login);
// router.get('/dashboard', dashboard); // protected route

module.exports = router;
