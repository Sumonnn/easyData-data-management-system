const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            trim: true,
        },
        verified: {
            type: Boolean
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        }
    },
    { timestamps: true },
)


module.exports = mongoose.model("User", userSchema);