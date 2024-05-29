import express from "express";
const router = express.Router();

import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    loginUser,
    logout
} from "../controllers/UserController.js";


import { 
    saveOtp,
    getOtp
} from "../controllers/OtpController.js";
 
import {
    accessValidation
} from "../middleware/authMiddleware.js";

 
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginUser);
router.post('/logout', accessValidation, logout);
 

//OTP
router.post('/otp', saveOtp);
router.post('/getotp', getOtp);

export default router;