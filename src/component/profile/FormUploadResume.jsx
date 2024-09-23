import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleFormErrors } from '../../utils/error-handling'
import { resumeFormShema } from '../../utils/validation'
import PropTypes from 'prop-types'
import axiosInstance from '../../utils/api'
import { useSelector } from 'react-redux'
import { roles } from '../../utils/constans'

const FormUploadResume = ({resume, fetchProfile, name}) => {
    const { role } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, setValue, reset, setError, formState: { errors } } = useForm({
        resolver: zodResolver(resumeFormShema),
        mode: 'onChange',
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await axiosInstance.post('/user/resume', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            toast.success(`Your resume successfully updated`)
            fetchProfile()
            reset()
            setValue(null)
        } catch (error) {
            handleFormErrors(error, setError)
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadResume = async (id) => {
        try {
            const response = await axiosInstance.get(`/user/${id}/resume`, {
                responseType: 'blob',
            });
            
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        } catch (error) {
            handleFormErrors(error, null)
            console.error('Error fetching resume:', error)
        }
    }

    const renameFile = (file, newName) => {
        return new File([file], newName, { type: file.type });
    }
    
    return (
        <>
            {role === roles.TUTOR && (
                <div className="mt-10 w-full flex gap-1 px-4 md:px-3">
                    <button
                        onClick={() => {handleDownloadResume(resume? resume.id : null)}}
                        disabled={loading} 
                        className="w-[70%] h-[48px] text-start font-normal text-md text-black p-2 border border-gray-300 rounded hover:underline"
                    >
                        {loading ? 'Uploading...' : (resume ? resume.name.substr(13) : 'Upload your resume')}
                    </button>

                    <form onSubmit={handleSubmit(onSubmit)} className="w-[30%]">
                        <Controller
                            name="resume"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="fileInput"
                                        className="hidden"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const newFileName = `${name}.pdf`
                                                const renamedFile = renameFile(file, newFileName)

                                                field.onChange(renamedFile);
                                                handleSubmit(onSubmit)()
                                            }
                                        }}
                                    />

                                    <button
                                            type="button"
                                            onClick={() => document.getElementById('fileInput').click()}
                                            className="w-full h-[48px] bg-blue-500 text-white p-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-600"
                                        >
                                        {resume? 'Update' : 'Upload'}
                                    </button>
                                    {errors.resume && ( <small className="font-normal text-red-500 inline-block">{errors.resume.message}</small>)}
                                </>
                            )}
                        />
                    </form>
                </div>
            )}
        </>
    )
}

FormUploadResume.propTypes = {
    resume: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired,
    name: PropTypes.string
  }

export default FormUploadResume