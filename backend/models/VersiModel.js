import mongoose from "mongoose";
 
const dataSchema = mongoose.Schema({
    nama_aplikasi:{
        type: String,
        required: true,
        unique: true,
    },
    versi_aplikasi:{
        type: String,
        required: true,
    },
    link_download:{
        type: String,
        required: true
    }
});
 
// Menambahkan indeks unik di tingkat database
dataSchema.index({ nama_aplikasi: 1 }, { unique: true });

const VersiModel = mongoose.model('Versi', dataSchema);

// Menjalankan skrip untuk membuat indeks unik
VersiModel.collection.createIndex({ nama_aplikasi: 1 }, { unique: true });

export default VersiModel;