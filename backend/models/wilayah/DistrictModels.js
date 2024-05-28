import mongoose from "mongoose";

const districtSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    regency_id: {
        type: String,
        required: true,
        ref: 'Regency'
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

const DistrictModel = mongoose.model('District', districtSchema);

export default DistrictModel;
