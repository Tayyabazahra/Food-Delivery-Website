import express from "express"
import { addFood, listFood, removeItem } from "../controllers/foodController.js";
import multer from "multer"

const router = express.Router();

//Image Storage Engine

const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:Storage})
router.post("/addFood",upload.single("image"),addFood);
router.get("/listFood",listFood);
router.post("/removeFood",removeItem);
export default router
