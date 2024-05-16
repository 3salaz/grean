import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Routes
import HomePage from "./pages/HomePage";
// Components
import Navbar from "./components/Navigation/Navbar";
import LoginComponent from "./components/Auth/LoginComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <div className="h-[100svh] bg-white relative">
      <Router>
        <Navbar />
        <MenuProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MenuProvider>
      </Router>
    </div>
  );
}

export default App;
