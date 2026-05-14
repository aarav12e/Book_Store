import React from "react";
import { ShoppingCart, BookOpen } from "lucide-react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cards({ item }) {
  const { addToCart } = useCart();
  const [authUser] = useAuth();

  const handleBuyNow = () => {
    if (!authUser) {
      toast.error("Please login to add books to cart");
      document.getElementById("my_modal_3").showModal();
      return;
    }
    addToCart(item._id);
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:text-white border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden group">
          <figure className="relative h-64 overflow-hidden">
            <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <button
                onClick={handleBuyNow}
                className="flex items-center gap-2 bg-white/90 text-slate-800 px-4 py-2 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-white"
              >
                <ShoppingCart size={16} /> Quick Add
              </button>
            </div>
          </figure>
          <div className="card-body p-6">
            <h2 className="card-title text-xl font-bold mb-2">
              {item.name}
              <div className="badge bg-pink-100 text-pink-600 border-none dark:bg-pink-900 dark:text-pink-300 ml-2">{item.category}</div>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{item.title}</p>
            <div className="card-actions justify-between items-center mt-4">
              <div className="text-xl font-bold text-slate-800 dark:text-slate-200">${item.price}</div>
              <button
                onClick={handleBuyNow}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full bg-gradient-theme text-white font-medium hover:opacity-90 hover:shadow-lg transition-all duration-300"
              >
                <ShoppingCart size={16} />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;

