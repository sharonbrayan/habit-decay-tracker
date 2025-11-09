import React, { useEffect, useState } from 'react'
import './homecomponent.css'
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const HomeComponent = () => {
  const [habitData, sethabitData] = useState([]);
  const [dummy, setdummy] = useState()
  const { register, reset, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const onsubmit = async (name) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/addhabit', name, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(error.message)
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        console.log(error);
      }
    }
    reset();
  }
  const getHabits = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/gethabits', { withCredentials: true }); 
      if (data.success) {
        sethabitData(data.habits);
        console.log(habitData);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message)
    } else {
      console.log(error);
    }
  }
}
useEffect(() => {
  getHabits();
}, [])

return (
  <div className='home-component'>
    <form action="" onSubmit={handleSubmit(onsubmit)}>
      <div className="input-box" tabIndex="0">
        <input className='border-0' type="text" name="" id="name"
          {...register("name",
            {
              required: { value: true, message: "enter habit" },
              maxLength: { value: 30, message: "maximun length is 30" },
              minLength: { value: 2, message: "minimun maxlength should be 2" },
            })
          } />
        <label htmlFor="name" className='pt-2 ps-2'>Enter Habit</label>
      </div>
      {errors.name && <p className='text-danger'>&#9432; {errors.name.message}</p>}
      <input type="submit" value='+ Add' className='btn btn-success' disabled={isSubmitting} />
    </form>
    <div className='text-center w-100'>Your Habits And Activities</div>
    <Container>
      <Row>
        <Col xs={12} className='d-flex justify-content-between'>
          <div>
            <h5>Your Habit</h5>
            <p>Last completed 12 days ago</p>
          </div>
          <div>
            <button>view activities</button>
          </div>
        </Col>
        <Col xs={12} className='d-flex justify-content-between'>
          <div>
            <h5>Your Habit</h5>
            <p>Last completed 12 days ago</p>
          </div>
          <div>
            <button>view activities</button>
          </div>
        </Col>
        <Col xs={12} className='d-flex justify-content-between'>
          <div>
            <h5>Your Habit</h5>
            <p>Last completed 12 days ago</p>
          </div>
          <div>
            <button>view activities</button>
          </div>
        </Col>
        <Col xs={12} className='d-flex justify-content-between'>
          <div>
            <h5>Your Habit</h5>
            <p>Last completed 12 days ago</p>
          </div>
          <div>
            <button>view activities</button>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
)
}

export default HomeComponent