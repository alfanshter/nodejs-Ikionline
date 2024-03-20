import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => ({
                status :0,
                error: `${props.value} is not a valid email address!`
            })
        }
    },
    password: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    placeOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Province',
        required: true
    },
    regency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Regency',
        required: true
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    village: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Village',
        required: true
    },
    noWa: {
        type: String,
        required: true
    }
});



// // Menambahkan indeks unik di tingkat database
// userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('Users', userSchema);

// // Menjalankan skrip untuk membuat indeks unik
// UserModel.collection.createIndex({ email: 1 }, { unique: true });

export default UserModel;