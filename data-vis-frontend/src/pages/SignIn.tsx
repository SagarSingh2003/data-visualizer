import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import  api  from '../constants/api';

const Signin = () => {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = (values : any) => {
        console.log('Form data', values);
        // Handle form submission (e.g., send data to server)

        api.post("/auth/signin" , {
            email : values.email,
            password : values.password
        }, {
            withCredentials: true,
            headers : {
                "Content-Type" : "application/json"
            }
        })
    };

    return (
        <div className="signup-container">
            <h2>Sign In</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                
                    <Form className="signup-form">
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
                        <button type="submit">Sign In</button>
                    </Form>
                
            </Formik>
        </div>
    );
};

export default Signin;
