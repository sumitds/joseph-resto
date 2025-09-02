"use client";

import { Formik } from 'formik';
import AppData from "@data/app.json";

const LoginForm = () => {
  return (
    <>
        {/* contact form */}
        <Formik
        initialValues = {{ email: '', first_name: '', last_name: '', time: '', date: '', person: '', message: '' }}
        validate = { values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit = {( values, { setSubmitting } ) => {
            const form = document.getElementById("loginForm");
            const status = document.getElementById("loginFormStatus");
            const data = new FormData();

            data.append('phone_number', values.phone_number);
            data.append('email', values.email);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "<h5>Thanks for your submission!</h5>"
                    form.reset()
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = "<h5 style='color:red;'>"+data["errors"].map(error => error["message"]).join(", ")+"</h5>"
                        } else {
                            status.innerHTML = "<h5 style='color:red;'>Oops! There was a problem submitting your form</h5>"
                        }
                    })
                }
            }).catch(error => {
                status.innerHTML = "<h5 style='color:red;'>Oops! There was a problem submitting your form</h5>"
            });

            setSubmitting(false);
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit} id="loginForm" action={AppData.settings.formspreeURL}>
            <div className="row">
                
                <div className="col-6 col-md-4">
                    <input
                        type="text" 
                        placeholder="Phone number"
                        name="phone_number" 
                        required="required" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone_number} 
                    />
                </div>
                Or
                <div className="col-6 col-md-4">
                    <input 
                        type="email" 
                        placeholder="Email"
                        name="email"
                        required="required"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} 
                    />
                </div>
                
            </div>
            <button className="tst-btn" type="submit" name="button">Login</button>

            <div id="loginFormStatus" className="tst-form-status"></div>
        </form>
        )}
        </Formik>
        {/* contact form end */}
    </>
  );
};
export default LoginForm;