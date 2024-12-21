import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";

import css from "./App.module.css";

import SharedLayout from "../SharedLayout/SharedLayout";
import Loader from "../Loader/Loader";

import { selectIsRefresh } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { fetchUser } from "../../redux/user/operations";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));
const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

export default function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
      <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Bounce} />
    <SharedLayout>
      <Suspense fallback={null}>
        <div className={css.container}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={SignupPage}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  component={SigninPage}
                  redirectTo="/home"
                />

              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute component={<HomePage />} redirectTo="/signin" />
              }
            />
          </Routes>
        </div>
      </Suspense>
        </SharedLayout>
        </>
  );
}
