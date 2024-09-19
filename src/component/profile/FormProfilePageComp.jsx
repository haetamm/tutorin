import React, {  } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { fieldsProfilePage } from '../../utils/field-select-input'

const FormProfilePageComp = ({ control, errors, loading, handleSubmit, onSubmit, setValue }) => {

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fieldsProfilePage.map((field, index) => (
            <div key={index}>
              <label className="block text-gray-700">{field.label}</label>
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded mt-1 font-normal"
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && (
                      <small className="font-normal text-red-500">{errors[field.name].message}</small>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
          <div>
            <label className="block text-gray-700">Resume</label>
            <Controller
              name="resume"
              control={control}
              defaultValue={null}
              render={() => (
                <div>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      setValue('resume', file)
                    }}
                    className="w-full p-2 border border-gray-300 rounded font-normal"
                  />
                  {errors.resume && (
                    <small className="font-normal text-red-500">{errors.resume.message}</small>
                  )}
                </div>
              )}
            />
          </div>
          <button
            type="submit"
            className="w-full h-[47px] mt-6 bg-blue-400 p-2 border border-gray-300 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </>

  )
}

FormProfilePageComp.propTypes = {
  control: PropTypes.object.isRequired,  
  errors: PropTypes.object.isRequired,   
  loading: PropTypes.bool.isRequired,    
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
}

export default FormProfilePageComp
