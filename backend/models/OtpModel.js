import mongoose from "mongoose";
import moment from "moment-timezone";

const otpSchema = mongoose.Schema({
    user_uid: { type: String, required: true },
    otp_code: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    expires_at: {
        type: Date,
        default: () => moment().tz("Asia/Jakarta").add(1, 'minutes').toDate(),
    }, 
    is_verified: { type: Boolean, default: false },
});
const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
