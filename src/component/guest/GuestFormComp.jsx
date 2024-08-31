import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet-async'
import axiosInstance from '../../utils/api'
import { urlPage } from '../../utils/constans'
import { handleFormErrors } from '../../utils/error-handling'
import FormRegister from './FormRegister'
import Hero from './Hero'


const GuestFormComp = ({path, title, desc, heroImg, name, fields, formSchema}) => {
    const [showPassword, setShowPassword] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1400 })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset, setError, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange', 
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.post(`/auth/register/${path}`, data)
            const { data: user} = response
            toast.success(`Registration process successful, please log in, ${user.name}`)
            reset()
            navigate(urlPage.LOGIN)
        } catch (error) {
            handleFormErrors(error, setError)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={desc}/>
            </Helmet>
            <section className={` ${isMobile ? '': 'container mx-auto'} flex-grow pt-[80px] lg:pt-[95px] xl:pt-[100px]`}>
                <div className="flex flex-col md:flex-row items-center">
                    <Hero heroImg={heroImg} name="register" />

                    <FormRegister
                        name={name}
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

GuestFormComp.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    heroImg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    formSchema: PropTypes.object.isRequired
}

export default GuestFormComp
