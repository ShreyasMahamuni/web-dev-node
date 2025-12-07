const express = require('express');

const router = express.Router();

const authcontrollers = require('../Controller/Auth-controller');
const { signupSchema, loginSchema } = require("../validators/Auth-validator");
const validate = require("../Middleware/Validate-middleware");
const authMiddleware = require("../Middleware/auth-middleware");

router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signupSchema), authcontrollers.register);

router.route("/login").post(validate(loginSchema), authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;

