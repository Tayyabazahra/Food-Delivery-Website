import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js";
import verifyToken from "../middleware/authMiddleware.js";
const router=express.Router();

router.post("/addToCart",verifyToken,addToCart);
router.post("/removeFromCart",verifyToken,removeFromCart);
router.post("/getCart",verifyToken,getCart)



export default router;