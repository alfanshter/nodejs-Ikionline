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
        type: String,
        ref: 'Province',
        required: true
    },
    regency: {
        type: String,
        ref: 'Regency',
        required: true
    },
    district: {
        type: String,
        ref: 'District',
        required: true
    },
    village: {
        type: String,
        ref: 'Village',
        required: true
    },
    noWa: {
        type: String,
        required: true,
        unique : true,
    },
    jwtSecret: { type: String, default: '' },
}, {
    toJson: {
        transform : function ( doc, ret){
            delete ret.password;
            ret.status = 0;
        }
    }
});



// // Menambahkan indeks unik di tingkat database
// userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('Users', userSchema);

// // Menjalankan skrip untuk membuat indeks unik
// UserModel.collection.createIndex({ email: 1 }, { unique: true });

export default UserModel;