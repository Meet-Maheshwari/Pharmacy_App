import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import MainProduct from "./pages/MainProduct";
import OrdersPage from "./pages/OrdersPage";
import ChatBotPage from "./pages/ChatBotPage";
import ScrollToTop from "./components/ScrollToTop";
import DirectOrder from "./pages/DirectOrder";
import Loader from "./components/Loader";
import { useLocation } from "react-router-dom";

function App() {
  const { userData, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth, isCheckingAuth]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      {isCheckingAuth && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={!userData ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route path="/orders/:id" element={<DirectOrder />} />
        <Route
          path="/orders"
          element={
            userData ? (
              <OrdersPage />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />

        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<MainProduct />} />

        <Route
          path="/chatbot"
          element={
            userData ? (
              <ChatBotPage />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
