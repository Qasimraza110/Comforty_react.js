import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-100 to-teal-300">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="border-2 border-teal-300 p-3 rounded-lg focus:outline-none focus:border-teal-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-teal-300 p-3 rounded-lg focus:outline-none focus:border-teal-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-teal-300 p-3 rounded-lg focus:outline-none focus:border-teal-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className={`${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            } text-white font-bold py-3 rounded-lg transition`}
          >
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
