import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mailSender from "../utils/mailSender.js";
import { app } from "../app.js"
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import crypto from "crypto"

import User from "../model/auth.js";
import OTP from "../model/otp.js";


dotenv.config();

// send OTP for email verification
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // check wheather user exist or not
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(401).json({
                success: false,
                message: `User is Already Registered, can't move forward now`,
            })
        }

        // if it's new user then generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        const result = await OTP.findOne({ otp: otp })
        console.log("otp result", result)

        // makesure otp is unique (generate new otp if last otp already exists in db)
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
        }

        // create otp entry in db
        const otpBody = await OTP.create({ email, otp });

        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            error: error.message,
        })
    }
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, otp } = req.body;
        // Validations

        // makesure user must filled all details
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            })
        }

        // password && confirmPassword must match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            })
        }

        // user's email must be unique
        const userPresent = await User.findOne({ email });

        if (userPresent) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            })
        }

        // hash the password for security reason
        const hashPassword = await bcrypt.hash(password, 10);

        // Find the most recent otp
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        }

        // if otp match then create user entry in db

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
        })

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occur while registering the user",
            error: error.message,
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }

        // check password with userDb password

        // if password is match the create token and cookie
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "24h", }
            )

            user.token = token,
                user.password = undefined,

                // user contains all the details except password

                res.cookie("token", token,
                    {
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                    }).status(200).json({
                        success: true,
                        token,
                        user,
                        message: `User Login Success`,
                    })

        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }

    } catch (error) {
        console.log("login-error", error.message)
        return res.status(500).json({
            success: false,
            message: "Error occured while login",
            error: error.message,
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        // fetch data
        const userDetails = await User.findById(req.body.id)
       
        const { oldPassword, newPassword } = req.body;

        const isPassMatched = await bcrypt.compare(oldPassword, userDetails.password);

        if (!isPassMatched) {
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" })
        }

        // if password got match then simply update password in db after hashing

        const hashNewPassword = await bcrypt.hash(newPassword, 10)

        const updateUserData = await User.findByIdAndUpdate(userDetails._id, { password: hashNewPassword }, { new: true })

        // after updating password lets notify user for this account activity 

        try {
            // email, title, body
            const emailResponse = await mailSender(updateUserData.email,
                "Password for your account has been updated",
                `Password updated successfully for ${updateUserData.firstName} ${updateUserData.lastName}`
            )

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Password updated Successfully Now",
            updateUserData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error,
        })
    }
}

export const resetToken = async (req, res) => {
    try {
        // token genrate krke then frontend url m token attach krke email pr send krenge.

        // steps: 1) fetch email
        const { email } = req.body;
        //2) validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            })
        }
        // 3) create token
        const token = crypto.randomBytes(20).toString("hex");
        // 4) create entry in db
        const updateUserDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                // with this user will be able to resetPassword within 1hr only.
                resetPasswordExpires: Date.now()
            }, { new: true })
        // 5) create frontend url by attached above token
        const url = `http://localhost:5173/updatePasswoed/${token}`;
        // 6) send this url on email 
        await mailSender(
            email,
            "Password Reset",
            `Your link for email verification is ${url}.Please click this url to reset your password.`
        )

        res.json({
            success: true,
            message:
                "Email Sent Successfully, Please Check Your Email to Continue Further",
            token: token    
        })

    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        // Here user will directly send password, confirmPassword then update these in User database

        //steps 1) datafetch
        const { token, password, confirmPassword } = req.body
        // 2) validation + password hashed
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match",
            })
        }
        //check token validity
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is Invalid",
            })
        }
        // check token expire time
        if ((userDetails.resetPasswordExpires) > Date.now()) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            })
        }
        // hash the password now 
        const encryptedPassword = await bcrypt.hash(password, 10)
        // 3) db entry
        await User.findOneAndUpdate(
            { token: token },
            {
                password: encryptedPassword
            },
            { new: true }
        )
        // 4) response send
        res.json({
            success: true,
            message: `Password Reset Successful`,
        })
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        })
    }
}


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true // Pass the entire request object to callback
}, (req, accessToken, refreshToken, profile, done) => {
    // User information is in profile here
    // You can create or associate a user record in your database here
    console.log(profile); // For debugging purposes, log the user profile

    // Check if user is already registered in your database
    // Example:
    User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            //         // If user already exists, you might update their details if necessary
            user.name = profile.displayName;
            return done(null, user);
        } else {
            //         // If user does not exist, create a new user record in your database
            const newUser = new User({
                googleId: profile.id,
                username: profile.displayName,
                //             // Add other relevant user properties here
            });
            newUser.save((err) => {
                if (err) {
                    return done(err);
                }
                return done(null, newUser);
            });
        }
    });

    // For demonstration purposes, we'll simply redirect the user to a protected page
    return done(null, profile); // Pass the user profile to the next middleware
}));

// Route to handle the Google authentication callback
// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     // If authentication is successful, redirect the user to a protected page
//     res.redirect('/dashboard');
// });


// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     // find the user by id in db
//     User.findById(id, (err, user) => {
//         done(err, user);
//     })
// })