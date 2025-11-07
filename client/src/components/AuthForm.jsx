import React from 'react';
import './authform.css'
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const { register, reset, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const onsubmit = (formaData) => {

  }
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <h2>Start Your Journey</h2>
      <form action="" onSubmit={handleSubmit(onsubmit)} className='d-flex flex-column justify-content-center align-items-center'>
        <div className="input-box border border-2">
          <input className='border-0' type="text" name="" id="name"
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
          <label htmlFor="name">Name</label>
        </div>
        {errors.name && <p className='text-danger'>&#9432; {errors.name.message}</p>}
        <div className="input-box border border-2">
          <input className='border-0' type="password" name="" id="password"
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
          <label htmlFor="password">Password</label>
        </div>
          {errors.password&&<p className='text-danger'>&#9432; {errors.password.message}</p>}
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}

export default AuthForm