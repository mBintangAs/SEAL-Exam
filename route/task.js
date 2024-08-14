import express from 'express';
import { authenticateToken, isAdmin } from '../controller/authController.js';
import { destroy, index, store, update } from '../controller/taskController.js';
export const router = express.Router();


router.get("/task",authenticateToken,index)
router.post("/task",authenticateToken,store)
router.put("/task/:id",authenticateToken,update)
router.delete("/task/:id",authenticateToken,destroy)