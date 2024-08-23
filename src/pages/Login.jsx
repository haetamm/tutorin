import React, { useState } from 'react'
import heroImg from '../assets/login-img.webp'
import Cookies from 'js-cookie'
import { loginFormSchema } from '../utils/validation.js'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMediaQuery } from 'react-responsive'
import Hero from '../component/guest/Hero.jsx'
import FormRegister from '../component/guest/FormRegister.jsx'
import { Helmet } from 'react-helmet-async'
import { handleFormErrors } from '../utils/error-handling.js'
import { loginFields } from '../utils/fields-input.js'
import { useNavigate } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1400 })
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange', 
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.post('/auth/login', data)
            const { data: user } = response
            const { name, roles, token } = user
            navigate(urlPage.STUDENT)
            
            Cookies.set('token', token)
            dispatch({
                type: 'LOGIN',
                payload: {
                    name: name,
                    role: roles[0],
                    token: token,
                },
            })
            toast.success('Login successful')
         
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("username or password incorrect")
            } else {
                handleFormErrors(error, setError)
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Helmet>
                <title>Login . Tutorin</title>
                <meta name="description" content="Login page" />
            </Helmet>
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[80px] lg:pt-[95px] xl:pt-[100px]`}>
                <div className="flex flex-col md:flex-row">
                    <Hero heroImg={heroImg} name="login" />

                    <FormRegister
                        name="Login"
                        fields={loginFields}
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

export default Login
