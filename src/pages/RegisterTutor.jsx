import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormControllerInput from '../component/FormControllerInput'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'
import { registerFormSchema } from '../utils/validation.js'
import { MdEmail } from 'react-icons/md'
import { IoIosEyeOff } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import '../styles/pages/login.scss'

const RegisterTutor = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = useForm({
      resolver: zodResolver(registerFormSchema),
      mode: 'onChange', 
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const dataTutor = {
        ...data,
        role: 'tutor',
        rating: []
      }
      const { data: tutor } = await axiosInstance.post('/users', dataTutor)
      await axiosInstance.post('profiles', {userId: tutor.id, name: tutor.name, email: tutor.email})
      toast.success(`Registration process successful, please log in, ${tutor.name}`)
      reset()
      navigate(urlPage.LOGIN)
    } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('An error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  const fields = [
      { name: 'name', type: 'text', placeholder: 'Name', icon: FaRegUserCircle },
      { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
      { name: 'password', type: 'password', placeholder: 'Password', icon: IoIosEyeOff },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center w-full min-h-screen">
        <div className="w-full md:max-w-2xl pt-10 bg-gradient-to-b md:h-screen flex justify-center">
          <div className="loginPage">
            <div className="form-container">
              <form className="form-horizontal w-96" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="title">Tutor Register Form</h3>
                {fields.map((field) => (
                  <FormControllerInput
                    key={field.name}
                    name={field.name}
                    control={control}
                    defaultValue=""
                    type={field.type}
                    placeholder={field.placeholder}
                    icon={field.icon}
                  />
                ))}
                <button
                  className="disabled:bg-slate-300 bg-green-500 btn signin inline-block"
                  disabled={!isValid || isSubmitting || loading}
                >
                  {loading ? "Loading.." : "Register"}
                </button>
                <Link to={urlPage.LOGIN} className="register">
                  Have an account?{" "}
                  <span className="text-blue-600 hover:text-lg">Sign in</span>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterTutor