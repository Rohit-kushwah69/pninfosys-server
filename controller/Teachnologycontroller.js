const technologyModel = require('../models/technology')

class TechnologyController {
    static techinsert = async (req, res) => {
        try {
            // console.log(req.body)
            const { title, description, image } = req.body;
            const result = await technologyModel.create({
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
    static techdisplay = async (req, res) => {
        try {
            const technology = await technologyModel.find();
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                technology,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static techview = async (req, res) => {
        try {
            // console.log(req.body)
            const id = req.params.id;
            const technology = await technologyModel.findById(id);
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                technology,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static techdelete = async (req, res) => {
        try {
            const id = req.params.id;
            const technology = await technologyModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Data Deleted Successfully",
                technology,
            });
        } catch (error) {
            console.log(error)
        }
    }
     static techupdate = async (req, res) => {
        try {
            // console.log(req.body);
            const id = req.params.id;
            const { title, description, image} = req.body;
            await technologyModel.findByIdAndUpdate(id, {
               title,
               description,
               image
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
module.exports = TechnologyController