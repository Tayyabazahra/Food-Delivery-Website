import { Router } from "express";
import  verifyToken  from "../middleware/authMiddleware.js"; // Use import instead of require

 const router = Router();

// Protected route
 router.get('/', verifyToken, (req, res) => {
 res.status(200).json({ message: 'Protected route accessed' });
 });

export default router;