import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add to Cart
  const addToCart = (book) => {
    const existingItem = cartItems.find((item) => item._id === book._id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success("Quantity increased!");
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
      toast.success("Added to cart!");
    }
  };

  // Remove from Cart
  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter((item) => item._id !== bookId));
    toast.success("Removed from cart!");
  };

  // Update Quantity
  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) {
      removeFromCart(bookId);
      return;
    }
    
    setCartItems(
      cartItems.map((item) =>
        item._id === bookId ? { ...item, quantity } : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared!");
  };

  // Get Cart Total
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get Cart Count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Add to Wishlist
  const addToWishlist = (book) => {
    const existingItem = wishlistItems.find((item) => item._id === book._id);
    
    if (existingItem) {
      toast.error("Already in wishlist!");
      return;
    }
    
    setWishlistItems([...wishlistItems, book]);
    toast.success("Added to wishlist!");
  };

  // Remove from Wishlist
  const removeFromWishlist = (bookId) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== bookId));
    toast.success("Removed from wishlist!");
  };

  // Check if item is in wishlist
  const isInWishlist = (bookId) => {
    return wishlistItems.some((item) => item._id === bookId);
  };

  // Move from Wishlist to Cart
  const moveToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book._id);
  };

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};