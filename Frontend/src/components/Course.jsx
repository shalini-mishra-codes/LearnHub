// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import axios from "axios";
// import { Link } from "react-router-dom";
// function Course() {
//   const [book, setBook] = useState([]);
//   useEffect(() => {
//     const getBook = async () => {
//       try {
//         const res = await axios.get("http://localhost:4001/book");
//         console.log(res.data);
//         setBook(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getBook();
//   }, []);
//   return (
//     <>
//       <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
//         <div className="mt-28 items-center justify-center text-center">
//           <h1 className="text-2xl  md:text-4xl">
//             We're delighted to have you{" "}
//             <span className="text-pink-500"> Here! :)</span>
//           </h1>
//           <p className="mt-12">
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
//             assumenda? Repellendus, iste corrupti? Tempore laudantium
//             repellendus accusamus accusantium sed architecto odio, nisi expedita
//             quas quidem nesciunt debitis dolore non aspernatur praesentium
//             assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
//             animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
//             consequatur!
//           </p>
//           <Link to="/">
//             <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
//               Back
//             </button>
//           </Link>
//         </div>
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          
//           {book.map((item) => (
//             <Cards item={item} key={item._id} /> // ✅ _id use karo
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Course;


import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();

    // Navbar se search term get karo
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  // Search and Filter function
  useEffect(() => {
    let results = book;

    // Category filter
    if (selectedCategory !== "All") {
      results = results.filter((item) => item.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(results);
  }, [searchTerm, selectedCategory, book]);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            assumenda? Repellendus, iste corrupti? Tempore laudantium
            repellendus accusamus accusantium sed architecto odio, nisi expedita
            quas quidem nesciunt debitis dolore non aspernatur praesentium
            assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
            animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
            consequatur!
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search books by name, title, or category..."
              className="w-full md:w-1/2 px-4 py-3 border rounded-md outline-none focus:border-pink-500 dark:bg-slate-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                selectedCategory === "All"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 dark:bg-slate-700 hover:bg-pink-200 dark:hover:bg-slate-600"
              }`}
            >
              All Books
            </button>
            <button
              onClick={() => setSelectedCategory("Free")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                selectedCategory === "Free"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 dark:bg-slate-700 hover:bg-pink-200 dark:hover:bg-slate-600"
              }`}
            >
              Free
            </button>
            <button
              onClick={() => setSelectedCategory("Paid")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                selectedCategory === "Paid"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 dark:bg-slate-700 hover:bg-pink-200 dark:hover:bg-slate-600"
              }`}
            >
              Paid
            </button>
          </div>

          {/* Results Count */}
          {(searchTerm || selectedCategory !== "All") && (
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Showing {filteredBooks.length} book(s)
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory} category`}
            </p>
          )}

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* Books Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => <Cards item={item} key={item._id} />)
          ) : (
            <div className="col-span-4 text-center py-10">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No books found
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory} category`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;