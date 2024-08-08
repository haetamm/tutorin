import React, { useState } from 'react'
import heroImg from '../assets/login-img.webp'
import Cookies from 'js-cookie'
import { loginFormSchema } from '../utils/validation.js'
import axiosInstance from '../utils/api'
import { generateToken } from '../utils/security'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdEmail } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import Hero from '../component/guest/Hero.jsx'
import FormRegister from '../component/guest/FormRegister.jsx'
import { Helmet } from 'react-helmet-async'

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

export default Login
