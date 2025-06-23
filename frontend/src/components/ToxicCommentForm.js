import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./style.css";


const ToxicCommentForm = () => {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState(false);
  const [accuracy, setAccuracy] = useState(null);
  const [modelTrained, setModelTrained] = useState(false);
  const [activeImage, setActiveImage] = useState(null); // Track active visualization image

  const navigate = useNavigate();

  // Train Model Simulation
  const handleTrainModel = () => {
    setTraining(true);
    setAccuracy(null);
    setTimeout(() => {
      setAccuracy(97.47); // Simulated Accuracy
      setModelTrained(true);
      setTraining(false);
    }, 4000); // 4-second delay
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modelTrained) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/predict", {
        comment,
      });

      const processedResult = Object.keys(response.data).reduce((acc, key) => {
        acc[key] = response.data[key] === "Toxic";
        return acc;
      }, {});
      setResult(processedResult);
    } catch (error) {
      console.error("Error predicting toxicity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => navigate("/login");

  const getResultStyle = (isToxic) => ({
    color: isToxic ? "white" : "black",
    backgroundColor: isToxic ? "#f44336" : "#4CAF50",
    padding: "8px 12px",
    borderRadius: "8px",
    margin: "5px 0",
    fontWeight: "bold",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    listStyle:"none",
  });

  const imageMap = {
    Image1: require("../images/Accuracy.jpeg"),
    Image2: require("../images/Comment.jpeg"),
    Image3: require("../images/Most.jpeg"),
    Image4: require("../images/Multi.jpeg"),
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Toxic Comment Classifier</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      

      {/* Train Model Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Train the Model</h2>
        <button
          onClick={handleTrainModel}
          style={{
            ...styles.button,
            background: modelTrained
              ? "linear-gradient(to right, #aaa, #888)"
              : "linear-gradient(to right, #4CAF50, #2E7D32)",
            
          }}
          disabled={modelTrained || training}
        >
          {training ? "Training..." : "Train Model"}
        </button>
        {accuracy && (
          <p style={styles.accuracyText}>
            🎉 Model Trained Successfully! Accuracy:{" "}
            <strong>{accuracy}%</strong>
          </p>
        )}
      </section>

      {/* Form Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Check Toxicity</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="5"
            placeholder="Type your comment here..."
            style={styles.textarea}
            disabled={!modelTrained}
          />
          <button className="S2 "
            type="submit"
            style={{
              ...styles.button,
              background: modelTrained
                ? "linear-gradient(to right, #4CAF50, #2E7D32)"
                : "linear-gradient(to right, #aaa, #888)",
                
            }
           }
            disabled={!modelTrained || loading}
          >
            {loading ? "Checking..." : "Check Toxicity"}
          </button>
        </form>

        {result && (
          <div style={styles.resultContainer}>
            <h3>Prediction Results:</h3>
            <ul>
              {Object.keys(result).map((key) => (
                <li  key={key} style={getResultStyle(result[key])}>
                  {key}: {result[key] ? "True" : "False"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      {/* Theory Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>About the Model</h2>
        <p style={styles.text}>
          The Toxic Comment Classifier uses a <strong>TF-IDF Vectorizer</strong>{" "}
          for feature extraction and a <strong>Logistic Regression</strong>{" "}
          model for multi-label classification. It identifies toxicity in
          comments with high accuracy and efficiency.
        </p>
      </section>

      {/* Data Visualization Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Data Visualization</h2>
        <div style={styles.buttonGroup}>
          {Object.keys(imageMap).map((key) => (
            <button
              key={key}
              style={styles.visualButton}
              onClick={() => setActiveImage(imageMap[key])}
            >
              {key}
            </button>
          ))}
        </div>
        {activeImage && (
          <div style={styles.imageContainer}>
            <img src={activeImage} alt="Visualization" style={styles.image} />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Toxic Comment Classifier. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  
  page: {
    fontFamily: "'Poppins', sans-serif",
    backgroundImage: "linear-gradient(to right,#0a9bd2,#2890b7)",
    margin: "0",
    padding: "0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    margin:"0px 0px 0px 20px",
    padding: "20px 30px",
    background: "#06d6f1",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
  card: {
    background: "#8bdcfa",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "900px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    transition: "all 0.3s ease-in-out",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
  },
  accuracyText: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: "10px",
    
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    width: "80%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    fontSize: "16px",
    color: "#333",
    fontFamily: "'Poppins', sans-serif",
    resize: "vertical",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    fontWeight:"bold",
    transition: "transform 0.3s ease-in-out",
  },
  
  
  resultContainer: {
    marginTop: "20px",
    textTransform: 'capitalize',
    
  },
  resultItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
    fontSize: "16px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  visualButton: {
    padding: "10px 20px",
    background: "#3f51b5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
  imageContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "500px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  footer: {
    padding: "20px",
    textAlign: "center",
    background: "#098fc3",
    color: "#000000",
    width: "100%",
    // position: "absolute",
    // bottom: "0",
  },
    
};

export default ToxicCommentForm;
