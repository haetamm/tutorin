import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatNumber } from '../utils/helper.js'
import { createJobFormSchema } from '../utils/validation.js'
import { toast } from 'sonner'
import axiosInstance from '../utils/api.js'
import { useSelector } from 'react-redux'
import '../styles/pages/create-job.scss'
import { Helmet } from 'react-helmet-async'
import { handleFormErrors } from '../utils/error-handling.js'
import FormCreateJob from '../component/create-job/FormCreateJob.jsx'

const CreateJob = () => {
    const [loading, setLoading] = useState(false)
    const { name } = useSelector((state) => state.user)
    const { control, handleSubmit, reset, setError, formState: { errors } } = useForm({
        resolver: zodResolver(createJobFormSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            subject: '',
            gender: '',
            education: '',
            deadline: '',
            address: '',
            city: '',
            country: '',
            description: '',
            currency: '',
            amount: '',
            frequency: '',
        }
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const formattedAmount = formatNumber(Number(data.amount))
            const salary = `${data.currency} ${formattedAmount} ${data.frequency}`
            const formData = {
                ...data,
                salary
            }
            await axiosInstance.post('/jobs', formData)
            toast.success('Tutor request successful')
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
                <title>Create Request tutor | {name}</title>
                <meta name="description" content="Request tutor page" />
            </Helmet>
            <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px] p-3 pt-[25px] lg:pt-[28px] lg:p-6">
                <div className="work-form w-full">
                    <div className="header h-[48px] flex items-center">
                        <div className="mr-2 header-title">Create Request Tutor</div>
                    </div>
                    <FormCreateJob 
                        control={control} 
                        errors={errors} 
                        loading={loading} 
                        handleSubmit={handleSubmit} 
                        onSubmit={onSubmit} 
                    />
                </div>
            </div>
        </>
    )
}

export default CreateJob
