import brandImg from "../assets/medical-design-poster-with-original-medicinal-capsule-consisting-green-blue-parts-leaves-as-life-symbol-illustration.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "../components/Loader";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData).then(() => navigate("/"));
  };

  if (isSigningUp) {
    return (
      <div className="fixed inset-0 bg-white/40 backdrop-blur-md z-50 flex items-center justify-center">
        <Loader message="Logging in..." />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full flex flex-col md:flex-row bg-gradient-to-r from-green-50 to-green-300">
      {/* Left Image */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-6">
        <img
          src={brandImg}
          alt="Brand"
          className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/70 border border-green-600 rounded-lg shadow-lg p-6 md:p-10">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-green-500 text-center">
              Signup Yourself
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-green-500 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-green-500 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-green-500 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
