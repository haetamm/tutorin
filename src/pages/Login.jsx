import React, { useState } from 'react'
import heroImg from '../assets/login-img.webp'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { loginFormSchema } from '../utils/validation.js'
import axiosInstance from '../utils/api'
import { generateToken } from '../utils/security'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdEmail } from 'react-icons/md'
import FormControllerInput from '../component/FormControllerInput'
import { FcGoogle } from 'react-icons/fc'
import { useMediaQuery } from 'react-responsive'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1400 })
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange', 
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: users } = await axiosInstance.get('/users')
            const user = users.find(u => u.email === data.email && u.password === data.password)
            
            if (user) {
                const { id, role, name } = user
                const token = generateToken(id, name, role)
                Cookies.set('token', token)
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        userId: id,
                        name: name,
                        role: role,
                        token: token,
                    },
                })
                toast.success('Login successful')
            } else {
                toast.error('Invalid email or password')
            }
        } catch (error) {
            console.error('Error fetching users:', error)
            toast.error('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const fields = [
        { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
        { name: 'password', type: 'password', placeholder: 'Password', icon: null, isPasswordInput: true },
    ]

    return (
        <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[80px] lg:pt-[100px]`}>
            <div className="flex flex-col md:flex-row">
                <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-[400px] lg:h-[500px] rounded-r-3xl"
                    style={{
                        backgroundImage: `url(${heroImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',

                        WebkitClipPath: 'circle(90% at 205px 30px)',
                        clipPath: 'circle(90% at 205px 30px)',
                        flex: 4,
                    }}
                >
                </div>

                <div className="bg-transparent w-full md:max-w-md mt-4 lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12">
                    <div className="w-full h-100">
                        <h1 className="text-xl md:text-2xl font-bold leading-tight pt-0 md:pt-[30px] lg:pt-0">Log in to your account</h1>

                        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                            {fields.map((field, index) => (
                                <div key={index} className="mt-4">
                                    <FormControllerInput
                                        name={field.name}
                                        control={control}
                                        type={field.isPasswordInput ? (showPassword ? 'text' : 'password') : field.type}
                                        placeholder={field.placeholder}
                                        icon={field.icon}
                                        isPasswordInput={field.isPasswordInput}
                                        showPassword={showPassword}
                                        toggleShowPassword={toggleShowPassword}
                                    />
                                </div>
                            ))}
                            <div className="text-right mt-2">
                                <Link to="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</Link>
                            </div>
                            <button type="submit" className="w-full block disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-2" disabled={!isValid || isSubmitting || loading}>
                                {loading ? 'Loading...' : 'Log In'}
                            </button>
                        </form>

                        <hr className="my-6 border-gray-300 w-full" />

                        <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                            <div className="flex items-center justify-center">
                                <FcGoogle className="w-6 h-6"/>
                                <span className="ml-4">Log in with Google</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
