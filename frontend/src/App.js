import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import ToxicCommentForm from "./components/ToxicCommentForm";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          {/* Use element prop with JSX */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/toxic-comment-form" element={<ToxicCommentForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
