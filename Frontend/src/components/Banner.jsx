import React from "react";
import banner from "../../public/Banner.png";
function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-20">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Unlock a World of <br />
              <span className="text-gradient">Knowledge Everyday</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300">
              Discover a universe of books. From timeless classics to modern bestsellers, your next great adventure starts here. Join our community of avid readers.
            </p>
            <label className="input input-bordered flex items-center gap-2 rounded-full py-2 px-4 shadow-sm focus-within:shadow-md transition-shadow duration-300 dark:bg-slate-800 dark:border-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="email" className="grow outline-none bg-transparent" placeholder="Enter your email" />
            </label>
          </div>
          <button className="btn mt-6 rounded-full px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white border-none hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">Get Started</button>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center items-center">
          <img
            src={banner}
            className="md:w-[500px] drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
            alt="Hero Banner"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
