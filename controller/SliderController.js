const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const sliderModel = require("../models/slider")


cloudinary.config({
    cloud_name: "dkzby6kvb",
    api_key: "996867418246358",
    api_secret: "0CkJzRqGRNB7kulUzw-nmqZEWXk",
});
class SliderController {
    static sliderInsert = async (req, res) => {
        try {
            const { title, subtittle } = req.body
            if (!title || !subtittle) {
                return res.status(400).json({
                    success: false,
                    message: 'All Fields Are Required!!'
                })
            }

            const file = req.files.image
            const mediaupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: 'slider'
                }
            )
            const slider = await sliderModel.create({
                title,
                subtittle,

                image: {
                    public_id: mediaupload.public_id,
                    url: mediaupload.secure_url
                }
            })
            return res.status(201).json({
                success: true,
                message: 'event create successfully',
                data: slider
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                messge: 'Create API error',
            })
        }
    }
    static sliderDisplay = async (req, res) => {
        try {
            const slider = await sliderModel.find()
            return res.status(200).json({
                success: true,
                message: 'data displayed success',
                data: slider
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                messge: 'Display API error',
            })
        }
    }
    static sliderView = async (req, res) => {
        try {
            const id = req.params.id;
            const slider = await sliderModel.findById(id);
            return res.status(200).json({
                success: true,
                message: "user displayed Successfully",
                slider,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static sliderDelete = async (req, res) => {
        try {
            const id = req.params.id;
            const slider = await sliderModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "user deleted Successfully",
                slider,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    static sliderUpdate = async (req, res) => {
        try {
            // console.log(req.body);
            const id = req.params.id;
            const { title, subtittle, image } = req.body;
            await sliderModel.findByIdAndUpdate(id, {
                title, subtittle, image,
            });
            return res.status(201).json({
                success: true,
                message: "user updated Successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }

    }



}
module.exports = SliderController;