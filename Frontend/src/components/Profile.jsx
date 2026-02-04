import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          toast.error("Please login first");
          navigate("/user/login");
          return;
        }

        const res = await axios.get("http://localhost:4001/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load profile");
        navigate("/");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 py-10">
        <div className="mt-20 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center mb-4">
                  <span className="text-5xl text-white font-bold">
                    {user?.fullname?.[0]?.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold">{user?.fullname}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>

              <div className="divider"></div>

              {/* Profile Info */}
              <div className="space-y-4">
                <div className="p-4 bg-base-200 rounded-lg">
                  <label className="font-semibold text-sm text-gray-500">
                    Full Name
                  </label>
                  <p className="text-lg mt-1">{user?.fullname}</p>
                </div>
                
                <div className="p-4 bg-base-200 rounded-lg">
                  <label className="font-semibold text-sm text-gray-500">
                    Email Address
                  </label>
                  <p className="text-lg mt-1">{user?.email}</p>
                </div>
                
                <div className="p-4 bg-base-200 rounded-lg">
                  <label className="font-semibold text-sm text-gray-500">
                    Account ID
                  </label>
                  <p className="text-lg mt-1 font-mono text-sm">
                    {user?._id?.slice(0, 12)}...
                  </p>
                </div>
                
                {user?.createdAt && (
                  <div className="p-4 bg-base-200 rounded-lg">
                    <label className="font-semibold text-sm text-gray-500">
                      Member Since
                    </label>
                    <p className="text-lg mt-1">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
                
                <div className="mt-6">
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-primary"
                  >
                    Back to Home
                  </button>
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

export default Profile;