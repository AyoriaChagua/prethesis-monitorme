import { Router } from "express";
import * as userCrtl from "../controllers/user.controller.js";
import { authJwt } from "../middlewares/index.js";

const router = Router();

router.get("/details", authJwt.verifyToken, userCrtl.getUserById);
router.get("/",
    [authJwt.verifyToken, authJwt.isAdmin],
    userCrtl.getUsers
    );

export default router;
