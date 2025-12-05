import { Router } from "express";
import { authControllers } from "./auth.controllers";
import verify from "../../middleware/verify";


const router = Router();

//, verify("admin")
router.post('/signin' ,authControllers.signinUser);

export const authRoutes = router;
