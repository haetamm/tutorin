import React from 'react'
import '../styles/pages/create-job.scss'

const CreateJob = () => {
  return (
      <>
          <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px] p-3 lg:p-6">
                <div className="work-form w-full">
                    <div className="header">
                        <div className="mr-2 header-title">Create job</div>
                    </div>
                    <form className="wrap-form">

                        <div className="wrap-input">
                            <div className="title-label">
                            <div className="title">Job Title <span className="stars">*</span></div>
                            </div>
                            <div className="title-label wrap-label">
                            <input
                                type="text"
                                className=" p-2 w-full outline-none border-black border-2"
                                placeholder="Enter your job title"
                            />
                            </div>  
                        </div>

                        <div className="wrap-input">
                            <div className="title-label">
                            <div className="title">Company <span className="stars">*</span></div>
                            </div>
                            <div className="title-label wrap-label">
                            <input
                                type="text"
                                className="p-2 w-full outline-none border-black border-2"
                                placeholder="Enter company name"
                            />
                            </div>  
                        </div>

                        <div className="wrap-selected">

                            {/* started */}
                            <div className="wrap-input">
                            <div className="title-label">
                                <div className="title">From <span className="stars">*</span></div>
                            </div>
                            <div className="select-wrap">
                                <div className="title-label wrap-label">
                                <select
                                    className="p-2 w-full outline-none border-black border-2"
                                >
                                    <option value="" >Month</option>
                                </select>
                                </div>  
                                <div className="title-label wrap-label">
                                <select
                                    className="p-2 w-full outline-none border-black border-2"
                                >
                                    <option value="" >Year</option>
                                </select>
                                </div>  
                            </div>
                            </div>

                        </div>



                        <div className="wrap-checkbox">
                            <input
                                type="checkbox"
                                name="currentFlag"
                                id="currentFlag"
                                className="custom-checkbox cursor-pointer"
                            />
                            <label htmlFor="currentFlag" >I currently work here</label>
                        </div>

                        <div className="wrap-textarea">
                            <div className="label-textarea">Accomplishments or descriptions (optional)</div>
                            <textarea
                                rows={5}
                                className="textarea-custom border-black border-2"
                            />

                        </div>

                        <div className="wrap-selected">
                            <div className="wrap-job">
                            <div className="wrap-job-title">
                                <div className="title">Job Level</div>
                            </div>
                            <select className="p-2 w-full outline-none border-black border-2">
                                <option value="" >Not Applicable</option>
                                <option value="1" className="select-option-custom">Intership / OJT</option>
                                <option value="2" className="select-option-custom">Entry Level / Junior, Apprentice</option>
                                <option value="3" className="select-option-custom">Associate / Supervisor</option>
                                <option value="4" className="select-option-custom">Mid-Senior Level / Manager</option>
                                <option value="5" className="select-option-custom">Director / Executive</option>
                            </select>
                            </div>
                            <div className="wrap-job">
                            <div className="wrap-job-title">
                                <div className="title">Job Function</div>
                            </div>
                            <select className="p-2 w-full outline-none border-black border-2">
                                <option value="" >e.g. Accounting and Finance</option>
                            </select>
                            </div>
                        </div>

                        <div className="wrap-salary">
                            <div>Previous Salary (optional)</div>
                            <div>Provide a salary for better job matches. Only you can see it.</div>
                                    
                            <div className="wrap-selected">
                                <div className="wrap-salary-tag">
                                    <div className="wrap-job-title">
                                        <div className="title">Currency</div>
                                    </div>
                                    <select className="p-2 w-full outline-none border-black border-2">
                                        <option value="1" className="select-option-custom">PHP - ₱</option>
                                        <option value="2" className="select-option-custom">USD - $</option>
                                        <option value="3" className="select-option-custom">IDR - Rp</option>
                                    </select>
                                </div>
                                <div className="wrap-salary-tag">
                                    <div className="wrap-job-title">
                                        <div className="title">Amount</div>
                                    </div>
                                    <input type="text" className="input-salary-custom p-2 w-full outline-none border-black border-2" placeholder="e.g. 20, 000"/>
                                </div>
                                <div className="wrap-salary-tag">
                                    <div className="wrap-job-title">
                                        <div className="title">Frequency</div>
                                    </div>
                                    <select className="p-2 w-full outline-none border-black border-2 cursor-pointer">
                                    <option value="2" className="select-option-custom">Per Month</option>
                                    <option value="1" className="select-option-custom">Per Year</option>
                                    <option value="4" className="select-option-custom">Per Day</option>
                                    <option value="5"  className="select-option-custom">Per Hours</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="wrap-footer">
                            <div className="button-custom cursor-pointer button-cancel">
                            Save
                            </div>
                        </div>
                    </form>
                </div>
            </div>
      </>
  )
}

export default CreateJob