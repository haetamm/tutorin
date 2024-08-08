import React from 'react'
import PropTypes from 'prop-types'
import FormInput from './FormInput'

const WrapInput = ({ name, label, control, errors }) => {
    return (
        <>
            <div className="wrap-input">
                <div className="title-label">
                    <div className="title">{label}<span className="stars">*</span></div>
                </div>
                <div className="title-label wrap-label">
                    <FormInput
                        name={name}
                        control={control}
                        placeholder=""
                        errors={errors}
                    />
                </div>
            </div>
        </>
    )
}

WrapInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default WrapInput