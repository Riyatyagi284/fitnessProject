import {sendOTP, signup, login, changePassword, resetToken, resetPassword} from "../controller/auth.js";
import express from "express";

export const router = express.Router();

router.post("/signup", signup)
router.post("/sendotp", sendOTP)
router.post("/login", login)
router.post("/changePassword", changePassword)
router.post("/resetToken", resetToken)
router.post("/resetPassword", resetPassword)

export default router;