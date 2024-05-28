import mongoose from "mongoose";

const provinceSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    alt_name: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});

const ProvinceModel = mongoose.model('provinces', provinceSchema);

export default ProvinceModel;
