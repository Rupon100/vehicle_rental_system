import { Router } from "express";
import { usersControllers } from "./users.controllers";
import verify from "../../middleware/verify";


const router = Router();

// public
router.post('/signup', usersControllers.createUser);

// get all users [ admin only ]
router.get('/users', verify('admin'), usersControllers.getAllUsers);

export const usersRoutes = router;
