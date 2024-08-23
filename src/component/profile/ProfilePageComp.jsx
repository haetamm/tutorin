import React, {  } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { fieldsProfilePage } from '../../utils/field-select-input'

const ProfilePageComp = ({ control, errors, loading, handleSubmit, onSubmit, setValue }) => {

  return (
    <div className="container mx-auto bg-white mt-5 mb-5 p-1 lg:p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col items-center text-center p-1 border-b md:border-r md:border-b-0">
          <img
            className="rounded-full mt-5 w-56"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="Profile"
          />
        </div>
        <div className="md:col-span-2 p-5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold">Profile Settings</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </div>
    </div>
  )
}

ProfilePageComp.propTypes = {
  control: PropTypes.object.isRequired,  
  errors: PropTypes.object.isRequired,   
  loading: PropTypes.bool.isRequired,    
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
}

export default ProfilePageComp
