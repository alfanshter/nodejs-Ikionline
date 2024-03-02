import Versis from "../models/VersiModel.js";

export const getVersi = async (req, res) => {
    try {
        const data = await Versis.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getVersiById = async (req, res) => {
    try {
        let response;
        const data = await Versis.findOne({ nama_aplikasi: req.params.id });
        
        if (!data) {
            response = {error : true, message : 'Data tidak tersedia'};
            // Jika tidak ditemukan data dengan nama aplikasi tertentu
            res.status(404).json(response
                );
            return;
        }
        response = {error : false, data : data};

        res.json(response);
    } catch (error) {
        response = {error : true, message : error.message};
        res.status(500).json(response);
    }
};

export const saveVersi = async (req, res) => {
    try {
        const newVersi = new Versis(req.body);
        const data = await newVersi.save();

        const response = {
            status: 1,
            message: 'Berhasil'
        };

        res.status(201).json(response);
    } catch (error) {
        // Menangkap kesalahan duplicate key pada field nama_aplikasi
        if (error.code === 11000 && error.keyPattern && error.keyPattern.nama_aplikasi) {
            res.status(400).json({ status: 0, message: 'Nama Aplikasi sudah ada.' });
        } else {
            // Menangkap kesalahan lainnya
            res.status(400).json({ status: 0, message: error.message });
        }
    }
}

export const updateVersi = async (req, res) => {
    try {
        const data = await Versis.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteVersi = async (req, res) => {
    try {
        const data = await Versis.deleteOne({ _id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}