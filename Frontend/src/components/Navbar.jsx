import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import { useAppTheme } from "../context/ThemeProvider";
import { ShoppingCart, Palette, Search, Menu as MenuIcon, Sun, Moon } from "lucide-react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";

function Navbar() {
  const [authUser] = useAuth();
  const { cart, setIsCartOpen } = useCart();
  const { mode, setMode, colorOption, setColorOption } = useAppTheme();
  
  const [sticky, setSticky] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/" className="hover:text-primary transition-colors duration-200 font-medium">Home</Link>
      </li>
      <li>
        <Link to="/course" className="hover:text-primary transition-colors duration-200 font-medium">Course</Link>
      </li>
      <li>
        <a href="#contact" className="hover:text-primary transition-colors duration-200 font-medium cursor-pointer">Contact</a>
      </li>
      <li>
        <a href="#about" className="hover:text-primary transition-colors duration-200 font-medium cursor-pointer">About</a>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          sticky ? "glassmorphism py-2" : "py-4 bg-transparent"
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <MenuIcon />
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-slate-800">
                {navItems}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-bold cursor-pointer flex items-center gap-2">
              <span className="text-gradient">BookStore</span>
            </Link>
          </div>
          
          <div className="navbar-end space-x-2 md:space-x-4 flex items-center">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            
            {/* Search */}
            <div className="hidden md:block">
              <label className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-full flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 focus-within:ring-2 ring-primary transition-all">
                <input type="text" className="grow outline-none bg-transparent w-32 focus:w-48 transition-all" placeholder="Search..." />
                <Search size={18} className="text-slate-400" />
              </label>
            </div>

            {/* Theme Selector */}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
              <Palette size={20} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => { setMode(mode === "dark" ? "light" : "dark"); setAnchorEl(null); }}>
                {mode === "dark" ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />} 
                Toggle Dark Mode
              </MenuItem>
              <MenuItem onClick={() => { setColorOption("pink"); setAnchorEl(null); }}>Pink Theme</MenuItem>
              <MenuItem onClick={() => { setColorOption("ocean"); setAnchorEl(null); }}>Ocean Theme</MenuItem>
              <MenuItem onClick={() => { setColorOption("forest"); setAnchorEl(null); }}>Forest Theme</MenuItem>
              <MenuItem onClick={() => { setColorOption("sunset"); setAnchorEl(null); }}>Sunset Theme</MenuItem>
            </Menu>

            {/* Cart */}
            <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
              <Badge badgeContent={cart?.items?.length || 0} color="primary">
                <ShoppingCart size={20} />
              </Badge>
            </IconButton>

            {/* Auth */}
            {authUser ? (
              <Logout />
            ) : (
              <div>
                <button
                  className="bg-gradient-theme text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity font-medium shadow-md"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </button>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
