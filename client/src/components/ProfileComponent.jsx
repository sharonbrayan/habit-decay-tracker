import React, { useEffect } from 'react'
import './profilecomponent.css';
import { useForm } from "react-hook-form";
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileComponent = ({ userdetails }) => {
   const {
    register: registerName,
    reset: resetName,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName, isSubmitting: isSubmittingName },
  } = useForm({ defaultValues: { name: userdetails.name ?? "" } });

  // separate form for password
  const {
    register: registerPass,
    reset: resetPass,
    handleSubmit: handleSubmitPass,
    watch: watchPass,
    setError: setErrorPass,
    formState: { errors: errorsPass, isSubmitting: isSubmittingPass },
  } = useForm({
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });
    useEffect(() => {

        resetName(userdetails, {
            keepDirtyValues: true,
        });

    }, [userdetails]);
    const changeUsername = async (formData) => {
        try {
            const { data } = await axios.post("http://192.168.13.233:4000/api/changeusername", { newName: formData.name }, { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }
    const changePassword = async (formData) => {
            try {
            const { data } = await axios.post("http://192.168.13.233:4000/api/changepassword", { oldPassword: formData.oldPassword, newPassword: formData.newPassword }, { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='profile-component'>
            <div className='d-flex justify-content-start align-items-center gap-2 mb-5 mb-md-3'>
                <img src="https://cdn-icons-png.flaticon.com/128/2956/2956788.png" alt="" height={30} width={30} />
                <span className='fs-3 mb-1'>Profile Settings</span>
            </div>
            <Container>
                <Row className='d-flex flex-column gap-5'>
                    <Col xs='12' md={6}>
                        <h5>Edit Name</h5>
                        <form  onSubmit={handleSubmitName(changeUsername)} className='d-flex flex-column gap-2'>
                            <input type="text" name="" id="" className='w-100'
                                {...registerName("name",
                                    {
                                        required: { value: true, message: "enter your name" },
                                        maxLength: { value: 30, message: "maximun length is 30" },
                                        minLength: { value: 2, message: "minimun maxlength should be 2" },
                                        pattern: {
                                            value: /^[A-Za-z]+$/, message: 'Only letters are allowed'
                                        }
                                    })
                                } />
                            {errorsName.name && <p className='text-danger'>&#9432; {errorsName.name.message}</p>}
                            <input type="submit" value='Save' className='btn btn-success mt-1' disabled={isSubmittingName} />
                        </form>
                    </Col>
                    <Col  xs='12' md={6}>
                        <h5>Edit Password</h5>
                        <form  onSubmit={handleSubmitPass(changePassword)}  className='d-flex flex-column gap-2'>
                            <label htmlFor="oldPassword">Old Password</label>
                            <input className='' type="password" name="" id="oldPassword"
                                {...registerPass("oldPassword",
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
                            {errorsPass.oldPassword && <p className='text-danger'>&#9432; {errorsPass.oldPassword.message}</p>}
                            <label htmlFor="newPassword">New Password</label>
                            <input className='' type="password" name="" id="newPassword"
                                {...registerPass("newPassword",
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
                            {errorsPass.newPassword && <p className='text-danger'>&#9432; {errorsPass.newPassword.message}</p>}
                            <input type="submit" value='Save' className='btn btn-success' disabled={isSubmittingPass} />
                        </form></Col>
                    <Col xs='6'></Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileComponent