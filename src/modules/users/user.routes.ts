import { Router } from "express";
import { usersControllers } from "./users.controllers";
import verify from "../../middleware/verify";


const router = Router();

// public
router.post('/auth/signup', usersControllers.createUser);

// get all users [ admin only ]
router.get('/users', verify('admin'), usersControllers.getAllUsers);

// update user [ admin or customer ]
router.put('/users/:userId', verify('admin', 'customer'), usersControllers.updateUser);

export const usersRoutes = router;
