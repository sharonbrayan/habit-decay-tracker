import React from 'react';
import './authform.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthForm = ({ auth }) => {
  const navigate=useNavigate();
  const { register, reset, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const onsubmit = async (formData) => {
    if (auth === 'signup') {
      try {
        const { data } = await axios.post("http://localhost:4000/api/register", formData,{withCredentials:true});
        if (data.success) {
          toast.success(data.message);
          navigate('/home')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        if (error.response.data.message) {
          toast.error(error.response.data.message)
        }else{
          console.log(error);
        }
      }
    } else if (auth === 'login') {
      try {
        const { data } = await axios.post("http://localhost:4000/api/login", formData,{withCredentials:true});
        if (data.success) {
          toast.success(data.message);
          navigate('/home')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        if (error.response.data.message) {
          toast.error(error.response.data.message)
        }
      }
    }
  }
  return (
    <div className='form-container d-flex flex-column align-items-center justify-content-center'>
      <span className='mx-auto fs-1 fw-medium'>{auth === 'login' ? "Log In" : "Start Your Journey"}</span>
      <form action="" onSubmit={handleSubmit(onsubmit)} className='d-flex flex-column form'>
        <div className="input-box" tabIndex="0">
          <input className='border-0 input' type="text" name="" id="name"
            {...register("name",
              {
                required: { value: true, message: "enter your name" },
                maxLength: { value: 30, message: "maximun length is 30" },
                minLength: { value: 2, message: "minimun maxlength should be 2" },
                pattern: {
                  value: /^[A-Za-z]+$/, message: 'Only letters are allowed'
                }
              })
            } />
          <label htmlFor="name" className='pt-2 ps-2'>Name</label>
        </div>
        {errors.name && <p className='text-danger'>&#9432; {errors.name.message}</p>}
        <br />
        <div className="input-box" tabIndex={0}>
          <input className='border-0 input' type="password" name="" id="password"
            {...register("password",
              {
                required: { value: true, message: "enter password" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: 'password must contain at least one letter and one number'
                },
                minLength: { value: 8, message: "must contain atleast 8 characters" },
                maxLength: { value: 15, message: "must contain less than 15 characters" }
              })
            } />
          <label htmlFor="password" className='pt-2 ps-2'>Password</label>
        </div>
        {errors.password && <p className='text-danger'>&#9432; {errors.password.message}</p>}
        <br /><br />
        <input type="submit" value={auth === 'login' ? "Log In" : "Register"} className='btn btn-success' disabled={isSubmitting} />
        {
          auth === 'signup' ?
            <div className='d-flex justify-content-between mt-3'>
              <span>Already have an account?</span>
              <Link to={'/login'}>Login</Link>
            </div>
            :
            <div className='d-flex justify-content-between mt-3'>
              <span>Don't have an account?</span>
              <Link to={'/signup'}>Register</Link>
            </div>
        }
      </form>
    </div>
  )
}

export default AuthForm