import express from "express";
import { chatbot } from "../controllers/chatbot.js";

const router = express.Router();

router.post("/searchChatProduct", chatbot);

export default router;
