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
                <div className="relative font-normal">
                    {Icon && <Icon className="absolute left-3 top-5 h-6 w-6 text-gray-400 cursor-pointer"/>}
                    <input
                        {...field}
                        type={isPasswordInput ? (showPassword ? 'text' : 'password') : type}
                        placeholder={placeholder}
                        className={`w-full px-4 py-3 rounded-md bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none pl-12 
                        } ${error ? 'border-red-500' : ''}`}
                    />
                    {isPasswordInput && <PasswordToggleIcon showPassword={showPassword} toggleShowPassword={toggleShowPassword} />}
                    {error && <small className="text-white text-sm mt-1">{error.message}</small>}
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
