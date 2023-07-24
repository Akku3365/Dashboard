/** @format */
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom"

const SignupSchema = Yup.object().shape({
    email: Yup.string()

        .email("Kindly check you email")

        .required("Email field is required"),
    password: Yup.string()

        .min(6, "Password must be 6 characters at minimum")
        .max(12, "Password must not be exeeded 12 character"),
});

const Signup = (props) => {

    const navigFunk = useNavigate();

    const goToLogin = () => {
        navigFunk("/")
    }

    //  Storing the data in Localstorage

    const [oldUser, setOldUser] = useState(false);

    let initialDB;

    if (localStorage.getItem("formDB") === null) {
        initialDB = [];
    } else {
        initialDB = JSON.parse(localStorage.getItem("formDB"));
    }

    const [formData, setFormData] = useState(initialDB);
    useEffect(() => {
        localStorage.setItem("formDB", JSON.stringify(formData));
    }, [formData]);

    const handleSignupSubmit = (val) => {
        setFormData([...formData, val])
        formData.filter((v) => {
            v.email !== val.email ? setFormData([...formData, val]) : setOldUser(!oldUser)
        })
        console.log("Signup clicked");
        console.log(initialDB[0].email);
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
                                    {oldUser ? <h2>User Already Exists Please Log in</h2> : ""}
                                </div>
                            </div>
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" placeholder="Enter email" autoComplete="off" className={`mt-2 form-control ${props.touched.email && props.errors.email ? "is-invalid" : ""}`} />
                                    <ErrorMessage component="div" name="email" className="invalid-feedback" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" placeholder="Enter password" autoComplete="off" className={`mt-2 form-control ${props.touched.password && props.errors.password ? "is-invalid" : ""}`} />
                                    <ErrorMessage component="div" name="password" className="invalid-feedback" />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="checkrole">Check only if you are a teacher</label>
                                    <Field type="checkbox" name="radio"></Field>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">
                                    Submit
                                </button>
                            </Form>

                            <p>
                                Already have an account <button onClick={goToLogin} >Log in</button>
                            </p>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Signup;
