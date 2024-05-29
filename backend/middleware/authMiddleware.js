import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js";


let blacklistedTokens = [];


export const accessValidation = async (req,res,next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message : "Token diperlukan"
        })
    }


    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('JWT_SECRET is not defined');
        return res.status(500).json({
            message: "Internal server error"
        });
    }

    if (blacklistedTokens.includes(token)) {
        return res.status(401).json({
            message: "Token tidak sah"
        });
    }

    try {
        const jwtDecode = jwt.verify(token,secret);
        req.user = jwtDecode;
        next();

    } catch (error) {
        return res.status(401).json({
            message : "Authorized"
        })        
    }

}

export const blacklistToken = async (token) => {
    blacklistedTokens.push(token);
};
