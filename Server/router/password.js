import express from "express";
import { changePassword, resetPassword, verifyOTP } from "../controller/password.js";
const router = express.Router();

router.post("/resetPassword",resetPassword);
router.post("/verifyOTP",verifyOTP);
router.post("/changePassword",changePassword);

export default router;
