import express from 'express';
import { authenticateToken, isAdmin } from '../controller/authController.js';
import { destroy, index, store, update } from '../controller/employeeController.js';
export const router = express.Router();



router.get("/employee", authenticateToken, index)
router.post("/employee", authenticateToken, isAdmin, store)
router.put("/employee/:id", authenticateToken, isAdmin, update)
router.delete("/employee/:id", authenticateToken, isAdmin, destroy)