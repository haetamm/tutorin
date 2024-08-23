import React, { useEffect, useState } from 'react'
import ProfilePageComp from '../component/profile/ProfilePageComp'
import { Helmet } from "react-helmet-async"
import { useSelector } from "react-redux"
import { useForm } from 'react-hook-form'
import { profileFormSchema } from '../utils/validation'
import axiosInstance from '../utils/api'
import { handleFormErrors } from '../utils/error-handling'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'

const Profile = () => {
    const {name} = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, setValue, reset, setError, formState: { errors } } = useForm({
        resolver: zodResolver(profileFormSchema),
        mode: 'onChange',
    })

    const fetchProfile = async () => {
        try {
            const { data: response } = await axiosInstance.get('/profile')
            const { data: profile } = response

            reset({
                name: profile.name || '',
                username: profile.username || '',
                phone: profile.phone || '',
                email: profile.email || '',
                address: profile.address || '',
                city: profile.city || '',
                country: profile.country || '',
                postcode: profile.postcode || '',
                resume: null,
            })

        } catch (error) {
            handleFormErrors(error, setError)
        }
    }
  
    useEffect(() => {
      fetchProfile()
    }, [])
  
    const onSubmit = async (data) => {
        setLoading(true)

        try {
            const { data: response } = await axiosInstance.put('/profile', data)
            const { data: profile } = response

            toast.success(`Profile ${profile.name} successfully updated`)
            fetchProfile()
            reset()
            setValue(null)
        } catch (error) {
            handleFormErrors(error, setError)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            <Helmet>
                <title>Profile | {name}</title>
                <meta name="description" content="Profile page" />
            </Helmet>
            <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px]">
                <ProfilePageComp 
                    control={control}
                    errors={errors}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    setValue={setValue}
                />
            </div>
        </>
    )
}

export default Profile


