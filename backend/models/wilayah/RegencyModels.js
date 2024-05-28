import mongoose from "mongoose";


const regencySchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    province_id: {
        type: String,
        required: true,
        ref: 'Province'
    },
    name: {
        type: String,
        required: true
    },
    alt_name: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});


const RegencyModel = mongoose.model('regencies', regencySchema);

export default RegencyModel;
