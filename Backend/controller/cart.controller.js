import Cart from "../model/cart.model.js";

// Get user cart
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        let cart = await Cart.findOne({ userId }).populate('items.bookId');
        
        if (!cart) {
            cart = await Cart.create({ userId, items: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bookId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ bookId, quantity }] });
        } else {
            // Check if item exists
            const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({ bookId, quantity: quantity || 1 });
            }
        }

        await cart.save();
        cart = await cart.populate('items.bookId');
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
        await cart.save();
        cart = await cart.populate('items.bookId');
        
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Checkout/Clear cart
export const checkoutCart = async (req, res) => {
    try {
        const { userId } = req.params;
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Logic for orders would go here
        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Checkout successful", cart });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
