import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFormSchema } from '../utils/validation'
import { fieldsProfilePage } from '../utils/field-select-input'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const ProfilePageComp = () => {
  const { userId: id } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(createFormSchema),
    mode: 'onChange',
  })

  const fetchProfile = async () => {
    try {
      const { data: profiles } = await axiosInstance.get('/profiles')
      const profile = profiles.find(profile => profile.userId === id)

      if (profile) {
        reset({
          name: profile.name || '',
          phone: profile.phone || '',
          email: profile.email || '',
          address: profile.address || '',
          city: profile.city || '',
          country: profile.country || '',
          postcode: profile.postcode || '',
          resume: null,
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [id])

  const onSubmit = async (data) => {
    setLoading(true)

    const profileData = {
      ...data,
      userId: id,
    }

    try {
      const { data: profiles } = await axiosInstance.get('/profiles')

      const existingProfile = profiles.find(profile => profile.userId === id)
      
      if (existingProfile) {
        await axiosInstance.put(`/profiles/${existingProfile.id}`, profileData)
        
        const { data: user } = await axiosInstance.get(`/users/${existingProfile.userId}`)

        await axiosInstance.put(`/users/${existingProfile.userId}`, {
          ...user,
          name: profileData.name,
          email: profileData.email
        })
        toast.success('Profile successfully updated')
        fetchProfile()
      } else {
        toast.error('Profile not found')
      }
      reset()
      setValue('resume', null)

    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto bg-white mt-5 mb-5 p-1 lg:p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center text-center p-5 border-b md:border-r md:border-b-0">
          <img
            className="rounded-full mt-5 w-36"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="Profile"
          />
        </div>
        <div className="md:col-span-2 p-5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold">Profile Settings</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldsProfilePage.map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-700">{field.label}</label>
                  <Controller
                    name={field.name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded mt-1"
                          placeholder={field.placeholder}
                        />
                        {errors[field.name] && (
                          <small className="font-normal text-red-500">{errors[field.name].message}</small>
                        )}
                      </div>
                    )}
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700">Resume</label>
                <Controller
                  name="resume"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <div>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          setValue('resume', file)
                        }}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      {errors.resume && (
                        <small className="font-normal text-red-500">{errors.resume.message}</small>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-[47px] mt-4 bg-blue-400 p-2 border border-gray-300 rounded"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageComp
