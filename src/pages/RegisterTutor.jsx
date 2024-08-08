import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { registerFormSchema } from '../utils/validation.js'
import { MdEmail } from 'react-icons/md'
import { FaRegUserCircle } from 'react-icons/fa'
import heroImg from '../assets/register-tutor.webp'
import '../styles/pages/login.scss'
import { useMediaQuery } from 'react-responsive'
import Hero from '../component/guest/Hero.jsx'
import FormRegister from '../component/guest/FormRegister.jsx'
import { Helmet } from 'react-helmet-async'

const RegisterTutor = () => {
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
        const dataTutor = {
            ...data,
            role: 'tutor',
            rating: []
        }
        const { data: tutor } = await axiosInstance.post('/users', dataTutor)
        await axiosInstance.post('profiles', {userId: tutor.id, name: tutor.name, email: tutor.email})
        toast.success(`Registration process successful, please log in, ${tutor.name}`)
        reset()
        navigate(urlPage.LOGIN)
    } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('An error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
    };

    const fields = [
        { name: 'name', type: 'text', placeholder: 'Name', icon: FaRegUserCircle },
        { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
        { name: 'password', type: 'password', placeholder: 'Password', icon: null, isPasswordInput: true },
        { name: 'passwordConfirmation', type: 'password', placeholder: 'Password Confirmation', icon: null, isPasswordInput: true },
    ];

    return (
        <>
            <Helmet>
                <title>Register Tutor . Tutorin</title>
                <meta name="description" content="Tutor Registration page" />
            </Helmet>
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[80px] lg:pt-[95px] xl:pt-[100px]`}>
                <div className="flex flex-col md:flex-row items-center">
                    <Hero heroImg={heroImg} name="register" />

                    <FormRegister
                        name="Register Tutor"
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

export default RegisterTutor
