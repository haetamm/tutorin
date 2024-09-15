import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormWithGoogleSchema } from '../../utils/validation'
import { registerWithGooleFields } from '../../utils/fields-input'
import SelectInput from '../create-job/SelectInput'
import { roleOptions } from '../../utils/field-select-input'
import FormInput from '../create-job/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { handleFormErrors } from '../../utils/error-handling'
import axiosInstance from '../../utils/api'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

const FormRegisterGoogle = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const { name, username, email } = useSelector((state) => state.regisUser)
    const { control, handleSubmit, reset, setError, formState: {  errors, isValid } } = useForm({
        resolver: zodResolver(registerFormWithGoogleSchema),
        mode: 'onChange',
        criteriaMode: 'all', 
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.post('/auth/register/with-google', data)
            const { data: user } = response
            const { name, roles, token } = user

            Cookies.set('token', token)
            dispatch({
                type: 'LOGIN',
                payload: {
                    name: name,
                    role: roles[0],
                    token: token,
                },
            })
            dispatch({
                type: 'CLOSE_MODAL'
            })
            dispatch({
                type: 'DELETE_USER',
            })
            toast.success(`user ${name} successfully login`)
            reset()
        } catch (error) {
            handleFormErrors(error, setError)
        } finally {
            setLoading(false)
        }
    }
        

    const fetchUserSet = async () => {
        try {
            reset({
                name: name || '',
                username: username || '',
                email: email || '',
            })

        } catch (error) {
            handleFormErrors(error, setError)
        }
    }
  
    useEffect(() => {
        fetchUserSet()
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-2xl font-semibold leading-6 text-gray-900" id="modal-title">Create Account</div>
                {registerWithGooleFields.map((field, index) => (
                    <div key={index} className="my-2">
                        <FormInput
                            name={field.name}
                            control={control}
                            placeholder={field.name}
                            errors={errors}
                        />
                        
                    </div>
                ))}
                <div className='my-1'></div>
                <SelectInput
                    name="role"
                    control={control}
                    options={roleOptions}
                    placeholder="Select Role"
                    errors={errors}
                />
                <button 
                    type="submit" 
                    className="w-full block disabled:cursor-not-allowed bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 text-white font-semibold rounded-lg px-4 py-3 mt-1"
                    disabled={loading || !isValid}
                >
                    {loading ? 'Loading...' : 'Confirm'}
                </button>
            </form>
        </>
    )
}

export default FormRegisterGoogle