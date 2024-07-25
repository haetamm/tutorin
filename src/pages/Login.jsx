import React, { useState } from 'react';
import '../styles/pages/login.scss';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { urlPage } from '../utils/constans';
import { loginFormSchema } from '../utils/validation.js';
import axiosInstance from '../utils/api';
import { generateToken } from '../utils/security';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdEmail } from 'react-icons/md';
import FormControllerInput from '../component/FormControllerInput';
import { IoIosEyeOff } from 'react-icons/io';

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange', 
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const { data: users } = await axiosInstance.get('/users');
            const user = users.find(u => u.email === data.email && u.password === data.password);
            
            if (user) {
                const { id, role } = user;
                const token = generateToken(id, role);
                Cookies.set('token', token);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        userId: id,
                        role: role,
                        token: token,
                    },
                });
                toast.success('Login successful');
            } else {
                toast.error('Invalid email or password');
            }
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
                    <h3 className="title">Login Form</h3>
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
                        {loading ? 'Loading..' : 'Login'}
                    </button>
                    <span className="forgot-pass"><a href="#">Lost password?</a></span>
                    <Link to={urlPage.REGISTER_STUDENT} className="register">Register / Signup</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
