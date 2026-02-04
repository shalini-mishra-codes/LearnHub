import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

function Admin() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Contacts
  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:4001/contact");
      setContacts(response.data.data || response.data);
    } catch (err) {
      setError("Failed to fetch contacts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:4001/user");
      setUsers(response.data || []);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Books
  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:4001/book");
      setBooks(response.data || []);
    } catch (err) {
      setError("Failed to fetch books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await axios.delete(`http://localhost:4001/contact/${id}`);
      alert("Message deleted successfully");
      fetchContacts();
    } catch (err) {
      alert("Failed to delete message");
      console.error(err);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === "contacts") fetchContacts();
    if (activeTab === "users") fetchUsers();
    if (activeTab === "books") fetchBooks();
  }, [activeTab]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-slate-900 dark:text-white pt-28 px-6 md:px-20 pb-20">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-5xl font-extrabold">
            Admin <span className="text-pink-500">Dashboard</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Manage your bookstore data - contacts, users, and books
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "contacts"
                  ? "bg-pink-500 text-white"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-slate-700"
              }`}
            >
              📧 Contact Messages ({contacts.length})
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "users"
                  ? "bg-pink-500 text-white"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-slate-700"
              }`}
            >
              👥 Users ({users.length})
            </button>

            <button
              onClick={() => setActiveTab("books")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "books"
                  ? "bg-pink-500 text-white"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-slate-700"
              }`}
            >
              📚 Books ({books.length})
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              ❌ {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
          )}

          {/* Contact Messages Tab */}
          {!loading && activeTab === "contacts" && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-pink-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">#</th>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Message</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-gray-500">
                          No contact messages yet
                        </td>
                      </tr>
                    ) : (
                      contacts.map((contact, index) => (
                        <tr
                          key={contact._id}
                          className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium">{contact.name}</td>
                          <td className="px-6 py-4">{contact.email}</td>
                          <td className="px-6 py-4 max-w-xs truncate" title={contact.message}>
                            {contact.message}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {new Date(contact.createdAt).toLocaleDateString("en-IN")}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteContact(contact._id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {!loading && activeTab === "users" && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-pink-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">#</th>
                      <th className="px-6 py-4 text-left">Full Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-10 text-gray-500">
                          No users registered yet
                        </td>
                      </tr>
                    ) : (
                      users.map((user, index) => (
                        <tr
                          key={user._id}
                          className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium">{user.fullname}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4 text-sm">
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString("en-IN")
                              : "N/A"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Books Tab */}
          {!loading && activeTab === "books" && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-pink-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">#</th>
                      <th className="px-6 py-4 text-left">Image</th>
                      <th className="px-6 py-4 text-left">Title</th>
                      <th className="px-6 py-4 text-left">Category</th>
                      <th className="px-6 py-4 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-10 text-gray-500">
                          No books available
                        </td>
                      </tr>
                    ) : (
                      books.map((book, index) => (
                        <tr
                          key={book._id}
                          className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">
                            <img
                              src={book.image}
                              alt={book.name}
                              className="w-12 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4 font-medium">{book.name}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                book.category === "Free"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              {book.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold">
                            {book.price === 0 ? "Free" : `₹${book.price}`}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2">📧 Total Messages</h3>
              <p className="text-4xl font-bold">{contacts.length}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2">👥 Total Users</h3>
              <p className="text-4xl font-bold">{users.length}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2">📚 Total Books</h3>
              <p className="text-4xl font-bold">{books.length}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Admin;