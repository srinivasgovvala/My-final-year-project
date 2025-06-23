import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Change from useHistory to useNavigate

const ToxicCommentForm = () => {
  const [comment, setComment] = useState(""); // State to store the comment input
  const [result, setResult] = useState(null); // State to store the prediction result
  const [loading, setLoading] = useState(false); // State to manage loading state

  const navigate = useNavigate(); // Using useNavigate for redirect

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    setLoading(true); // Start loading before making the request

    try {
      // Send the comment to the backend for toxicity prediction
      const response = await axios.post("http://localhost:5001/predict", {
        comment,
      });

      // Process the result to convert "Toxic" to true and "Not Toxic" to false
      const processedResult = Object.keys(response.data).reduce((acc, key) => {
        acc[key] = response.data[key] === "Toxic"; // Convert to true/false
        return acc;
      }, {});

      // Update result with the processed data
      setResult(processedResult);
    } catch (error) {
      console.error("Error predicting toxicity:", error);
    } finally {
      setLoading(false); // End loading after request is complete
    }
  };

  // Function to get dynamic styles based on the result
  const getResultStyle = (isToxic) => {
    return {
      color: isToxic ? "white" : "black", // Text color
      backgroundColor: isToxic ? "#f44336" : "#4CAF50", // Red for true, Green for false
      padding: "5px 10px",
      borderRadius: "5px",
      margin: "5px 0",
      fontWeight: "bold",
    };
  };

  // Logout function
  const handleLogout = () => {
    // Redirect to login page using navigate
    navigate("/login");
  };

  return (
    <div style={styles.formContainer}>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
      <h2 style={styles.header}>Toxic Comment Classifier</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)} // Update comment state on change
          rows="5"
          cols="50"
          placeholder="Type your comment here..."
          style={styles.textarea}
        />
        <br />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Checking..." : "Check Toxicity"}
        </button>
      </form>

      {result && (
        <div style={styles.resultContainer}>
          <h3>Prediction Results:</h3>
          <ul>
            {Object.keys(result).map((key) => (
              <li key={key} style={getResultStyle(result[key])}>
                {key}: {result[key] ? "True" : "False"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    border: "2px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    position: "relative", // For positioning the logout button
  },
  logoutButton:{
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    margin: "15px 0",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  resultContainer: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default ToxicCommentForm;
