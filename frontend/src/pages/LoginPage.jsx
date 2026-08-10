import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { login } from '../features/authSlice'; 

function LoginPage() {
  const { isUserLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Yup validation schema including terms checkbox
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    agreeTerms: yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      agreeTerms: false
    }
  });

  const onSubmit = async (data) => {
    try {
      // 🟢 FIX 1: unwrap() use karke direct fresh API response object fetch karein
      const result = await dispatch(login({ email: data.email, password: data.password })).unwrap();
      
      // 🟢 FIX 2: Safe role checking
      const role = result?.user?.role || result?.savedUser?.role;

      if (role === "staff") {
        navigate('/StaffDashboard');
      } else if (role === "admin") {
        navigate('/AdminDashboard');
      } else {
        navigate('/ManagerDashboard');
      }
    } catch (error) {
      console.error("Error in Login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-full sm:w-1/2 p-6 flex items-center justify-center bg-white shadow-lg rounded-xl">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">InventoryPro</h1>
            <p className="text-gray-600">by TechSolutions Inc.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="agreeTerms" 
                  {...register("agreeTerms")} 
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                />
                <label htmlFor="agreeTerms" className="text-gray-600 text-sm">Agree on terms and conditions</label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUserLogin}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
            >
              {isUserLogin ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to='/SignupPage' className="text-blue-600 hover:underline font-medium">Click here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Branding Banner */}
      <div className="w-full sm:w-1/2 p-10 bg-black text-white flex flex-col justify-center rounded-r-xl">
        <h2 className="font-bold mb-4 text-4xl">Efficient Inventory Management</h2>
        <p className="mb-6 text-lg font-medium text-gray-300">
          Streamline your operations with real-time tracking, automated reports, and seamless integrations.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
