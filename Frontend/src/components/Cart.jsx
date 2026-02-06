import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any books yet!
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <button onClick={clearCart} className="btn btn-outline btn-error">
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="card card-side bg-base-100 shadow-xl dark:bg-slate-800"
                >
                  <figure className="w-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.title}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="btn btn-sm btn-circle"
                        >
                          -
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="btn btn-sm btn-circle"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="btn btn-sm btn-error mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-xl dark:bg-slate-800 sticky top-24">
                <div className="card-body">
                  <h2 className="card-title">Order Summary</h2>
                  <div className="divider"></div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-green-500">FREE</span>
                    </div>
                    <div className="divider"></div>
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary w-full mt-4">
                    Proceed to Checkout
                  </button>
                  <Link to="/course">
                    <button className="btn btn-outline w-full mt-2">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;