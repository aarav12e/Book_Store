import React from "react";
import { Drawer, IconButton, Typography, Button, Divider, Box, Avatar } from "@mui/material";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartProvider";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, checkout } = useCart();

  const total = cart.items.reduce((sum, item) => sum + (item.bookId.price * item.quantity), 0);

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
      <Box sx={{ width: { xs: 300, sm: 400 }, p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <ShoppingBag /> Your Cart
          </Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <X />
          </IconButton>
        </Box>
        <Divider />

        <Box flex={1} overflow="auto" py={2}>
          {cart.items.length === 0 ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" color="text.secondary">
              <ShoppingBag size={48} opacity={0.5} />
              <Typography mt={2}>Your cart is empty.</Typography>
            </Box>
          ) : (
            cart.items.map((item) => (
              <Box key={item.bookId._id} display="flex" alignItems="center" gap={2} mb={2} p={1} borderRadius={2} sx={{ bgcolor: "background.paper", boxShadow: 1 }}>
                <Avatar src={item.bookId.image} variant="rounded" sx={{ width: 60, height: 80 }} />
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>{item.bookId.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  <Typography variant="subtitle2" color="primary" fontWeight="bold">${item.bookId.price}</Typography>
                </Box>
                <IconButton color="error" onClick={() => removeFromCart(item.bookId._id)}>
                  <Trash2 size={20} />
                </IconButton>
              </Box>
            ))
          )}
        </Box>

        <Box pt={2}>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large" 
            onClick={checkout}
            disabled={cart.items.length === 0}
            sx={{ borderRadius: 8, py: 1.5, fontWeight: "bold" }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
