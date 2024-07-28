import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '../component/create-job/FormInput.jsx'
import SelectInput from '../component/create-job/SelectInput'
import { currencyOptions, frequencyOptions, genderOptions } from '../utils/field-select-input.js'
import { formatNumber } from '../utils/helper.js'
import { createJobFormSchema } from '../utils/validation.js'
import { toast } from 'sonner'
import axiosInstance from '../utils/api.js'
import { useSelector } from 'react-redux'
import '../styles/pages/create-job.scss'


const CreateJob = () => {
    const [loading, setLoading] = useState(false)
    const {userId} = useSelector((state) => state.user)
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
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
            const { title, subject, gender, education, deadline, address, city, country, description } = data
            const formData = {
                studentId: userId,
                tutorIds: [],
                title,
                subject,
                status: [],
                gender,
                education,
                deadline,
                address,
                city,
                country,
                salary,
                description,
                createdAt: new Date().toISOString(),
                updatedAr: null
            }

            await axiosInstance.post('/jobs', formData)
            toast.success('selamat, iklan anda telah diposting')
            reset()

        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <>
            <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px] p-3 lg:p-6">
                <div className="work-form w-full">
                    <div className="header">
                        <div className="mr-2 header-title">Create job</div>
                    </div>
                    <form className="wrap-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="wrap-input">
                            <div className="title-label">
                                <div className="title">Job Title <span className="stars">*</span></div>
                            </div>
                            <div className="title-label wrap-label">
                                <FormInput
                                    name="title"
                                    control={control}
                                    placeholder=""
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="wrap-input">
                            <div className="title-label">
                                <div className="title">Subject<span className="stars">*</span></div>
                            </div>
                            <div className="title-label wrap-label">
                                <FormInput
                                    name="subject"
                                    control={control}
                                    placeholder=""
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="wrap-input">
                            <div className="title-label">
                                <div className="title">Education<span className="stars">*</span></div>
                            </div>
                            <div className="title-label wrap-label">
                                <FormInput
                                    name="education"
                                    control={control}
                                    placeholder=""
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="wrap-input">
                            <div className="title-label">
                                <div className="title">Address<span className="stars">*</span></div>
                            </div>
                            <div className="title-label wrap-label">
                                <FormInput
                                    name="address"
                                    control={control}
                                    placeholder=""
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="wrap-input">
                            <div className="title-label">
                            </div>
                            <div className=" wrap-label">
                                 <div className="wrap-selected">
                                    <div className="wrap-salary-tag">
                                        <div className="wrap-job-title">
                                            <div className="title inline-block md:hidden">City</div>
                                        </div>
                                        <FormInput
                                            name="city"
                                            control={control}
                                            placeholder="Enter your city"
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="wrap-salary-tag">
                                        <div className="wrap-job-title">
                                            <div className="title inline-block md:hidden">Country</div>
                                        </div>
                                        <FormInput
                                            name="country"
                                            control={control}
                                            placeholder="Enter your country"
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                        <div className="wrap-selected">
                            <div className="wrap-input">
                                <div className="title-label">
                                    <div className="title">Gender <span className="stars">*</span></div>
                                </div>
                                <SelectInput
                                    name="gender"
                                    control={control}
                                    options={genderOptions}
                                    placeholder="Select gender"
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="wrap-selected">
                            <div className="wrap-input">
                                <div className="title-label">
                                    <div className="title">Deadline <span className="stars">*</span></div>
                                </div>
                                <div className="select-wrap">
                                    <Controller
                                        name="deadline"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                            type="date"
                                            className={`p-2 outline-none border-black border-2 w-[220px] ${errors.deadline ? 'border-red-500' : ''}`}
                                            {...field}
                                            />
                                        )}
                                    />
                                    {errors.deadline && <p className="error-message">{errors.deadline.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="wrap-textarea">
                            <div className="label-textarea">Accomplishments or descriptions</div>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        rows={5}
                                        className={`textarea-custom border-black border-2 outline-none ${errors.description ? 'border-red-500' : ''}`}
                                        placeholder="Enter a description"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.description && <p className="error-message">{errors.description.message}</p>}
                        </div>

                        <div className="wrap-salary">
                            <div>Previous Salary</div>
                            <div>Provide a salary for better job matches. Only you can see it.</div>
                            <div className="wrap-selected">
                                <div className="wrap-salary-tag">
                                    <div className="wrap-job-title">
                                        <div className="title">Currency</div>
                                    </div>
                                    <SelectInput
                                        name="currency"
                                        control={control}
                                        options={currencyOptions}
                                        placeholder="Select currency"
                                        errors={errors}
                                    />
                                </div>

                                <div className="wrap-salary-tag">
                                    <div className="wrap-job-title">
                                        <div className="title">Amount</div>
                                    </div>
                                    <FormInput
                                        name="amount"
                                        control={control}
                                        placeholder="e.g. 20.000.000"
                                        errors={errors}
                                        type="number"
                                    />
                                </div>

                                <div className="wrap-salary-tag">
                                    <div className="wrap-job-title">
                                        <div className="title">Frequency</div>
                                    </div>
                                    <SelectInput
                                        name="frequency"
                                        control={control}
                                        options={frequencyOptions}
                                        placeholder="Select frequency"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-footer">
                            <button type="submit" className="button-custom cursor-pointer button-save bg-blue-400">
                                {loading ? 'Loading...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateJob;
