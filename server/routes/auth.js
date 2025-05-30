import express from "express";
import { signup, login, logout, getUserDetails } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", getUserDetails);
export default router;
