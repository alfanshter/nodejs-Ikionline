import Address from "../models/Address.js";
import Province from "../models/wilayah/ProvinceModels.js";
import Regency from "../models/wilayah/RegencyModels.js";
import District from "../models/wilayah/DistrictModels.js";
import Villages from "../models/wilayah/VillageModel.js";

export const province = async (req, res) => {
    try {
        const data = await Province.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const regencies = async (req, res) => {
    const { provinceId } = req.params;

    try {
            // Mencari semua kabupaten/kota yang sesuai dengan province_id yang diberikan
        const regencies = await Regency.find({ province_id: provinceId });
        if (regencies.length === 0) {
            return res.status(404).json({
                message: "Kabupaten/kota tidak ditemukan",
                status: 0
            });
        }

        res.status(200).json(regencies);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 0
        })
    }
}

export const district = async (req, res) => {
    const { regencyId } = req.params;

    try {
        // Mencari semua kecamatan yang sesuai dengan regency_id yang diberikan
        const districts = await District.find({ regency_id: regencyId });
        if (districts.length === 0) {
            return res.status(404).json({
                message: "Kecamatan tidak ditemukan",
                status: 0
            });
        }

        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 0
        });
    }
};

export const village = async (req, res) => {
    const { districtId } = req.params;
    
    try {
        // Mencari semua kecamatan yang sesuai dengan regency_id yang diberikan
        const districts = await Villages.find({ district_id: districtId });
        if (districts.length === 0) {
            return res.status(404).json({
                message: "Desa tidak ditemukan",
                status: 0
            });
        }

        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 0
        });
    }
};