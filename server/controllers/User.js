const Profile = require("../models/profileModel");
const User = require("../models/userModel");

//create User
exports.createUser = async (req, res) => {
    try {
        //fetch data from req.body
        const { firstName, lastName, email, phone, verified } = req.body;

        //validation
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!verified || verified === undefined) {
            verified = false;
        }

        //check for Profile
        const profileDetails = await Profile.findById(req.user.id);

        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "profile not found ",
            })
        }

        //create an entry in DB new User
        const newuser = await User.create({
            firstName,
            lastName,
            email,
            phone,
            verified,
            profile: profileDetails._id,
        })

        //add the new User to the Profile Schema
        await Profile.findByIdAndUpdate(
            { _id: profileDetails._id },
            {
                $push: {
                    users: newuser._id,
                }
            },
            { new: true }
        )

        //return response
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: newuser,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create User",
            error: error.message,
        })
    }
}

//Get All User
exports.showAllUser = async (req, res) => {
    try {
        //fetch all user from DB
        const allUser = await User.find({});

        // const allUser = await Profile.findById(req.user.id).populate("users");

        //return response
        res.status(200).json({
            success: true,
            data: allUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//Delete User
exports.deleteUser = async (req, res) => {
    try {
        //fetch data
        const { userId } = req.body

        // Find the User
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        //User deleted for the Profile schema
        await Profile.findByIdAndUpdate(req.user.id,
            {
                $pull: { users: userId },
            }
        )

        // Delete the user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}


//Update User
exports.editUser = async (req, res) => {
    try {
        //fetch data from req.body
        const { firstName, lastName, email, phone, verified, userId } = req.body;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        //validation
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!verified || verified === undefined) {
            verified = "false";
        }

        //edit user
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user.id },
            {
                firstName,
                lastName,
                email,
                phone,
                verified,
            },
            { new: true }
        )

        return res.json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}
