/** @format */
import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
    email: Yup.string()

        .email("Kindly check you email")

        .required("Email field is required"),
         password: Yup.string()


        .required("Password is required")
        .min(4, "Password must be 4 characters at minimum")
        .max(12, "Password must not be exeeded 12 character"),
});

const Signup = () => {
    const navigFunk = useNavigate();

    const goToLogin = () => {
        navigFunk("/");
    };

    //  Storing the data in Localstorage

    const [oldUser, setOldUser] = useState(false);

    let initialDB;

    if (localStorage.getItem("formDB") === null) {
        initialDB = [];
    } else {
        initialDB = JSON.parse(localStorage.getItem("formDB"));
    }

    const [formData, setFormData] = useState(initialDB);

    const handleSignupSubmit = (val) => {
        console.log(val)
        let exist = [...formData].find((v) => v.email === val.email);
        console.log(exist);
        if (exist) {
            setOldUser(!oldUser);
        } else {
            let arr = [...formData, val];
            setFormData(arr);
            localStorage.setItem("formDB", JSON.stringify(arr));
            navigFunk("/");
        }
    };
    console.log(formData);

    return (
        <>
            <div className="container">
                <Formik initialValues={{ email: "", password: "", radio: false }} validationSchema={SignupSchema} onSubmit={(val) => handleSignupSubmit(val)}>
                    {(props) => (
                        <div>
                            <div className="row mb-5">
                                <div className="col-lg-12 text-center">
                                    <h1 className="mt-5">Signup Form</h1>
                                    {oldUser ? <h2 className="text-danger">User Already Exists Please Log in</h2> : ""}
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
                                    <label className="fw-bold mt-3" htmlFor="password">
                                        Password
                                    </label>
                                    <Field type="password" name="password" placeholder="Enter password" autoComplete="off" className={`mt-2 form-control ${props.touched.password && props.errors.password ? "is-invalid" : ""}`} />
                                    <ErrorMessage component="div" name="password" className="invalid-feedback" />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="fw-bold mt-1" htmlFor="checkrole">
                                        Check only if you are a teacher
                                    </label>
                                    <Field type="checkbox" name="radio"></Field>
                                </div>
                                <button type="submit" className="btn btn-success btn-block mt-4">
                                    Submit
                                </button>
                            </Form>

                            <p className="fw-bold mt-3">
                                Already have an account{" "}
                                <button className="btn btn-primary" onClick={goToLogin}>
                                    Log in
                                </button>
                            </p>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Signup;
