import { Router } from "express";
import { authControllers } from "./auth.controllers";


const router = Router();

//
router.post('/signin', authControllers.signinUser);

export const authRoutes = router;
