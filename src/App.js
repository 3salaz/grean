import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navigation/Navbar";
import LoginComponent from "./components/Auth/LoginComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import { MenuProvider } from "./context/MenuContext";
import ErrorBoundary from './components/ErrorBoundry';
import Preorder from "./components/Preorder";

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
                  <Route path="/preorder" element={<Preorder />} />
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



// {steps.map((step, index) => (
//   <Step
//     key={index}
//     title={
//       <motion.div
//         initial={{ scale: 1 }}
//         animate={{
//           scale: currentStep === index ? 1 : .8,
//           color: currentStep === index ? "#75B657" : "#000",
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         {step.title}
//       </motion.div>
//     }
//     icon={
//       <motion.div
//         initial={{ scale: 1 }}
//         className="bg-mGreen text-white w-10 h-10 rounded-full flex items-center justify-center"
//         animate={{
//           scale: currentStep === index ? 1 : .5,
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         {index + 1}
//       </motion.div>
//     }
//   />
// ))}