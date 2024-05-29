import { use } from "bcrypt/promises.js";
import User from "../models/UserModel.js";
const bcrypt = await import('bcrypt');

import jwt from 'jsonwebtoken';
const crypto = await import('crypto');
import { blacklistToken } from '../middleware/authMiddleware.js';


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const saveUser = async (req, res) => {
    const { name, email, password, confirmPassword, dateOfBirth, placeOfBirth, gender, province, regency, district, village, noWa, address } = req.body;
    //hash password 
    if (password !== confirmPassword) {
        return res.status(201).json({
            data: null,
            status: 0,
            message: 'Password tidak sama'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword, // Gunakan password yang sudah di-hash
        dateOfBirth,
        placeOfBirth,
        province,
        regency,
        district,
        village,
        address,
        noWa,
        gender,
    });



    try {
        // // Buat secret key baru untuk pengguna
        // const newJwtSecret = crypto.randomBytes(64).toString('hex');
        // // Simpan secret key baru di database
        // user.jwtSecret = newJwtSecret;

        const inserUser = await user.save();
        const payload = {
            name: inserUser.name,
            email: inserUser.email,
            id: inserUser.id
        }

        const secret = process.env.JWT_SECRET;

        const expired = 60 * 60 * 1;
        const token = jwt.sign(payload, secret, {
            expiresIn: expired // 
        });


        res.status(200).json({
            data: inserUser,
            status: 1,
            message: "Pendaftaran berhasil",
            token

        });
    } catch (error) {

        if (error.code && error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Error: Duplikat kunci (duplicate key error)
            res.status(409).json({ status: 0, message: "Email already exists" });
        } else if (error.keyPattern.noWa) {
            res.status(409).json({ status: 0, message: "No Wa already exists" });

        } else {
            // Error lainnya
            res.status(400).json({ status: 0, message: error.message });
        }
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    //cari pengguna berdasarkan email 
    const user = await User.findOne({ email });

    //jika email tidak ada
    if (!user) {
        return res.status(401).json({
            message: "email tidak ditemukan",
            status: 0
        })
    }

    //cek password 
    const isPasswordInvalid = await bcrypt.compare(password, user.password)
    //jika password salah
    if (!isPasswordInvalid) {
        return res.status(401).json({
            message: "Invalid email or password",
            status: 0
        })
    }
    //====bikin token====
    //bikin payload 
    const payload = {
        name: user.name,
        email: user.email,
        id: user.id
    }

    //bikin secret
    const secret = process.env.JWT_SECRET
    //bikin expired waktu 
    const expired = 60 * 60 * 24 * 365
    //bikin token 
    const token = jwt.sign(payload, secret, {
        expiresIn: expired
    })

    //kirim response ke user
    return res.status(200).json({
        message: "Login berhasil",
        status: 1,
        data: user,
        token
    })
}

export const logout = async (req, res) => {
    //ambil token pada authorizaton
    const { authorization } = req.headers
    //jika token gk ada 
    if (!authorization) {
        return res.status(401).json({
            message: "token tidak sesuai",
            status: 0
        })
    }

    //split token bearer
    const token = authorization.split(' ')[1]
    await blacklistToken(token)

    return res.status(200).json({
        message: "logout success",
        status: 0
    })
}