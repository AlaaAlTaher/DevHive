import express from "express";
//import { } from "../controllers/chat.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/id", verifyToken, getChat);
//router.get("/:id", verifyToken, getUser);  // verifyToken need to be loggin

router.post("/id", verifyToken, addChat);
router.get("/id", verifyToken, getChat);
router.get("/id", verifyToken, getChat);
export default router;
