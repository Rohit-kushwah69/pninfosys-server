const adminModel = require('../models/admin');

class AdminController {
    // Admin Registration
    static adminRegistration = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password ) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const isExist = await adminModel.findOne({ email });
            if (isExist) {
                return res.status(409).json({ success: false, message: "Admin already exists" });
            }

            const admin = await adminModel.create({
                name,
                email,
                password, 
                
            });

            return res.status(201).json({
                success: true,
                message: "Registration successful",
                data: admin,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // Admin Login
    static adminLogin = async (req, res) => {
        try {
            const { email, password } = req.body;

            const admin = await adminModel.findOne({ email });
            if (!admin || admin.password !== password) {
                return res.status(401).json({ success: false, message: "Invalid email or password" });
            }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: admin, // You may want to omit password here
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // Change Password
    static changePassword = async (req, res) => {
        try {
            const { id } = req.params; // Admin ID from URL param
            const { oldPassword, newPassword } = req.body;

            const admin = await adminModel.findById(id);
            if (!admin) {
                return res.status(404).json({ success: false, message: "Admin not found" });
            }

            if (admin.password !== oldPassword) {
                return res.status(400).json({ success: false, message: "Old password is incorrect" });
            }

            admin.password = newPassword;
            await admin.save();

            return res.status(200).json({ success: true, message: "Password changed successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // Update Profile
    static updateProfile = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, image } = req.body;

            const updatedData = { name };

            if (image?.public_id && image?.url) {
                updatedData.image = {
                    public_id: image.public_id,
                    url: image.url,
                };
            }

            const updated = await adminModel.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updated) {
                return res.status(404).json({ success: false, message: "Admin not found" });
            }

            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: updated,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

module.exports = AdminController;