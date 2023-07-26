/** @format */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
    email: Yup.string()

        // Format Validation
        .email("Please check your email again")

        // Required Field Validation
        .required("Email is required"),
    password: Yup.string()

        //Minimum Character Validation and Required Field Validation
        .min(3, "Password must be 3 characters at minimum")
        .max(8, "Password must not be exeeded 8 characters"),
    // .required("Password is required")
});

const Login = (props) => {
    console.log(props);

    //    We got the role value as props after lunch we comntinue from here
    //    I have to fix the bug of this page when a new user tryies to log in is should give error

    const { setRole } = props;

    const [error, setError] = useState(false);

    const DB = JSON.parse(localStorage.getItem("formDB")); // Storimg the localstorage data into DB so we can compare it after handlesubmit
    // console.log(DB);

    const handleSubmit = (values) => {
        console.log(values);
        console.log("Login Clicked");
        let dd = DB.filter((item) => item.email === values.email);
        // console.log(dd[0].email);
        // console.log(dd[0].radio);
        // console.log(dd[0].password);
        // console.log(values.email);
        // console.log(values.radio)
        // console.log(values.password);
        if (dd[0] && dd[0].email === values.email && dd[0].password === values.password) {
            let user_d = dd[0];
            if (dd[0].radio === true) {
                navigationFunck("/dash");
                localStorage.setItem("user_d", JSON.stringify(user_d));
                setRole("Teacher");
            } else {
                navigationFunck("/dash");
                localStorage.setItem("user_d", JSON.stringify(user_d));
                setRole("Student");
            }
            console.log("YESS");
        } else {
            setError(true);
            console.log(error, "Caught");
        }
    };

    const navigationFunck = useNavigate();

    const navigateSignup = () => {
        navigationFunck("/signup");
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={(values) => handleSubmit(values)}>
                            {(props) => (
                                <div>
                                    <div className="row mb-5">
                                        <div className="col-lg-12 text-center">
                                            <h1 className="mt-5">Login Form</h1>
                                            <h3>
                                                {error ? (
                                                    <p className="text-danger">
                                                        Invalid username or Password <span>Try sign Up</span>
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </h3>
                                        </div>
                                    </div>
                                    <Form>
                                        <div className="form-group">
                                            <label className="fw-bold" htmlFor="email">
                                                Email
                                            </label>
                                            <Field type="email" name="email" placeholder="Enter email" autoComplete="off" className={`mt-2 form-control ${props.touched.email && props.errors.email ? "is-invalid" : ""}`} />
                                            <ErrorMessage component="div" name="email" className="invalid-feedback" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password" className="mt-3 fw-bold">
                                                Password
                                            </label>
                                            <Field type="password" name="password" placeholder="Enter password" className={`mt-2 form-control ${props.touched.password && props.errors.password ? "is-invalid" : ""}`} />
                                            <ErrorMessage component="div" name="password" className="invalid-feedback" />
                                        </div>

                                        <button type="submit" className="btn btn-success btn-block mt-4">
                                            Submit
                                        </button>
                                    </Form>

                                    <p className="fw-bold">
                                        Don't have an account{" "}
                                        <button className="btn btn-primary" onClick={navigateSignup}>
                                            Sign up
                                        </button>
                                    </p>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
