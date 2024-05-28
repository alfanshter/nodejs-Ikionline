import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
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

const AddressModel = mongoose.model('addres', addressSchema);

export default AddressModel;