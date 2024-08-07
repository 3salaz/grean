import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navigation/Navbar";
import LoginComponent from "./components/Auth/LoginComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import { MenuProvider } from "./context/MenuContext";
import ErrorBoundary from './components/ErrorBoundry';
import OrderForm from "./components/OrderForm";

const HomePage = lazy(() => import("./pages/HomePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function App() {
  return (
    <div className="h-[100svh] relative">
      <Router>
        <Navbar />
        <main className="snap-y snap-mandatory overflow-y-scroll h-[92%] w-full">
          <MenuProvider>
            <ErrorBoundary>
              <Suspense fallback={<div role="status" aria-live="polite">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/preorder" element={<OrderForm />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </MenuProvider>
        </main>
      </Router>
    </div>
  );
}

export default App;

