const portfolioModel = require('../models/portfolio')

class PortfolioController {
    static portfolioinsert = async (req, res) => {
        try {
            console.log(req.body);
            const { title, url, image } = req.body;
            const result = await portfolioModel.create({
                title, url, image,
            });
            return res.status(201).json({
                message: "Data Inserted Successfully",
                data: result,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static portfoliodisplay = async (req, res) => {
        try {
            // console.log(req.body)
            const portfolio = await portfolioModel.find();
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                portfolio,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static portfolioview = async (req, res) => {
        try {
            const id = req.params.id;
            const portfolio = await portfolioModel.findById(id);
            return res.status(200).json({
                success: true,
                message: "Data Displayed Successfully",
                portfolio,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static portfoliodelete = async (req, res) => {
        try {
            const id = req.params.id;
            const portfolio = await portfolioModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Data Deleted Successfully",
                portfolio,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static portfolioupdate = async (req, res) => {
        try {
            // console.log(req.body);
            const id = req.params.id;
            const { title, url, image } = req.body;
            await portfolioModel.findByIdAndUpdate(id, {
                title, url, image,
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
module.exports = PortfolioController