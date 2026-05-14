import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    
    const signupPromise = axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:4001"}/user/signup`, userInfo);
    
    toast.promise(signupPromise, {
      loading: 'Creating your account...',
      success: (res) => {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate(from, { replace: true });
          window.location.reload();
        }, 1000);
        return "Signup Successfully";
      },
      error: (err) => `Error: ${err.response?.data?.message || err.message}`
    });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
        <div className="w-full max-w-md px-4">
          <div className="modal-box glassmorphism rounded-2xl p-8 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-all duration-300"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-2">
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
                <button className="w-full bg-gradient-theme text-white font-medium rounded-xl px-4 py-3 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Signup
                </button>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Already have an account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
