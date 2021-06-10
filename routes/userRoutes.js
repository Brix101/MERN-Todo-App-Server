const express = require('express');
const router = express.Router();

const loginController = require("../controllers/loginUser");
const registerController = require("../controllers/registerUser");

const Users = require("../controllers/userController");

router.use(loginController);
router.use(registerController);


router.get("/logout", Users.logout);
router.get("/loggedIn", Users.loggedIn);

module.exports = router;