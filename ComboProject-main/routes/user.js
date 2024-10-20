import { Router } from "express";
import bcrypt from "bcrypt";
import { Users } from "../models/user.js"; // Use import instead of require
import jwt from 'jsonwebtoken';
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

// SIGN UP
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 4" });
    }
    // if username already exists
    const user = await Users.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // if email already exists
    const emailExists = await Users.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password should be greater than 5" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    return res.status(200).json({ message: "Sign Up Successful" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "basanti", {
      expiresIn: "1h",
    });
    res.status(200).json({id:user._id,role:user.role,token:token });
  } catch (error) {
    res.status(500).json({ error: "Login Failed"});
  }
});
router.get("/user-info",verifyToken,async (req,res)=>{
    try{
        const {id}=req.headers;
    const user=await Users.findById(id);
    res.status(200).json({user});
    }catch(error){
        res.status(500).json({error:"Invalid Token"});
    }
    
})
export default router;
