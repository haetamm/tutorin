import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import PasswordToggleIcon from './PasswordToggleIcon'

const FormControllerInput = ({ name, control, defaultValue = '', type = 'text', placeholder, icon: Icon, isPasswordInput, showPassword, toggleShowPassword }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <div className="relative font-normal m-0">
                    {Icon && <Icon className="absolute left-3 top-4 h-6 w-6 text-gray-400 cursor-pointer"/>}
                    <input
                        {...field}
                        type={isPasswordInput ? (showPassword ? 'text' : 'password') : type}
                        placeholder={placeholder}
                        className={`w-full px-4 py-3 bg-gray-200 rounded-md mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none pl-12 
                            ${error ? 'border-red-500' : ''} `}
                    />
                    {isPasswordInput && <PasswordToggleIcon showPassword={showPassword} toggleShowPassword={toggleShowPassword} />}
                    {error ? <small className="text-red-300 text-sm mt-0 ml-3">{error && error.message}</small> : <small className="text-transparent select-none text-sm">not</small>}
                </div>
            )}
        />
    )
}

FormControllerInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.elementType,
    isPasswordInput: PropTypes.bool,
    showPassword: PropTypes.bool,
    toggleShowPassword: PropTypes.func,
}

export default FormControllerInput
