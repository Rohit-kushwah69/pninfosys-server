const bcrypt = require("bcrypt");
// const cloudinary = require("cloudinary");
// const jwt = require("jsonwebtoken");
const adminModel = require('../models/admin');

// cloudinary.config({
//     cloud_name: "dkzby6kvb",
//     api_key: "996867418246358",
//     api_secret: "0CkJzRqGRNB7kulUzw-nmqZEWXk",
// });

class AdminController {
    // Admin Registration
    static register = async (req, res) => {
        try {
            const { name, email, password, confirmPassword } = req.body;

            // Check all fields
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({
                    status: "failed",
                    message: "All fields are required!"
                });
            }

            // Match password
            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: "failed",
                    message: "Passwords do not match!"
                });
            }

            // Existing user check
            const existingUser = await adminModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "Email already exists"
                });
            }

            // ✅ Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // console.log("Hashing password:", hashedPassword);
            const Admin = await adminModel.create({
                name,
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                status: "success",
                message: "Admin registered successfully",
                data: Admin

            });
        } catch (error) {
            console.error("Register error:", error);
            return res.status(500).json({
                status: "failed",
                message: "Internal server error"
            });
        }
    };
    // Admin Login
    static login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    status: "failed",
                    message: "Email and password are required"
                });
            }

            const admin = await adminModel.findOne({ email });
            if (!admin) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid email or password"
                });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid email or password"
                });
            }

            // // OPTIONAL: Generate a JWT token
            // const token = jwt.sign(
            //   { id: admin._id, role: 'superadmin' },
            //   process.env.JWT_SECRET || 'your_jwt_secret_key',
            //   { expiresIn: '1d' }
            // );

            return res.status(200).json({
                status: "success",
                message: "Login successful",
                data: {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    // token // optional
                }
            });
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                status: "failed",
                message: "Internal server error"
            });
        }
    };
    // Change Password
    static changePassword = async (req, res) => {
        try {
            const { id } = req.params; // Admin ID from URL param
            const { oP, nP } = req.body;

            if (!oP || !nP) {
                return res.status(400).json({ success: false, message: "Old and new passwords are required" });
            }

            const admin = await adminModel.findById(id);
            if (!admin) {
                return res.status(404).json({ success: false, message: "Admin not found" });
            }

            // Compare old password
            const isMatch = await bcrypt.compare(oP, admin.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Old password is incorrect" });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(nP, 10);
            admin.password = hashedPassword;
            await admin.save();

            return res.status(200).json({ success: true, message: "Password changed successfully" });
        } catch (error) {
            console.error("Change password error:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    };
    //logout
    static logOut = async (req, res) => {
        try {
            // If using cookies:
            // res.clearCookie("token");
            return res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    // GET /api/admin/dashboard (Protected)
    static async dashboard(req, res) {
        res.status(200).json({ message: 'Welcome to Admin Dashboard ✅' });
    }
    static getUsers = async (req, res) => {
        try {
            const admins = await adminModel.find().select("-password"); // Exclude passwords
            return res.status(200).json({
                success: true,
                message: "Admins fetched successfully",
                data: admins,
            });
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