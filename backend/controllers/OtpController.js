import OtpModel from "../models/OtpModel.js";
import moment from "moment-timezone";
import UserModel from "../models/UserModel.js";

export const saveOtp = async (req, res) => {
    try {
        const user_uid = req.body.user_uid; 
        const otpCode = generateOTP();

        const newOtp = new OtpModel({
            user_uid: user_uid,
            otp_code: otpCode,
        });

        const data = await newOtp.save();

        const response = { error: false, message: 'Berhasil' };
        res.status(201).json(response);
    } catch (error) {
        const response = { error: true, message: error.message };
        res.status(400).json(response);
    }
}

export const getOtp = async (req, res) => {
    try {
        let response;
        const user_uid = req.body.user_uid; 
        const otp_code = req.body.otp_code; 
        const now = moment().tz("Asia/Jakarta").toDate();
        
        const data = await OtpModel.find({
            user_uid: user_uid,
            otp_code: otp_code,
            expires_at: { $gt: now },
            is_verified : false
        })

        if (!data.length==0) {
            //cek akun
            const cekakun = await UserModel.find({
                uid: user_uid
            })
            if (!cekakun.length ==0) {
                response = { error: false, message: 'Akun Ada'  };                            
            }else{
                response = { error: false, message: 'Akun tidak ada'  };            
            }
        }else{
            response = { error: true, message: 'OTP Gagal'  };
        }

        res.status(201).json(response);
    } catch (error) {
        const response = { error: true, message: error.message };
        res.status(400).json(response);
    }
}


//fungsi lain

const generateOTP = () => {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
};
