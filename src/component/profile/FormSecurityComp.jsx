import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../utils/api';
import { toast } from 'sonner';
import { handleFormErrors } from '../../utils/error-handling';
import { zodResolver } from '@hookform/resolvers/zod';
import { securityFormSchema } from '../../utils/validation';
import { fieldsSecurityProfilePage } from '../../utils/fields-input';
import FormControllerInput from '../FormControllerInput';
import { Link } from 'react-router-dom';
import { urlPage } from '../../utils/constans';

const FormSecurityComp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset, setError, formState: { isValid, isSubmitting }  } = useForm({
        resolver: zodResolver(securityFormSchema),
        mode: 'onChange',
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.post('/user/secure', data)
            toast.success(response.data)
            reset()
        } catch (error) {
            handleFormErrors(error, setError)
        } finally {
            setLoading(false)
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
             <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 xs:gap-2 lg:gap-3">
                    {fieldsSecurityProfilePage.map((field, index) => (
                        <div key={index}>
                            <label className="block text-gray-700">{field.placeholder}</label>
                            <FormControllerInput
                                name={field.name}
                                control={control}
                                type={field.isPasswordInput ? (showPassword ? 'text' : 'password') : field.type}
                                placeholder=""
                                icon={field.icon}
                                isPasswordInput={field.isPasswordInput}
                                showPassword={showPassword}
                                toggleShowPassword={toggleShowPassword}
                            />
                        </div>
                    ))}
                    <div>
                        <div className="w-full h-[49px] mt-1 xs:mt-7 bg-blue-400 px-4 py-3 border border-gray-300 text-black rounded text-center text-md">
                            <Link to={urlPage.FORGOT_PASSWORD} className="cursor-pointer hover:underline">Forgot Password?</Link>
                        </div>
                    </div>

                </div>
                <button
                    type="submit"
                    className="disabled:cursor-not-allowed bg-blue-700 disabled:bg-blue-300 hover:bg-blue-800 w-full h-[47px] mt-2 px-4 py-3 border border-gray-300 rounded"
                    disabled={!isValid || isSubmitting || loading}
                >
                    {loading ? 'Loading...' : 'Save'}
                </button>
            </form>
        </>
    )
}

export default FormSecurityComp