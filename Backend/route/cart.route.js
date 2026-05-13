import express from "express";
import { getCart, addToCart, removeFromCart, checkoutCart } from "../controller/cart.controller.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/add/:userId", addToCart);
router.delete("/remove/:userId/:bookId", removeFromCart);
router.post("/checkout/:userId", checkoutCart);

export default router;
