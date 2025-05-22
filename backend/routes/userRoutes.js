const express = require ('express')
const router = express.Router()
const AuthController = require ('../controllers/userController.js');
const refreshToken = require ('../controllers/refreshToken.js')
const verifyToken = require ('../middlewares/verifyToken.js')

router.get("/getAll", verifyToken, AuthController.getUser);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.delete("/logout", AuthController.logout);
router.get("/token", refreshToken.refreshToken);


module.exports = router;