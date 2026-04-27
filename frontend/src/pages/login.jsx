import React, { useState } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(formData.email, formData.password);

      navigate("/"); // go to dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Sign in to continue managing your renovation projects</p>

        {/* ✅ ERROR MESSAGE */}
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ BUTTON WITH LOADING */}
          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;