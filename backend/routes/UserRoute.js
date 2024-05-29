import express from "express";
const router = express.Router();

import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    loginUser
} from "../controllers/UserController.js";


import { 
    saveOtp,
    getOtp
} from "../controllers/OtpController.js";
 
 
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginUser);
 

//OTP
router.post('/otp', saveOtp);
router.post('/getotp', getOtp);

export default router;