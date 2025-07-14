const jwt = require('jsonwebtoken')
const adminModel = require("../models/admin")


const checkAuth = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("Cookie token:",token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "unauthorised user Please Login !"
        })
    } else {
        const SECRET ='pn1234';
        const verifyToken = jwt.verify(token,SECRET)
        // console.log("Verified Token:",verifyToken);
        const userdata = await adminModel.findOne({ _id: verifyToken.ID });

        req.udata = userdata;
        next();
    }
}
module.exports = checkAuth