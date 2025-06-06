import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", userData);
      console.log("Signup Success:", response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-md w-80">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full mt-3" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mt-3" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mt-3" required />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="mt-4 bg-green-500 text-white p-2 w-full rounded">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;