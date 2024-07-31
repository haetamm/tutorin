import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

const FormInput = ({ name, control, placeholder, errors, type }) => {
  return (
    <>
      <div className="inline-block w-full">
        <div className="w-full">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                type={type}
                className={`p-2 w-full outline-none border-black border-2 ${errors[name] ? 'border-red-500' : ''}`}
                placeholder={placeholder}
                {...field}
              />
            )}
          />
        </div>
        {errors[name] && <p className="error-message mt-1 text-sm">{errors[name].message}</p>}
      </div>
    </>
  )
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object.isRequired,
  type: PropTypes.string
}

export default FormInput
