import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { registerFormSchema } from '../utils/validation.js'
import heroImg from '../assets/register-student.webp'
import '../styles/pages/login.scss'
import { useMediaQuery } from 'react-responsive'
import Hero from '../component/guest/Hero.jsx'
import FormRegister from '../component/guest/FormRegister.jsx'
import { Helmet } from 'react-helmet-async'
import { handleFormErrors } from '../utils/error-handling.js'
import { registerFields } from '../utils/fields-input.js'

const RegisterStudent = () => {
    const [showPassword, setShowPassword] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1400 })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset, setError, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(registerFormSchema),
        mode: 'onChange', 
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.post('/auth/register/student', data)
            const { data: student } = response
            toast.success(`Registration process successful, please log in, ${student.name}`)
            reset()
            navigate(urlPage.LOGIN)
        } catch (error) {
            handleFormErrors(error, setError)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Register Student . Tutorin</title>
                <meta name="description" content="Student Registration page" />
            </Helmet>
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[80px] lg:pt-[95px] xl:pt-[100px]`}>
                <div className="flex flex-col md:flex-row items-center">
                    <Hero heroImg={heroImg} name="register" />

                    <FormRegister
                        name=" Register Student"
                        fields={registerFields}
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