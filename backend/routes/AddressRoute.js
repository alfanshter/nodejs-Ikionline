import express from "express";
const router = express.Router();

import { 
    province, 
    regencies,
    district,
    village
} from "../controllers/AddressController.js";

//wilayah
router.get('/province', province);
router.get('/province/:provinceId', regencies);
router.get('/district/:regencyId', district);
router.get('/village/:districtId', village);

export default router