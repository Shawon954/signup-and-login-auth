const express = require ('express')
const router = express.Router();

const authregister = require('../controller/auth_contoller')



router.post('/register',authregister.UserRegister);
router.post('/login',authregister.UserLogin);





module.exports = router;