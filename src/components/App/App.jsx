import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import css from "./App.module.css";

import SharedLayout from "../SharedLayout/SharedLayout";
import Loader from "../Loader/Loader";

import { selectIsRefresh } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
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
    dispatch(refreshUser);
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <SharedLayout>
      <Suspense fallback={null}>
        <div className={css.container}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={<SignupPage />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="/sigin"
              element={
                <RestrictedRoute
                  component={<SigninPage />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute component={<HomePage />} redirectTo="/singin" />
              }
            />
          </Routes>
        </div>
      </Suspense>
    </SharedLayout>
  );
}
