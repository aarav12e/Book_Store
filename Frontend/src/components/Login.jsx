import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    
    const loginPromise = axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:4001"}/user/login`, userInfo);
    
    toast.promise(loginPromise, {
      loading: 'Logging in...',
      success: (res) => {
        document.getElementById("my_modal_3").close();
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return "Logged In Successfully";
      },
      error: (err) => `Error: ${err.response?.data?.message || err.message}`
    });
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal backdrop-blur-sm">
        <div className="modal-box glassmorphism rounded-2xl p-8 dark:text-white max-w-md w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Login</h3>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-all duration-300"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-all duration-300"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-xl px-4 py-3 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                Login
              </button>
              <p className="text-center text-slate-600 dark:text-slate-400">
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
