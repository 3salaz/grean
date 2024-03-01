import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Routes
import HomePage from "./Pages/HomePage";
import MenuPage from "./Pages/MenuPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";

// Components
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="h-[100svh] bg-white">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
