const userTable = require("../Models/userModel")

const regiterUser = async(req, res) => {
    try {
        const{name,email,password,phone,address} = req.body
        const userDetails = new userTable({
            name,
            email,
            password,
            phone,
            address
        })  
        await userDetails.save();
        res.status(201)
.json(
    {message:"user added successfully", udata:userDetails}

)    } catch (error) {
    console.log(error)
    res.status(500).json({message:"server error", error})

    }
}

module.exports = regiterUser