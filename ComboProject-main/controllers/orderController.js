import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import { Users } from "../models/user.js";

const stripe = new Stripe("sk_test_51PmbIE04qUHfb54BPoLrEweKHkgfoQMUvimUZLPD5TFRGX9ih5MZtlkpWojjufLBEwRFOnnJDl4JJgskaJRj6BXS009EGgyV8A");

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await Users.findByIdAndUpdate(req.body.userId, { cart: [] });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `http://localhost:3000/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:3000/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body  
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            return res.status(200).json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            return res.status(200).json({success:true,message:"Paid"});
        }

      } catch (error) {
        return res.status(500).json({success:false,message:"Error"});
      }
}
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId})
        return res.status(200).json({success:true,data:orders})
    } catch (error) {
        return res.status(500).json({success:false,message:"Error"});
    }
}
//list orders for admin
const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        return res.status(200).json({success:true,data:orders})
    } catch (error) {
        return res.status(500).json({success:false,message:"Error"});
    }
}
//for updating order status in admin panel
const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        return res.status(200).json({success:true,message:"Updated"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Error"});
    }
}
export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus };
