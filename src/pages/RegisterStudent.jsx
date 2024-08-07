import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormControllerInput from '../component/FormControllerInput'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { registerFormSchema } from '../utils/validation.js'
import { MdEmail } from 'react-icons/md'
import heroImg from '../assets/register-student.webp'
import { FaRegUserCircle } from 'react-icons/fa'

import '../styles/pages/login.scss'
import { FcGoogle } from 'react-icons/fc'
import { useMediaQuery } from 'react-responsive'

const RegisterStudent = () => {
    const [showPassword, setShowPassword] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1400 })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(registerFormSchema),
        mode: 'onChange', 
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const dataStudent = {
                ...data,
                role: 'student'
            }
            const { data: student } = await axiosInstance.post('/users', dataStudent)
            await axiosInstance.post('/profiles', {userId: student.id, name: student.name, email: student.email})
            toast.success(`Registration process successful, please log in, ${student.name}`)
            reset()
            navigate(urlPage.LOGIN)
        } catch (error) {
            console.error('Error fetching users:', error)
            toast.error('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const fields = [
        { name: 'name', type: 'text', placeholder: 'Name', icon: FaRegUserCircle },
        { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
        { name: 'password', type: 'password', placeholder: 'Password', icon: null, isPasswordInput: true },
        { name: 'passwordConfirmation', type: 'password', placeholder: 'Password Confirmation', icon: null, isPasswordInput: true },
    ]

    return (
        <>
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[80px] lg:pt-[100px]`}>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="bg-transparent hidden h-[550px] lg:block w-full md:w-1/2 xl:w-2/3 rounded-lg"
                        style={{
                            backgroundImage: `url(${heroImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',

                            WebkitClipPath: 'circle(90% at 205px 100px)',
                            clipPath: 'circle(90% at 205px 100px)',
                            flex: 4,
                        }}
                    >
                    </div>

                    <div className="bg-transparent w-full md:max-w-md mt-0 lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                        <div className="w-full h-100">
                            <h1 className="text-2xl font-bold leading-tight pt-0 md:pt-[40px] lg:pt-0">Register your account</h1>

                            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
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
                                <button type="submit" className="w-full block disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6" disabled={!isValid || isSubmitting || loading}>
                                    {loading ? 'Loading...' : 'Register Student'}
                                </button>
                            </form>

                            <hr className="my-6 border-gray-300 w-full" />

                            <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                                <div className="flex items-center justify-center">
                                    <FcGoogle className="w-6 h-6"/>
                                    <span className="ml-4">Log in with Google</span>
                                </div>
                            </button>

                            <p className="mt-4">Have an account already? <Link to={urlPage.LOGIN} className="text-white hover:text-red-400 font-semibold">Login</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterStudent