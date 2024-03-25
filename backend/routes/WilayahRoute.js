import express from "express";
const router = express.Router();

import { 
    province, 
    regencies,
    district,
    village
} from "../controllers/WilayahController.js";

//wilayah
router.get('/province', province);
router.get('/province/:provinceId', regencies);
router.get('/district/:provinceId/:regencyId/', district);
router.get('/village/:provinceId/:regencyId/:districtId', village);

export default router