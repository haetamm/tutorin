import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMediaQuery } from 'react-responsive'
import FormRegister from '../component/guest/FormRegister'
import { resetPasswordFields } from '../utils/fields-input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordFormSchema } from '../utils/validation'
import { handleFormErrors } from '../utils/error-handling'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1400 })
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset, setError, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        mode: 'onChange'
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const { search } = useLocation()
    const queryParams = new URLSearchParams(search)
    const token = queryParams.get('token')

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.post(`/auth/reset-password?token=${token}`, data)
            const { data: result} = response
            toast.success(result)
            reset()
        } catch (error) {
            handleFormErrors(error, setError)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Reset password . Tutorin</title>
                <meta name="description" content="Reset password page" />
            </Helmet>
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[90px] lg:pt-[95px] xl:pt-[120px]`}>
                <div className="flex flex-col md:flex-row">
                    <FormRegister
                        name="Reset Password"
                        fields={resetPasswordFields}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                        loading={loading}
                        control={control}
                        isValid={isValid}
                        isSubmitting={isSubmitting}
                    >
                    </FormRegister>
                </div>
            </section>
        </>
    )
}

export default ResetPassword