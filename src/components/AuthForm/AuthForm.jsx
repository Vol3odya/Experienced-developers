import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../redux/auth/operations";
import { selectIsLoading, selectIsEror } from "../../redux/auth/selectors";
import s from "./AuthForm.module.css";

const AuthForm = ({ mode }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectIsEror);

  const [showPassword, setShowPassword] = useState(false);

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
      console.log(credentials);
    } else {
      dispatch(signin(credentials));
    }
    setSubmitting(false);
  };

  const formTitle = mode === "signup" ? "Sign Up" : "Sign In";

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
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.item}>
              <label htmlFor="email">Enter your email</label>
              <Field name="email" type="email" placeholder="E-mail" />
              <ErrorMessage
                name="email"
                component="span"
                className={s.attention}
              />
            </div>

            <div className={s.item}>
              <label htmlFor="password">Enter your password</label>
              <div className={s.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className={s.input}
                  autoComplete="current-password"
                />
                <svg
                  className={s.icon}
                  onClick={togglePasswordVisibility}
                  aria-hidden="true"
                >
                  <use
                    xlinkHref={`../../images/svg/symbol-defs.svg#${
                      showPassword ? "icon-eye-open" : "icon-eye-closed"
                    }`}
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
                <label htmlFor="repeatPassword">Repeat password</label>
                <div className={s.passwordWrapper}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    name="repeatPassword"
                    className={s.input}
                    autoComplete="new-password"
                  />
                  <svg
                    className={s.icon}
                    onClick={togglePasswordVisibility}
                    aria-hidden="true"
                  >
                    <use
                      xlinkHref={`../../images/svg/symbol-defs.svg#${
                        showPassword ? "icon-eye-open" : "icon-eye-closed"
                      }`}
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

            {error && <div className="notification">{error}</div>}

            {mode === "signup" ? (
              <a href="/signin">Sign in</a>
            ) : (
              <a href="/signup">Sign up</a>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
