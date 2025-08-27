import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Portfolio from "./portfolio";
import Dashboard from "./dashboard";
import Login from "./login";
import MyNavbar from "./components/navbar";
import Signup from "./signup";
import ProtectedRoutes from "./utils/protectedRoutes";
import PublicRoute from "./utils/publicRoute";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  return (
    <BrowserRouter>
      {/* Navbar always inside Router */}
      <MyNavbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route 
          path="/portfolio" 
          element={
            <ProtectedRoutes user={user}>
              <Portfolio />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoutes user={user}>
              <Dashboard />
            </ProtectedRoutes>
          } 
        />

        <Route path="/login" element={
            <PublicRoute user={user}>
              <Login setUser={setUser} />
            </PublicRoute>
          } />
        <Route path="/signup" element={
            <PublicRoute user={user}>
              <Signup setUser={setUser} />
            </PublicRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
