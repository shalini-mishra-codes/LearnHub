

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");

        const data = res.data.filter((data) => data.category === "Free");
        console.log(data);
        setBook(data);
        setFilteredBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  // Search function
  useEffect(() => {
    const results = book.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, book]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium veritatis alias pariatur ad dolor repudiandae eligendi
            corporis nulla non suscipit, iure neque earum?
          </p>

          {/* Search Bar for Free Books */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search free books..."
              className="w-full md:w-1/2 px-4 py-2 border rounded-md outline-none focus:border-pink-500 dark:bg-slate-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Found {filteredBooks.length} free book(s)
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          {filteredBooks.length > 0 ? (
            <Slider {...settings}>
              {filteredBooks.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </Slider>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                No free books found for "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Freebook;