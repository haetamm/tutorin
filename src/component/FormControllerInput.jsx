import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'

const FormControllerInput = ({ name, control, defaultValue, type, placeholder, icon: Icon }) => (
    <div className="form-group flex justify-center items-center">
        {Icon && <Icon className="h-5 w-5"/>}
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <>
                    <input
                        {...field}
                        className="form-control outline-none"
                        type={type}
                        placeholder={placeholder}
                    />
                    {fieldState.error?.message && <span className="error">{fieldState.error?.message}</span>}
                </>
            )}
        />
    </div>
);

FormControllerInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.elementType,
}

export default FormControllerInput;
