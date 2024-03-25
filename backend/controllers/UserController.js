import User from "../models/UserModel.js";
const bcrypt = await import('bcrypt');


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const saveUser = async (req, res) => {
    const { name, email, password, dateOfBirth, placeOfBirth, gender, province, regency, district, village, noWa ,address } = req.body;
    //hash password 
    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
        name,
        email,
        password: hashedPassword, // Gunakan password yang sudah di-hash
        dateOfBirth,
        placeOfBirth,
        province,
        regency,
        district,
        village,
        address,
        noWa,
        gender,
    });

    
    try {
        const inserteduser = await user.save();
        res.status(201).json({
            data : inserteduser,
            status : 1
        });
    } catch (error) {

        if (error.code && error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Error: Duplikat kunci (duplicate key error)
            res.status(400).json({ status: 0, message: "Email already exists" });
        } else if (error.keyPattern.noWa) {
            res.status(400).json({ status: 0, message: "No Wa already exists" });
            
        }else {
            // Error lainnya
            res.status(400).json({ status: 0, message: error.message });
        }
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}