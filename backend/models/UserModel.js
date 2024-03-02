import mongoose from "mongoose";
 
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true
    }
});
 
// Menambahkan indeks unik di tingkat database
userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('Users', userSchema);

// Menjalankan skrip untuk membuat indeks unik
UserModel.collection.createIndex({ email: 1 }, { unique: true });

export default UserModel;