import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:4001"}/book`);
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            We're delighted to have you{" "}
            <span className="text-gradient"> Here! :)</span>
          </h1>
          <p className="mt-8 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore our vast collection of premium courses designed to elevate your skills. From programming to design, we have something for everyone. Start your journey today!
          </p>
          <Link to="/">
            <button className="mt-8 px-8 py-3 rounded-full bg-gradient-theme text-white font-medium hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Back to Home
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
