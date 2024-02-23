import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { PickupsProvider } from "./context/PickupsContext";

// Toast Messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Routes
import Home from "./routes/Home";
import Account from "./routes/Account";
import ProtectedRoute from "./routes/ProtectedRoute";

// Components
import Navbar from "./components/Navbar";

import Admin from "./components/Admin/Admin";
import Contact from "./routes/Contact";
import About from "./routes/About";
import Services from "./routes/Services";
import { ProfileProvider } from "./context/ProfileContext";
import { LocationsProvider } from "./context/LocationContext";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <Navbar />
      <main className="absolute top-[8svh] w-full bg-grean">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <ProfileProvider>
                  <LocationsProvider>
                    <PickupsProvider>
                      <Account />
                    </PickupsProvider>
                  </LocationsProvider>
                </ProfileProvider>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </main>
    </AuthContextProvider>
  );
}

export default App;
