import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Login, Main } from "./containers";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { faseInOut } from "./animations";
import {
  Alert,
  MainLoader,
  UserOrders,
  CheckoutSuccess,
  AboutUs,
} from "./components";
import { getCartItems } from "./api";
import { setCartItems } from "./context/actions/cartActions";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const ProtectedRoute = ({ path, element }) => {
    if (user) {
      return element;
    } else {
      navigate("/login", { replace: true });
    }
  };

  const AdminRoute = ({ path, element }) => {
    if (user?.user_id === process.env.REACT_APP_ADMIN_USER) {
      return element;
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          const data = jwt_decode(token);
          if (data) {
            getCartItems(data?.user_id).then((items) => {
              dispatch(setCartItems(items));
            });
          }
          //we can dispatch this data using the acion we created to the reducer thus accessing the state in the store
          dispatch(setUserDetails(data));
        });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...faseInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={<AdminRoute element={<Dashboard />} />}
        />
        <Route
          path="/checkout/*"
          element={<ProtectedRoute element={<CheckoutSuccess />} />}
        />
        <Route
          path="/user-orders/*"
          element={<ProtectedRoute element={<UserOrders />} />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>

      {alert?.type && <Alert type={alert.type} message={alert.message} />}
    </div>
  );
};

export default App;
