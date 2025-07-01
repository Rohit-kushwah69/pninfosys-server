const teamModel = require('../models/team')

class TeamController {
    static teaminsert = async (req, res) => {
        try {
            // console.log(req.body);
            const { name, image, position } = req.body;
            const result = await teamModel.create({
                name, image, position
            });
            return res.status(201).json({
                message: "Data Inserted Successfully",
                data: result,
            });
        } catch (error) {
            console.log(error)
        }
    }
     static teamdisplay = async (req, res) => {
        try {
            const team = await teamModel.find();
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                team,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static teamview = async (req, res) => {
        try {
            const id = req.params.id;
            const team = await teamModel.findById(id);
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                team,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static teamdelete = async (req, res) => {
        try {
            const id = req.params.id;
            const team = await teamModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Data Deleted Successfully",
                team,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static teamupdate = async (req, res) => {
        try {
            // console.log(req.body);
            const id = req.params.id;
            const { name, image, position } = req.body;
            await teamModel.findByIdAndUpdate(id, {
                name, image, position
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
module.exports = TeamController