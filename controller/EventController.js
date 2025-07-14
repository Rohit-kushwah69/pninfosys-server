const eventsModel = require("../models/events");

class EventController {
    static eventinsert = async (req, res) => {
        try {
            // console.log(req.body);
            const { title, description, image } = req.body;
            const result = await eventsModel.create({
                title, description, image
            });
            return res.status(201).json({
                message: "Data Inserted Successfully",
                data: result,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static eventsdisplay = async (req, res) => {
        try {
            const event = await eventsModel.find();
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                event,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static eventview = async (req, res) => {
        try {
            const id = req.params.id;
            const event = await eventsModel.findById(id);
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                event,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static eventdelete = async (req, res) => {
        try {
            const id = req.params.id;
            const event = await eventsModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Data Deleted Successfully",
                event,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static eventupdate = async (req, res) => {
        try {
            // console.log(req.body);
            const id = req.params.id;
            const { title, description, image } = req.body;
            await eventsModel.findByIdAndUpdate(id, {
                title, description, image,
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
module.exports = EventController