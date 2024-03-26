import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAT: {
        type: Date,
        default: Date.now(),
        expires: 60 * 5,
    },
});

const emailContent = (otp) => `
    <div class="text-[1.4rem] mb-[2rem]">
        <p>Dear User,</p>
        <p>Thank you for registering with StudyNotion. To complete your registration, please use the following OTP (One-Time Password) to verify your account:</p>
        <h2 class="highlight">${otp}</h2>
        <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email. Once your account is verified, you will have access to our platform and its features.</p>
    </div>
`;

const sendVerificationEmail = async (email, otp) => {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `${emailContent(otp)}`
        )
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;