import React from "react";
import FormInput from "./FormInput";
import WrapInput from "./WrapInput";
import SelectInput from "./SelectInput";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import {
  createJobFieldsPart1,
  createJobFieldsPart2,
  createJobFieldsPart3,
  createJobFieldsPart4,
} from "../../utils/fields-input";
import {
  currencyOptions,
  frequencyOptions,
  genderOptions,
} from "../../utils/select-options";

const FormCreateJob = ({
  control,
  errors,
  loading,
  handleSubmit,
  onSubmit,
  isValid,
  isSubmitting,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      <form className="wrap-form" onSubmit={handleSubmit(onSubmit)}>
        {createJobFieldsPart1.map(({ name, label }, index) => (
          <WrapInput
            key={index}
            name={name}
            label={label}
            control={control}
            errors={errors}
          />
        ))}

        <div className="wrap-input">
          <div className="title-label"></div>
          <div className=" wrap-label">
            <div className="wrap-selected">
              {createJobFieldsPart2.map(({ name, label }, index) => (
                <div key={index} className="wrap-salary-tag">
                  <div className="wrap-job-title">
                    <div className="title inline-block md:hidden font-bold">
                      {label}
                    </div>
                  </div>
                  <FormInput
                    name={name}
                    control={control}
                    placeholder="Enter your city"
                    errors={errors}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {createJobFieldsPart3.map(({ name, label }, index) => (
          <div key={index} className="wrap-selected">
            <div className="wrap-input">
              <div className="title-label">
                <div className="title">
                  {label} <span className="stars">*</span>
                </div>
              </div>
              {name === "gender" && (
                <SelectInput
                  name={name}
                  control={control}
                  options={genderOptions}
                  placeholder="Select gender"
                  errors={errors}
                />
              )}
              {name === "deadline" && (
                <div className="">
                  <Controller
                    name="deadline"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="date"
                        min={minDate}
                        className={`p-2 outline-none border-black border-2 w-[220px] ${
                          errors.deadline ? "border-red-500" : ""
                        }`}
                        {...field}
                      />
                    )}
                  />
                  {errors.deadline && (
                    <p className="error-message">{errors.deadline.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="wrap-textarea">
          <div className="label-textarea font-bold">
            Accomplishments or descriptions <span className="stars">*</span>
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                rows={5}
                className={`textarea-custom border-black border-2 outline-none ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Enter a description"
                {...field}
              />
            )}
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </div>

        <div className="wrap-salary">
          <div className="font-semibold">
            <p>Previous Salary</p>
            <p>Provide a salary for better job matches. Only you can see it.</p>
          </div>
          <div className="wrap-selected">
            {createJobFieldsPart4.map(({ name, label }, index) => (
              <div key={index} className="wrap-salary-tag">
                <div className="wrap-job-title">
                  <div className="title font-bold">
                    {label}
                    <span className="stars"> *</span>
                  </div>
                </div>
                {name === "amount" ||
                  ("frequency" && (
                    <SelectInput
                      name={name}
                      control={control}
                      options={
                        name === "currency" ? currencyOptions : frequencyOptions
                      }
                      placeholder="Select currency"
                      errors={errors}
                    />
                  ))}
                {name === "amount" && (
                  <FormInput
                    name="amount"
                    control={control}
                    placeholder="e.g. 20.000"
                    errors={errors}
                    type="number"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="wrap-footer">
          <button
            type="submit"
            className="button-custom cursor-pointer button-save bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 text-white disabled:cursor-not-allowed"
            disabled={!isValid || isSubmitting || loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </form>
    </>
  );
};

FormCreateJob.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default FormCreateJob;
