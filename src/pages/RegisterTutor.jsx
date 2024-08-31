import React from 'react'
import { registerFormSchema } from '../utils/validation.js'
import heroImg from '../assets/register-tutor.webp'
import { registerFields } from '../utils/fields-input.js'
import GuestFormComp from '../component/guest/GuestFormComp.jsx'

const RegisterTutor = () => {

    return (
        <>
            <GuestFormComp 
                path="tutor"
                title="Register Tutor . Tutorin"
                desc="Tutor Registration page"
                heroImg={heroImg}
                name="Register Tutor"
                fields={registerFields}
                formSchema={registerFormSchema}
            />
        </>
    )
}

export default RegisterTutor
