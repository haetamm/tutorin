import React from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

const SelectInput = ({ name, control, options, placeholder, errors }) => (
  <div className="select-wrap">
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          className={`p-2 w-full h-[44px] outline-none border-black border-2 ${errors[name] ? 'border-red-500' : ''}`}
          {...field}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
    {errors[name] && <p className="error-message">{errors[name].message}</p>}
  </div>
)

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
}

export default SelectInput;
