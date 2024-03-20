import express from "express";
const router = express.Router();

import { 
    getVersi, 
    getVersiById,
    saveVersi,
    updateVersi,
    deleteVersi
} from "../controllers/VersiController.js";

//Versi
router.get('/versi', getVersi);
router.get('/versi/:id', getVersiById);
router.post('/versi', saveVersi);
router.patch('/versi/:id', updateVersi);
router.delete('/versi/:id', deleteVersi);

export default router