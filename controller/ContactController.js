const contactModel = require('../models/contact')

class ContactController {
    static contactinsert = async (req, res) => {
        try {
            // console.log(req.body);
            const { name, email, phone, message } = req.body;
            const result = await contactModel.create({
                name, email, phone, message
            });
            return res.status(201).json({
                message: "Data Inserted Successfully",
                data: result,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static contactdisplay = async (req, res) => {
        try {
            const contact = await contactModel.find();
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                contact,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static contactview = async (req, res) => {
        try {
            const id = req.params.id;
            const contact = await contactModel.findById(id);
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                contact,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static contactdelete = async (req, res) => {
        try {
            const id = req.params.id;
            const contact = await contactModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Data Deleted Successfully",
                contact,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static contactupdate = async (req, res) => {
        try {
            // console.log(req.body);
            const id = req.params.id;
            const { name, email, phone, message } = req.body;
            await contactModel.findByIdAndUpdate(id, {
                name, email, phone, message
            });
            return res.status(201).json({
                success: true,
                message: "Data Updated Successfully",
            });
        } catch (error) {
            console.log(error)
        }

    }
}
module.exports = ContactController