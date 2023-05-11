import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import { verifySignUp } from "../middlewares/index.js";
import { body} from "express-validator"

const router = Router();

router.post("/signin", authCtrl.signIn);
router.post("/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            body('email').isEmail(),
            body('password').isLength({min: 8}),
            verifySignUp.checkRoleExisted, 
        ],
        authCtrl.signUp
    );

export default router;
