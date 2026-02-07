
import React from "react";
import { useCart } from "../context/CartProvider";

function Cards({ item }) {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();

  const handleWishlistClick = () => {
    if (isInWishlist(item._id)) {
      removeFromWishlist(item._id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between items-center">
              <div className="badge badge-outline">₹{item.price}</div>
              <div className="flex gap-2">
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistClick}
                  className={`btn btn-sm ${
                    isInWishlist(item._id)
                      ? "btn-error text-white"
                      : "btn-outline"
                  }`}
                >
                  {isInWishlist(item._id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(item)}
                  className="btn btn-sm btn-primary"
                >
                  🛒 Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;