import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    // Sending login request to the backend
    try {
      const response = await fetch("https://my-final-year-project-pnxd.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if the login was successful
      if (response.ok) {
        console.log("Login successful:", data.message);
        navigate("/toxic-comment-form"); // Redirect to the toxic comment form
      } else {
        console.log("Login failed:", data.message);
        alert(data.message); // Show the error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.header}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

// Inline styles for Login
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0", // Light background for the page
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "400px",
    margin: "auto",
    padding: "40px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "background-color 0.1s",
   // Animation:"redi 0.5s"
  },
  buttonHover: {
    backgroundColor: "#45a049", // Slightly darker green on hover
  },/*
  @KeyframeEffect redi{
    0%{backgroundColor:"red"},
    50%{backgroundColor:"green"},
    100%{backgroundColor:"blue"},
  },*/
  linkText: {
    marginTop: "15px",
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
