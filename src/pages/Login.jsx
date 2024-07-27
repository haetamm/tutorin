import React, { useState } from 'react'
import '../styles/pages/login.scss'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { urlPage } from '../utils/constans'
import { loginFormSchema } from '../utils/validation.js'
import axiosInstance from '../utils/api'
import { generateToken } from '../utils/security'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdEmail } from 'react-icons/md'
import FormControllerInput from '../component/FormControllerInput'
import { IoIosBook, IoIosEyeOff } from 'react-icons/io'
import { PiStudentBold } from 'react-icons/pi'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
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
                const { id, role, name } = user;
                const token = generateToken(id, name, role);
                Cookies.set('token', token);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        userId: id,
                        name: name,
                        role: role,
                        token: token,
                    },
                });
                if (role === "student") {
                    console.log(urlPage.STUDENT_PROFILE)
                    navigate('/in/student/profile')
                }
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
        // <div className="loginPage">
        //     <div className="form-container">
        //         <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        //             <h3 className="title">Login Form</h3>
        //             {fields.map((field) => (
        //                 <FormControllerInput
        //                     key={field.name}
        //                     name={field.name}
        //                     control={control}
        //                     defaultValue=""
        //                     type={field.type}
        //                     placeholder={field.placeholder}
        //                     icon={field.icon}
        //                 />
        //             ))}
        //             <button
        //                 className="disabled:bg-slate-300 bg-green-500 btn signin inline-block"
        //                 disabled={!isValid || isSubmitting || loading}
        //             >
        //                 {loading ? 'Loading..' : 'Login'}
        //             </button>
        //             <span className="forgot-pass"><a href="#">Lost password?</a></span>
        //             <Link to={urlPage.REGISTER_STUDENT} className="register">Register / Signup</Link>
        //         </form>
        //     </div>
        // </div>
        <div className="flex flex-col md:flex-row justify-center w-full min-h-screen">
            <div
                className="flex gap-4 w-full font-bold justify-center items-center bg-gradient-to-t from-purple-100 md:h-screen text-3xl p-4"
                style={{
                background:
                    "linear-gradient(240deg, #8A2BE2, purple)",
                }}
            >
                <div className="flex flex-col justify-center gap-10 text-white">
                <h1>Have no account? please register</h1>
                <div className="flex flex-row gap-5">
                    <button className="flex flex-row gap-4 items-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg">
                    <IoIosBook />
                    <Link to={urlPage.REGISTER_TUTOR}>Tutor</Link>
                    </button>
                    <button className="flex flex-row gap-4 items-center bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <PiStudentBold />
                    <Link to={urlPage.REGISTER_STUDENT}>Student</Link>
                    </button>
                </div>
                </div>
            </div>
            <div className="w-full md:max-w-2xl bg-gradient-to-b from-slate-100 md:h-screen flex justify-center">
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
                        {loading ? "Loading.." : "Login"}
                    </button>
                    <span className="forgot-pass">
                        <a href="#">Lost password?</a>
                    </span>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
