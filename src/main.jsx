import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/authentication/Login/Login.jsx";
import Register from "./components/authentication/Register/Register.jsx";
import Home from "./components/User/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import NotFound from "./components/NotFound/Notfound.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import PartnerRegister from "./components/authentication/Register/PartnerRegister.jsx";
import Menu from "./components/Partner/Menu.jsx";
import AddDish from "./components/Partner/AddDish.jsx";
import PartnerOrders from "./components/Partner/PartnerOrders.jsx";
import Bag from "./components/User/Bag.jsx";
import Orders from "./components/User/Orders.jsx";
import ContactUs from "./components/User/ContactUs.jsx";
import Restaurant from "./components/Restaurant/Restaurant.jsx";
import PaymentSuccess from "./components/Payment/PaymentSuccess.jsx";
import PaymentFailure from "./components/Payment/PaymentFailure.jsx";
import ResetPassword from "./components/authentication/Login/ResetPassword.jsx";
import UserProfile from "./components/Profile/UserProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route
        path=""
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="partner-menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="partner-add-items"
        element={
          <ProtectedRoute>
            <AddDish />
          </ProtectedRoute>
        }
      />
      <Route
        path="partner-orders"
        element={
          <ProtectedRoute>
            <PartnerOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="bag"
        element={
          <ProtectedRoute>
            <Bag />
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="contact-us"
        element={
          <ProtectedRoute>
            <ContactUs />
          </ProtectedRoute>
        }
      />
      <Route
        path="restaurants/:restaurantId"
        element={
          <ProtectedRoute>
            <Restaurant />
          </ProtectedRoute>
        }
      />

      <Route
        path="payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="payment-failure"
        element={
          <ProtectedRoute>
            <PaymentFailure />
          </ProtectedRoute>
        }
      />

      <Route
        path="my-profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route path="partner-registration" element={<PartnerRegister />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
