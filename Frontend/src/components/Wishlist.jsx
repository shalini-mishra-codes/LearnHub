import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save your favorite books here!
            </p>
            <Link to="/course">
              <button className="btn btn-primary">Browse Books</button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 py-10">
        <div className="mt-20">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-xl dark:bg-slate-800"
              >
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {item.name}
                    <div className="badge badge-secondary">{item.category}</div>
                  </h2>
                  <p>{item.title}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="text-xl font-bold">₹{item.price}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveToCart(item)}
                        className="btn btn-sm btn-primary"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="btn btn-sm btn-error"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;