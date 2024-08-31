import React from 'react'
import { registerFormSchema } from '../utils/validation.js'
import heroImg from '../assets/register-student.webp'
import { registerFields } from '../utils/fields-input.js'
import GuestFormComp from '../component/guest/GuestFormComp.jsx'

const RegisterStudent = () => {

    return (
        <>
            <GuestFormComp 
                path="student"
                title="Register Student . Tutorin"
                desc="Student Registration page"
                heroImg={heroImg}
                name="Register Student"
                fields={registerFields}
                formSchema={registerFormSchema}
            />
        </>
    )
}

export default RegisterStudent