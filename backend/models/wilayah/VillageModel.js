import mongoose from "mongoose";

const villageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    district_id: {
        type: String,
        required: true,
        ref: 'District'
    },
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        default: null
    },
    longitude: {
        type: Number,
        default: null
    }
});

const VillageModel = mongoose.model('villages', villageSchema);

export default VillageModel;
