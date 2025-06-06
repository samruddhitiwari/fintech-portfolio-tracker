import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../utils/api";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(loginData); // ✅ Using API utility
      if (response?.data?.token) {
        localStorage.setItem("jwtToken", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-md w-80">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mt-3" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mt-3" required />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 w-full rounded">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;