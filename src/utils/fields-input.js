import { MdEmail } from 'react-icons/md'
import { FaUser, FaUserCircle } from 'react-icons/fa'

export const registerFields = [
    { name: 'name', type: 'text', placeholder: 'Name', icon: FaUser },
    { name: 'username', type: 'text', placeholder: 'Username', icon: FaUserCircle },
    { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
    { name: 'password', type: 'password', placeholder: 'Password', icon: null, isPasswordInput: true },
    { name: 'passwordConfirmation', type: 'password', placeholder: 'Password Confirmation', icon: null, isPasswordInput: true },
]

export const registerWithGooleFields = [
    { name: 'name', type: 'text', placeholder: 'Name', icon: FaUser },
    { name: 'username', type: 'text', placeholder: 'Username', icon: FaUserCircle },
    { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
]


export const loginFields = [
    { name: 'username', type: 'username', placeholder: 'Username', icon: FaUserCircle },
    { name: 'password', type: 'password', placeholder: 'Password', icon: null, isPasswordInput: true },
]

export const forgotPasswordFields = [
    { name: 'email', type: 'email', placeholder: 'Email', icon: MdEmail },
]

export const resetPasswordFields = [
    { name: 'password', type: 'password', placeholder: 'Password', icon: null, isPasswordInput: true },
    { name: 'passwordConfirmation', type: 'password', placeholder: 'Password Confirmation', icon: null, isPasswordInput: true },
]