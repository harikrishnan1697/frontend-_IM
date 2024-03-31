import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosService from '../utils/ApiService';
import img from '../images/img2.jfif';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('* Invalid email').required('* Required'),
    password: Yup.string().required('* Required'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await AxiosService.post('/user/login', values);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/productreport');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <img src={img} alt="Login Image" className="img" />

      <div className="container login" style={{ position: 'absolute' }}>
        <h1 className="logo" style={{ textAlign: 'center' }}>
          Login Here!
        </h1>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className={`textbox ${errors.email && touched.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`textbox ${errors.password && touched.password ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </Form.Group>

              <center>
                <Button variant="warning" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </center>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
