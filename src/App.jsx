import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Footer from './Component/Footer'

import LandingPage from './Component/LandingPage'
import Navbar from './Component/Navbar'
import LoginPage from "./Login/login";
import SignupPage from "./Singup/Signup";
import Dashboard from "./Component/Dashboard";
import ProtectRoute from "./Component/ProtectRoute";


function App() {

  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <LandingPage />
          <Footer/>
        </> }/>
      {/* Navigation Menu */}
        
        <Route path="/Component/SignupForm" element={<SignupPage />} />
        <Route path="/Component/LoginForm" element={<LoginPage />} />
        <Route element={<ProtectRoute />}>
        <Route path="/Component/Dashboard" element={<Dashboard />} />
        </Route>
        
    
        
      </Routes>
    </Router>
    </>
  )
}

export default App
