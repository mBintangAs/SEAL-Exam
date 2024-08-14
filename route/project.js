import express from 'express';
import { authenticateToken, isAdmin } from '../controller/authController.js';
import { destroy, index, store, update } from '../controller/projectController.js';
export const router = express.Router();


router.get("/project",authenticateToken,index)
router.post("/project",authenticateToken,isAdmin,store)
router.put("/project/:id",authenticateToken,isAdmin,update)
router.delete("/project/:id",authenticateToken,isAdmin,destroy)