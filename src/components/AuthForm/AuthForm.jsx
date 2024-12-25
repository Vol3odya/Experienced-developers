import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../redux/auth/operations";
import { selectIsLoading, selectIsEror } from "../../redux/auth/selectors";
import sprite from "../../images/svg/symbol-defs.svg";
import classNames from "classnames";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import s from "./AuthForm.module.css";

const AuthForm = ({ mode }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectIsEror);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error && !toast.isActive('authErrorToast')) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        toastId: 'authErrorToast' 
      });
    }
  }, [error]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short").required("Required"),
    ...(mode === "signup" && {
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Required"),
    }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };
    if (mode === "signup") {
      dispatch(signup(credentials));
    } else {
      dispatch(signin(credentials));
    }
    setSubmitting(false);
  };

  const formTitle = mode === "signup" ? "Sign Up" : "Sign In";

  const getInputClassName = (errors, touched, fieldName) => {
    if (errors[fieldName] && touched[fieldName]) {
      return classNames(s.input, s.error);
    } else if (touched[fieldName]) {
      return classNames(s.input, s.focused);
    } else {
      return s.input;
    }
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{formTitle}</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={s.form}>
            <div className={s.item}>
              <label htmlFor="email" className={s.label}>
                Enter your email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="E-mail"
                className={getInputClassName(errors, touched, "email")}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={s.attention}
              />
            </div>

            <div className={s.item}>
              <label htmlFor="password" className={s.label}>
                Enter your password
              </label>
              <div className={s.passwordWrapper}>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={getInputClassName(errors, touched, "password")}
                  autoComplete="current-password"
                />
                <svg
                  className={s.iconN}
                  onClick={togglePasswordVisibility}
                  aria-hidden="true"
                >
                  <use
                    xlinkHref={`${sprite}#${showPassword ? "icon-eye-open" : "icon-eye-closed"}
                      `}
                  />
                </svg>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={s.attention}
              />
            </div>

            {mode === "signup" && (
              <div className={s.item}>
                <label htmlFor="repeatPassword" className={s.label}>
                  Repeat password
                </label>
                <div className={s.passwordWrapper}>
                  <Field
                    name="repeatPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    className={getInputClassName(errors, touched, "repeatPassword")}
                    autoComplete="new-password"
                  />
                  <svg
                    className={s.iconN}
                    onClick={togglePasswordVisibility}
                    aria-hidden="true"
                  >
                    <use
                      xlinkHref={`${sprite}#${showPassword ? "icon-eye-open" : "icon-eye-closed"}`}
                    />
                  </svg>
                </div>
                <ErrorMessage
                  name="repeatPassword"
                  component="span"
                  className={s.attention}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={s.submitbutton}
            >
              {isLoading
                ? "Loading..."
                : mode === "signup"
                ? "Sign up"
                : "Sign in"}
            </button>

            {mode === "signup" ? (
              <a href="/signin" className={s.href}>
                Sign in
              </a>
            ) : (
              <a href="/signup" className={s.href}>
                Sign up
              </a>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
