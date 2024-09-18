import React, { useEffect, useState } from 'react'
import FormProfilePageComp from '../component/profile/FormProfilePageComp'
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from 'react-hook-form'
import { profileFormSchema } from '../utils/validation'
import axiosInstance from '../utils/api'
import { handleFormErrors } from '../utils/error-handling'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'

const Profile = () => {
    const dispatch = useDispatch()
    const {name} = useSelector((state) => state.user)
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, setValue, reset, setError, formState: { errors } } = useForm({
        resolver: zodResolver(profileFormSchema),
        mode: 'onChange',
    })

    const fetchProfile = async () => {
        try {
            const { data: response } = await axiosInstance.get('/profile')
            const { data: profile } = response
            if (profile.image) {
                const timestamp = new Date().getTime(); // Adding a timestamp to bust the cache
                setImage(`${import.meta.env.VITE_API_BASE_URL}profile/${profile.image.id}/images?timestamp=${timestamp}`);
            } else {
                setImage('https://avatars.githubusercontent.com/u/90743535?s=96&v=4');
            }
            

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

    const handleImage = () => {
        dispatch({
            type: 'OPEN_MODAL',
            payload: {
                content: 'Image',
                confirmLabel: 'Upload',
                type: 'Big'
            }
        })
        dispatch({
            type: 'SET_IMAGE',
            payload: {
                imageUrl: image,
                fetch: fetchProfile
            }
        })
    }
    
    return (
        <>
            <Helmet>
                <title>Profile | {name}</title>
                <meta name="description" content="Profile page" />
            </Helmet>
            <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px]">
                <div className="container mx-auto bg-white mt-5 mb-5 p-1 lg:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="flex flex-col items-center text-center p-1 border-r-none lg:border-r">
                            <img
                                onClick={handleImage}
                                className="rounded-full mt-5 w-56 h-56 cursor-pointer"
                                src={image}
                                alt="Profile"
                            />
                            </div>
                            <FormProfilePageComp 
                                control={control}
                                errors={errors}
                                loading={loading}
                                handleSubmit={handleSubmit}
                                onSubmit={onSubmit}
                                setValue={setValue}
                            />
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Profile


