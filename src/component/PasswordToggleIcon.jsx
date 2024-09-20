import React from 'react'
import PropTypes from 'prop-types'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'

const PasswordToggleIcon = ({ showPassword, toggleShowPassword }) => (
  <div onClick={toggleShowPassword} >
    {!showPassword ? <IoIosEye className="absolute left-3 top-5 h-6 w-6 text-gray-400 cursor-pointer"/> : <IoIosEyeOff  className="absolute left-3 top-5 h-6 w-6 text-gray-400 cursor-pointer"/>}
  </div>
);

PasswordToggleIcon.propTypes = {
    showPassword: PropTypes.bool.isRequired,
    toggleShowPassword: PropTypes.func.isRequired,
}

export default PasswordToggleIcon
