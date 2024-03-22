import mongoose from "mongoose";

const wilayahSchema = mongoose.Schema({
    id: {
        type: String
    },

    name: {
        type: String
    },
    regencies: [
        {
            id: {
                type: String
            },
            name: {
                type: String
            },
            districts: [
                {
                    id: {
                        type: String
                    },
                    name: {
                        type: String,
                    },
                    villages: [
                        {
                            id: {
                                type: String
                            },
                            name: {
                                type: String
                            }
                        }
                    ]
                }
            ]
        }
    ]

});

const WilayahModel = mongoose.model('wilayah', wilayahSchema);

export default WilayahModel;