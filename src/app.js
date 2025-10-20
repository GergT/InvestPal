import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css';
import Home from "./home";
import Portfolio from "./portfolio";
import Dashboard from "./dashboard";
import Login from "./login";
import MyNavbar from "./components/navbar";
import Signup from "./signup";
import ProtectedRoutes from "./utils/protectedRoutes";
import PublicRoute from "./utils/publicRoute";
import Article from "./articles";
import Cookies from 'js-cookie';


function App() {
  const [token, setToken] = useState(Cookies.get('token') || null);

  return (
    <BrowserRouter>
      {/* Navbar always inside Router */}
      <MyNavbar className = "navbar" token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route 
          path="/portfolio" 
          element={
            <ProtectedRoutes token={token}>
              <Portfolio />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/feed" 
          element={
            <ProtectedRoutes token={token}>
              <Dashboard />
            </ProtectedRoutes>
          } 
        />

        <Route 
          path="/feed/:articleId" 
          element={
            <ProtectedRoutes token={token}>
              <Article />
            </ProtectedRoutes>
          } 
        />

        <Route path="/login" element={
            <PublicRoute token={token}>
              <Login setToken={setToken} />
            </PublicRoute>
          } />
        <Route path="/signup" element={
            <PublicRoute token={token}>
              <Signup setToken={setToken} />
            </PublicRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
