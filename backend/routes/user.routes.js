import express from 'express';
const router = express.Router();
// import { signUp, logIn, verifyToken, refreshToken,getUserInformation, restrictTo, getDashboardInformation } from '../controllers/user-controller.js';
import { SignUp,LogIn,  verifyToken, checkRole } from '../controllers/user-controller.js';
// const logInController = require('../controllers/user-controller');
// const verifyUserToken = require('../controllers/user-controller')
// const getUserInfo = require('../controllers/user-controller')
// const getRefreshToken = require('../controllers/user-controller');
// const Logout = require('../controllers/user-controller')

// Post Request for the signup page
router.post("/signup", SignUp)
//Post Request for the Login Page
router.post("/login",LogIn);
//Protected Route Example
// Protected route example
router.get('/protected', verifyToken, checkRole('admin'), (req, res) => {
    // Only admin role can access this route
    res.json({ message: 'Protected route accessed' });
});
// router.post("/login", logInController.logIn)
// router.post("/login", logIn)
// //Get Request for the information and verify token functionality
// router.get("/user", verifyUserToken.verifyToken, getUserInfo.getUserInformation)
// router.get("/user", verifyToken, getUserInformation)
// //Refresh Token
// router.get("/refresh",getRefreshToken.refreshToken, verifyUserToken.verifyToken, getUserInfo.getUserInformation)
// router.get("/refresh", refreshToken, verifyToken, getUserInformation)
// //logout
// router.post("/logout",verifyUserToken.verifyToken, getRefreshToken.LogoutFromApp)
// router.post("/logout", verifyToken, refreshToken)

//Dashboard Restriction
// router.get("/admin/dashboard", verifyToken, restrictTo(["admin"]), getDashboardInformation);

export { router }