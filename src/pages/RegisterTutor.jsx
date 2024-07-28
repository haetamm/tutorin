import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
import teaching from "../assets/teaching.png"
import Logo from "../component/Logo.jsx"

import '../styles/pages/login.scss'

const RegisterTutor = () => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(registerFormSchema),
        mode: 'onChange', 
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const dataTutor = {
                ...data,
                role: 'tutor',
                rating: []
            }
            const { data: tutor } = await axiosInstance.post('/users', dataTutor)
            await axiosInstance.post('profiles', {userId: tutor.id})
            toast.success(`Proses register berhasil, silahkan login ${tutor.email}`)
            reset()
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
            <Logo />
            <div className="flex flex-col md:flex-row justify-center w-full min-h-screen">
              <div
                className="-m-10 flex gap-4 w-full justify-center items-center mt-10 bg-gradient-to-t from-slate-100 md:h-screen text-3xl p-4"
                style={{ backgroundImage: `url(${teaching})`}}
              >
                <div className="ml-10 flex flex-col justify-center gap-10 text-white">
                  <h3>Tutor Teacher</h3>
                  <h1 className="text-4xl ">Register for Tutor</h1>
                  <p className="text-xl flex">
                  We Believe Every Child is a Star, Let&apos;s Achieve Brilliant <br /> Academic Success Together!
                  </p>
                </div>
              </div>
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
                      <p className="text-xs font-thin hover:text-blue-500 mt-5"><label><input type="checkbox" className="mr-2" />Click it! <br/>
                        By registering, I agree to the Tutorin Terms of Service and Policies.</label>
                      </p>
                      <br />
                      <button
                        className="disabled:bg-slate-300 bg-green-500 btn signin inline-block"
                        disabled={!isValid || isSubmitting || loading}
                      >
                        {loading ? "Loading.." : "Register"}
                      </button>
                      <span className="forgot-pass">
                        <a href="#">Lost password?</a>
                      </span>
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