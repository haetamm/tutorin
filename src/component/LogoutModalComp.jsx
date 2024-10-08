import React from 'react'

const LogoutModalComp = () => {
    return (
        <>
            <div className="sm:flex sm:items-start mb-4">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 ">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>

                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Log out of Tutorin?</div>
                    <div className="mt-2">
                    <p className="text-sm text-gray-500">You can always log back in any time.</p>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogoutModalComp