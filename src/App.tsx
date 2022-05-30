import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import "./tailwind.css";
import "./index.css";

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
