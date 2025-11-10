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

  const getLastCompleted = (date) => {
  if (!date || date === '1970-01-01T00:00:00.000Z') return 'Never Completed';

  const completed = new Date(date);
  if (isNaN(completed.getTime())) return 'Invalid date';

  const now = new Date();

  // Normalize to local midnight for calendar-day comparison
  const completedMidnight = new Date(
    completed.getFullYear(),
    completed.getMonth(),
    completed.getDate()
  );
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // difference in whole calendar days
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((todayMidnight - completedMidnight) / msPerDay);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays > 1) return `${diffDays} days ago`;

  // completed is in the future (negative diff)
  return 'In the future';
};
  return (
    <div className='home-component'>
      <h2 className='text-center fw-bold mb-3'>Build Better Habits One Step At a Time</h2>
      <form action="" onSubmit={handleSubmit(onsubmit)} className='d-flex flex-column w-50 border border-1 py-2 px-3'>
        <label htmlFor="name" className='fw-semibold fs-4 pb-2'>Add a New Habit</label>
        <div className='w-100 d-flex justify-content-between'>
          <input className='' type="text" name="" id="name" placeholder='eg: Drink 4L water'
            {...register("name",
              {
                required: { value: true, message: "enter habit" },
                maxLength: { value: 30, message: "maximun length is 30" },
                minLength: { value: 2, message: "minimun maxlength should be 2" },
              })
            } />
          {errors.name && <p className='text-danger'>&#9432; {errors.name.message}</p>}
          <input type="submit" value='+ Add' className='btn btn-sm btn-success' disabled={isSubmitting} />
        </div>
      </form>
      <h3 className='mb-5'>Your Habits And Activities</h3>
      <Container>
        <Row>
          {
            habitData.map((habit) => {
              return (
              <Col xs={12} className='d-flex justify-content-between'>
                <div>
                  <h5>{habit.name}</h5>
                  <p>{getLastCompleted(habit.lastCompletedDate)}</p>
                </div>
                <div>
                  <button>view activities</button>
                </div>
              </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export default HomeComponent