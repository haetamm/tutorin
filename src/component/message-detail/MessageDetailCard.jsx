import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const MessageDetailCard = ({ tutor, updateStatus, loading}) => {
    const [image, setImage] = useState('')

    useEffect(() => {
        if (tutor.image) {
            const timestamp = new Date().getTime();
            setImage(`${import.meta.env.VITE_API_BASE_URL}profile/${tutor.image.id}/images?timestamp=${timestamp}`);
        } else {
            setImage('https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg');
        }
    }, [])

    return (
        <>
            <div key={tutor.id} className="flex w-full mb-4">
                <div className="w-full mb-5">
                    <div className="ml-auto bg-white border-blue-200 border-2 rounded p-1">
                        <div className="flex p-2 gap-2 items-center">
                            <div className="w-[20%] justify-center items-center text-center">
                                <img
                                    className="rounded-full w-36"
                                    src={image}
                                    alt="Profile"
                                />
                            </div>
                            <div className="k-w-4/5 text-start">
                                <p>{tutor.name}</p>
                                <p>Ulasan: 0</p>
                                <p>Rating: No ratings</p>
                            </div>
                        </div>
                        <div className="p-2">
                            <button className=" p-1 w-full capitalize bg-black text-white">
                                View application
                            </button>
                        </div>
                        <div className="p-2 pt-1 flex gap-3">
                            <button
                                onClick={tutor.status === "REJECTED" ? null : () => updateStatus('REJECTED', tutor.id)}
                                className=" p-1 w-full capitalize bg-red-500 text-white disabled:cursor-not-allowed disabled:bg-red-300"
                                disabled={tutor.status === "REJECTED" || loading[tutor.id]}
                            >
                                {loading[tutor.id] ? 'Loading...' : 'Reject'}
                            </button>
                            <button
                                onClick={tutor.status === "ACCEPTED" ? null : () => updateStatus('ACCEPTED', tutor.id)}
                                className=" p-1 w-full capitalize bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-blue-300"
                                disabled={tutor.status === "ACCEPTED" || loading[tutor.id]}
                            >
                                {loading[tutor.id] ? 'Loading...' : 'Accept'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

MessageDetailCard.propTypes = {
    tutor: PropTypes.object.isRequired,
    updateStatus: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

export default MessageDetailCard