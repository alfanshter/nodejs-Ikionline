
import Wilayah from "../models/WilayahModel.js";

export const province = async (req, res) => {
    try {
        const data = await Wilayah.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const regencies = async (req, res) => {
    const { provinceId } = req.params;

    try {
        const province = await Wilayah.findOne({ id: provinceId });
        console.log(province);
        if (!province) {
            return res.status(404).json({
                message: "Provinsi tidak ditemukan",
                status: 0
            });
        }

        //menampilkan kabupaten dari provinsi 
        const regencies = province.regencies;
        res.status(200).json(regencies);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 0
        })
    }
}

export const district = async (req, res) => {
    const { provinceId, regencyId } = req.params;

    try {
        const province = await Wilayah.findOne({
            id: provinceId
        });

        //memfilter regency berdasarkan id regency yang diinginkan
        const selectedRegency = province.regencies.find(regency => regency.id === regencyId);

        if (!selectedRegency) {
            return res.status(404).json({
                message: "Regency not found",
                status: 0
            });
        }

        // Mengambil nilai district dari regency yang dipilih
        const district = selectedRegency.districts.map(district => ({
            id: district.id,
            name: district.name
        }));


        if (!district) {
            return res.status(404).json({
                message: "District not found",
                status: 0
            });
        }

        // Mengembalikan nilai district beserta id dari regency yang dipilih
        res.json({
            district: district,
            status : 1
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 0
        })
    }
}

export const village = async (req, res) => {
    const { provinceId, regencyId, districtId } = req.params;

    try {

        const province = await Wilayah.findOne({
            id: provinceId
        });

        //memfilter regency berdasarkan id regency yang diinginkan
        const selectedRegency = province.regencies.find(regency => regency.id === regencyId);


        const selectedDistrict = selectedRegency.districts.find(village => village.id === districtId);

         // Mengambil nilai desa dari kecamatan yang dipilih
         const villages = selectedDistrict.villages.map(village => ({
            id: village.id,
            name: village.name
        }));

        res.json({
            village: villages,
            status : 1
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 0
        })
    }


}

