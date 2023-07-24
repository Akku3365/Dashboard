/** @format */
import React, { useContext, useState, } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom"

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

    const { setRole } = props;

    const [error, setError] = useState(false);

    const navigationFunck = useNavigate();

    const DB = JSON.parse(localStorage.getItem("formDB"));
    console.log(DB);

    const handleSubmit = (values) => {
        console.log(values);
        console.log("Login Clicked");
        let dd = DB.filter((item) => item.email === values.email);
        console.log(dd);
        if (dd[0] && dd[0].email === values.email && dd[0].password === values.password) {
            navigationFunck("/dash")
            console.log("YESS");
        } else {
            setError(!error);
        }

    };

    const navigateSignup = () => {
        navigationFunck("/signup")
    }

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
                                            <h3>{error ? <h3 className="text-danger">Invalid username or Password</h3> : ""}</h3>
                                        </div>
                                    </div>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field type="email" name="email" placeholder="Enter email" autoComplete="off" className={`mt-2 form-control ${props.touched.email && props.errors.email ? "is-invalid" : ""}`} />
                                            <ErrorMessage component="div" name="email" className="invalid-feedback" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password" className="mt-3">
                                                Password
                                            </label>
                                            <Field type="password" name="password" placeholder="Enter password" className={`mt-2 form-control ${props.touched.password && props.errors.password ? "is-invalid" : ""}`} />
                                            <ErrorMessage component="div" name="password" className="invalid-feedback" />
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block mt-4">
                                            Submit
                                        </button>
                                    </Form>

                                    <p>
                                        Don't have an account <button onClick={navigateSignup} >Sign up</button>
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
