// src/Signup.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = (values) => {
        console.log('Form data', values);
        // Handle form submission (e.g., send data to server)
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                
                    <Form className="signup-form">
                        <div className="form-field">
                            <label htmlFor="username">Username</label>
                            <Field type="text" id="username" name="username" />
                            <ErrorMessage name="username" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>
                        <button type="submit">Sign Up</button>
                    </Form>
                
            </Formik>
        </div>
    );
};

export default Signup;
