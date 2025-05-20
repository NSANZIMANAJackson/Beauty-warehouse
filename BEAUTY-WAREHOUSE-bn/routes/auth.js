import { Router } from "express";
const router = Router();
import { login, signup } from "../controller/auth.js";
router.route("/login").post(login);
router.route("/signup").post(signup);

export default router;
