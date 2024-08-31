import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMediaQuery } from 'react-responsive'
import FormRegister from '../component/guest/FormRegister'
import { forgotPasswordFields } from '../utils/fields-input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordFormSchema } from '../utils/validation'
import { handleFormErrors } from '../utils/error-handling'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'

const ForgotPassword = () => {
    const isMobile = useMediaQuery({ maxWidth: 1400 })
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset, setError, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(forgotPasswordFormSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.post('/auth/forgot-password', data)
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
                <title>Forgot password . Tutorin</title>
                <meta name="description" content="Forgot password page" />
            </Helmet>
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[120px] lg:pt-[120px] xl:pt-[150px]`}>
                <div className="flex flex-col md:flex-row">
                    <FormRegister
                        name="Forgot Password"
                        fields={forgotPasswordFields}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
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

export default ForgotPassword