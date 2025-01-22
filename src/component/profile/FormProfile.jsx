import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { fieldsProfilePage } from "../../utils/select-options";

const FormProfile = ({ control, errors, loading, handleSubmit, onSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fieldsProfilePage.map((field, index) => (
            <div key={index}>
              <label className="block font-bold">{field.label}</label>
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
                      <small className="font-normal text-red-500">
                        {errors[field.name].message}
                      </small>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full h-[47px] mt-6 bg-blue-400 p-2 border border-gray-300 rounded"
          disabled={loading}
        >
          {loading ? "Loading" : "Save"}
        </button>
      </form>
    </>
  );
};

FormProfile.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default FormProfile;
