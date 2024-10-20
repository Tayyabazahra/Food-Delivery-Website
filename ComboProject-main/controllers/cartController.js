import { Users } from "../models/user.js";

// add items to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body; // Item ID from request body
    // Find the user by ID
    let user = await Users.findById(req.body.userId);
    let cartData=await user.cart;
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     if(!cartData[req.body.itemId]){
      cartData[req.body.itemId]=1
     }else{
      cartData[req.body.itemId]+=1
     }
     await Users.findByIdAndUpdate(
      req.body.userId,
      { cart: cartData })
      return res.status(200).json({ message: "Item added to cart" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// remove items from user cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body; // Item ID from request body

    // Find the user by ID
    let user = await Users.findById(req.body.userId);
    let cartData=await user.cart;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the cart exists and the item is in the cart
      if (cartData[itemId]>1) {
        // Decrease the quantity
        cartData[itemId]-=1
      }else{
        delete cartData[itemId];
      } 

      // Save the updated user document
     await Users.findByIdAndUpdate(req.body.userId,{cart:cartData});
      return res.status(200).json({ message: "Item removed from cart" });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//fetch user cart data
export const getCart = async (req, res) => {
  try {
    // Find the user by ID and populate the cart items
    let user = await Users.findById(req.body.userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
