const Profile = require("../models/profileModel");
const OTP = require("../models/otpModel");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const mailSender = require("../utils/mailSender");
const jwt = require('jsonwebtoken');

require('dotenv').config();


//send-OTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from request body
        const { email } = req.body;

        //check if user already exist
        const checkProfilePresent = await Profile.findOne({ email });

        //if user already exist , then return a response
        if (checkProfilePresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }

        let result;
        //generate OTP  and check unique otp or not
        do {
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            // console.log("OTP generate: ", otp);

            //check unique otp or not
            result = await OTP.findOne({ otp: otp });

        } while (result);

        const otpPayload = { email, otp };

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        // console.log(otpBody);

        //return response successful
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        })

    } catch (error) {
        console.log("Error uccured on OTP sent: ", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//signup
exports.signup = async (req, res) => {
    try {
        //data fetch from request ki body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        } = req.body;

        //validate krlo
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        //2nd password verify match krlo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword Value does not match, please try again",
            })
        }

        //check user already exist or not
        const existingProfile = await Profile.findOne({ email });


        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        //find most recent OTP stored for the user
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        // console.log("recent OTP :", recentOTP);


        //validate OTP
        if (recentOTP.length == 0) {
            //OTP not found 
            return res.status(400).json({
                success: false,
                message: "OTP not Found"
            })

        } else if (otp !== recentOTP[0].otp) {
            //Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //enrty create in DB 
        const profile = await Profile.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return response
        return res.status(200).json({
            success: true,
            message: "User is registered Successfully",
            profile,
        })

    } catch (error) {
        console.log("Error uccured on signup page : ", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. please try again",
        })
    }
}

//login
exports.login = async (req, res) => {
    try {
        //fetch data from request body
        const { email, password } = req.body;

        //validation data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            })
        }

        //user check exist or not
        const profile = await Profile.findOne({ email })

        if (!profile) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            })
        }
        
        //generate JWT token , after password matching
        if (await bcrypt.compare(password, profile.password)) {
            const payload = {
                email: profile.email,
                id: profile._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            })

            profile.token = token;
            profile.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                profile,
                message: "Logged in successfully",
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

    } catch (error) {
        console.log("Error uccured on login page : ", error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again",
        })
    }
}