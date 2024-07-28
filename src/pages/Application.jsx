import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosMail } from 'react-icons/io'
import axiosInstance from '../utils/api'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const Application = () => {
    const [job, setJobs] = useState([])
    const {userId} = useSelector((state) => state.user)

    const fetchJobs = async () => {
        try {
            const { data } = await axiosInstance.get('/jobs')
            const filteredJobs = data.filter((job) => job.tutorIds.includes(userId))
            setJobs(filteredJobs)
            console.log(job)
        } catch (error) {
            toast.error("Error fetching jobs")
            console.error('Error fetching jobs:', error)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <>
            <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px] p-1 lg:p-3">
                <div className="container h-full mx-auto px-0 lg:px-4 flex flex-col">
                    <h1 className="text-title p-3 text-3xl">Applications</h1>
                    <div className="flex flex-grow overflow-hidden">
                        <div className="flex flex-col gap-4 p-2 w-full font-normal">
                            {job.length === 0 ? (
                                <div className="text-center text-gray-500 tex-lg p-4">
                                    Application not found
                                </div>
                            ) : (
                                job.map((j, index) => (
                                <div key={index} className="bg-white border border-tertiary-ghost-color rounded-md">
                                    <div className="bg-gray-200 flex">
                                        <div className="px-4 py-2 flex gap-1 flex-grow text-lg">
                                            <div className="text-left font-medium hover:underline hover:text-primary-color">{j.title}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="p-2 flex border-r-2 border-gray-300">
                                            <div className="flex">
                                                <button className="text-primary-color my-auto h-6 flex gap-1 rounded px-2">
                                                    <IoIosMail className="h-[24px] w-[24px]" />
                                                    <span className="hidden sm:block my-auto font-medium uppercase">Message</span>
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="px-2 my-auto h-6">
                                            <button className="mat-menu-trigger h-6 rounded">
                                                <BsThreeDotsVertical className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col sm:flex-row gap-4 justify-between text-center sm:text-left">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div>
                                                <a className="text-primary-color text-lg hover:text-black hover:underline">
                                                    {j.subject}
                                                </a>
                                                <div className="text-sm">
                                                    {j.status.find((s) => s.tutorId === userId)?.status || 'No status available'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 sm:flex-col-reverse">
                                            <div className="text-gray-600">
                                                Deadline: {j.deadline}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex gap-1 border-none text-gray-500 rounded-b-lg">
                                        <select name="" id="" className="w-full p-3 outline-none rounded-b-lg  cursor-pointer border-none">
                                            <option value="" className="p-3">Status</option>
                                            <option value="" className="p-3">I got hired</option>
                                            <option value="" className="p-3">I withdrew my application</option>
                                        </select>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Application