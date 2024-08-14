import express from 'express';
import { auth } from '../controller/authController.js';
export const router = express.Router();
router.post("/login",auth)
