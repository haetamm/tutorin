import React, { useState } from 'react'
import '../styles/pages/login.scss'
import { Link } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormControllerInput from '../component/FormControllerInput'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { registerFormSchema } from '../utils/validation.js'
import { MdEmail } from 'react-icons/md'
import { IoIosEyeOff } from 'react-icons/io'

const RegisterStudent = () => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(registerFormSchema),
        mode: 'onChange', 
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const dataStudent = {
                ...data,
                role: 'student'
            }
            const { data: student } = await axiosInstance.post('/users', dataStudent);
            toast.success(`Proses register berhasil, silahkan login ${student.email}`);
            reset()
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
        { name: 'password', type: 'password', placeholder: 'Password', icon: IoIosEyeOff },
    ];

    return (
      <div className="loginPage">
            <div className="form-container">
                <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="title">Student Register Form</h3>
                    {fields.map((field) => (
                        <FormControllerInput
                            key={field.name}
                            name={field.name}
                            control={control}
                            defaultValue=""
                            type={field.type}
                            placeholder={field.placeholder}
                            icon={field.icon}
                        />
                    ))}
                    <button
                        className="disabled:bg-slate-300 bg-green-500 btn signin inline-block"
                        disabled={!isValid || isSubmitting || loading}
                    >
                        {loading ? 'Loading..' : 'Register'}
                    </button>
                    <span className="forgot-pass"><a href="#">Lost password?</a></span>
                    <Link to={urlPage.REGISTER_TUTOR} className="register">Register / Signup</Link>
                </form>
            </div>
        </div>
  )
}

export default RegisterStudent