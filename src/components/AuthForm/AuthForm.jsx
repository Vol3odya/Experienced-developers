import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../redux/auth/operations";
import { selectIsLoading, selectIsEror } from "../../redux/auth/selectors";
import s from './AuthForm.module.css'

const AuthForm = ({ mode }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectIsEror);

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

  const formTitle = mode === 'signup' ? 'Sign Up' : 'Sign In';

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
              <Field name="email" type="email" placeholder='E-mail'/>
              <ErrorMessage name="email" component="span" className={s.attention}/>
            </div>
            
            <div className={s.item}>
              <label htmlFor="password">Enter your password</label>
              <Field name="password" type="password" placeholder='Password'/>
              <ErrorMessage name="password" component="span" className={s.attention}/>
            </div>

            {mode === "signup" && (
              <div className={s.item}>
                <label htmlFor="repeatPassword">Repeat password</label>
                <Field name="repeatPassword" type="password" placeholder='Repeat password'/>
                <ErrorMessage name="repeatPassword" component="span" className={s.attention}/>
              </div>
            )}

            <button type="submit" disabled={isSubmitting || isLoading} className={s.submitbutton}>
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
