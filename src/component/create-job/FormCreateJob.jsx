import React from 'react'
import FormInput from './FormInput'
import WrapInput from './WrapInput'
import SelectInput from './SelectInput'
import { currencyOptions, frequencyOptions, genderOptions } from '../../utils/field-select-input'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

const FormCreateJob = ({ control, errors, loading, handleSubmit, onSubmit }) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const minDate = tomorrow.toISOString().split('T')[0]

    const createJobFields = [
        { name: 'title', label: 'Job Title' },
        { name: 'subject', label: 'Subject' },
        { name: 'education', label: 'Education' },
        { name: 'address', label: 'Address' },
    ]

    return (
        <>
            <form className="wrap-form" onSubmit={handleSubmit(onSubmit)}>
                {createJobFields.map((field, index) => 
                    (
                        <WrapInput
                            key={index}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    )
                )}

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
                        <div className="">
                            <Controller
                                name="deadline"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="date"
                                        min={minDate}
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
                                placeholder="e.g. 20.000"
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
                    <button type="submit" className="button-custom cursor-pointer button-save bg-blue-600">
                        {loading ? 'Loading...' : 'Send'}
                    </button>
                </div>
            </form>
        </>
    )
}

FormCreateJob.propTypes = {
    control: PropTypes.object.isRequired,  
    errors: PropTypes.object.isRequired,   
    loading: PropTypes.bool.isRequired,    
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default FormCreateJob