import express from "express"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"
import verifyToken from "../middleware/authMiddleware.js";
const router=express.Router()
router.post("/placeOrder",verifyToken,placeOrder);
router.post("/verify",verifyOrder)
router.post("/userOrders",verifyToken,userOrders)
router.get("/listOrders",listOrders)
router.post("/updateStatus",updateStatus)
export default router;
