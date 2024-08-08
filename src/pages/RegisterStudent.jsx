import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { registerFormSchema } from '../utils/validation.js'
import { MdEmail } from 'react-icons/md'
import heroImg from '../assets/register-student.webp'
import { FaRegUserCircle } from 'react-icons/fa'

import '../styles/pages/login.scss'
import { useMediaQuery } from 'react-responsive'
import Hero from '../component/guest/Hero.jsx'
import FormRegister from '../component/guest/FormRegister.jsx'

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
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[80px] lg:pt-[95px] xl:pt-[100px]`}>
                <div className="flex flex-col md:flex-row items-center">
                    <Hero heroImg={heroImg} name="register" />

                    <FormRegister
                        name=" Register Student"
                        fields={fields}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        loading={loading}
                        showPassword={showPassword}
                        control={control}
                        toggleShowPassword={toggleShowPassword}
                        isValid={isValid}
                        isSubmitting={isSubmitting}
                    >
                   </FormRegister>
                </div>
            </section>
        </>
    )
}

export default RegisterStudent