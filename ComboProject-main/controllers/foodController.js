import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
const addFood=async(req,res)=>{
     let image_filename=`${req.file.filename}`;
     const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
     })
     try{
        await food.save();
        return res.status(200).json({message:"Food Item Added"})
     }catch(error){
        return res.status(500).json({message:"Cannot Add the Item"})
     }
}

//get all food items
const listFood=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        return res.status(200).json({
            data:foods
        });
    } catch (error) {
        return res.status(500).json({message:"Error fetching Food Items"});
    }
}
const removeItem=async(req,res)=>{
      try {
        const food=await foodModel.findById(req.body.id);
        fs.unlinkSync(`./uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({message:"Deleted Food Item"})
      } catch (error) {
        return res.status(500).json({message:"Error While deleting Food Item"})
      }
}
export {addFood,listFood,removeItem}