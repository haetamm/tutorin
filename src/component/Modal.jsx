import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import FormRegisterGoogle from './guest/FormRegisterGoogle'
import LogoutModalComp from './LogoutModalComp'
import CropImage from './profile/CropImage'
import "cropperjs/dist/cropper.css"

const Modal = () => {
  const dispatch = useDispatch()
  const { isOpen, content, confirmLabel, type } = useSelector((state) => state.modal)

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL"
    })
    dispatch({
      type: 'DELETE_USER',
    })
  }

  const confirmHandle = () => {
    Cookies.remove('token')
    dispatch({
        type: 'LOGOUT',
    })
    closeModal()
  }

  return (
    <>
      { isOpen && (
          <div className={`${type === 'Small' ? 'xs:pt-0' : 'xs:pt-36'} fixed inset-0 z-10 pt-0  lg:pt-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className={`${type === 'Small' ? 'sm:max-w-lg md:w-full' : 'w-full lg:w-[80%] '} relative bg-white rounded-lg shadow-xl mx-4 my-8 mt-16`}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 md:pb-0 rounded-lg">
              {content === "Logout" && 
                <LogoutModalComp />
              }
              {content === "Register" && 
                <FormRegisterGoogle />
              }
              {content === "Image" && 
                <CropImage />
              }
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-lg">
            {content === "Logout" && 
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={confirmHandle}
                >
                  {confirmLabel || 'Confirm'}
                </button>
              }
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        
      )}
    </>
  )
}

export default Modal
