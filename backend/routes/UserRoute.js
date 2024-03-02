import express from "express";
import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";

import { 
    getVersi, 
    getVersiById,
    saveVersi,
    updateVersi,
    deleteVersi
} from "../controllers/VersiController.js";

import { 
    saveOtp,
    getOtp
} from "../controllers/OtpController.js";
 
const router = express.Router();
 
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
 
//Versi
router.get('/versi', getVersi);
router.get('/versi/:id', getVersiById);
router.post('/versi', saveVersi);
router.patch('/versi/:id', updateVersi);
router.delete('/versi/:id', deleteVersi);

//OTP
router.post('/otp', saveOtp);
router.post('/getotp', getOtp);

export default router;