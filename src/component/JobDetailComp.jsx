import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { GiShare } from 'react-icons/gi';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate, getHumanReadableDiff } from '../utils/helper';
import { toast } from 'sonner';
import axiosInstance from '../utils/api';
import { useSelector } from 'react-redux';

const JobDetailComp = () => {
    const { id } = useParams()
    const [job, setJob] = useState()
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1023 })
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const fetchJob = async () => {
        try {
            const { data } = await axiosInstance.get(`/jobs/${id}`);
            setJob(data);
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    }

    useEffect(() => {
        fetchJob()
    }, [id])

    const onSubmit = async (jobId, data, userId) => {
        setLoading(true);
        
        try {
            const updatedTutorIds = data.tutorIds.includes(userId) ? data.tutorIds : [...data.tutorIds, userId];

            const updateData = { 
                ...data,
                tutorIds: updatedTutorIds,
                updatedAt: new Date().toISOString()
            };
            const response = await axiosInstance.put(`/jobs/${jobId}`, updateData)
            if (response.status === 200) {
                toast.success('Application submitted successfully.')
                fetchJob()
            } else {
                toast.error('Failed to submit application.')
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    if (!job) return null;

    const isAlreadyApplied = job.tutorIds.includes(user.userId);

    return (
        <>
            <div className="border-tertiary-ghost-color md:border md:border-t-0 md:rounded-b-lg font-normal">
                <div className="lg:block h-60">
                    <div className="hidden lg:block h-[9rem] nav-background"></div>
                    <div className="bg-white px-3 pt-7 lg:p-6 md:rounded-b-lg">
                        <div className="inline-block md:flex md:justify-between">
                            <div className="mb-0 flex items-center">
                                {isMobile && (
                                    <div className="flex items-center mb-0">
                                        <FaArrowLeft onClick={handleBack} className="h-8 w-8 mr-2" />
                                    </div>
                                )}
                                <span className="flex items-end">
                                    <div className="text-current visited:text-inherit hover:text-current">
                                        <h1 className="text-title inline-flex items-center md:text-primary-head md:flex lg:mt-16 text-4xl font-bold">
                                            {job.title}
                                        </h1>
                                    </div>
                                </span>
                            </div>
                            <div className="text-subdued text-caption md:text-right mt-4 lg:mt-0">
                                <p>Posted about {getHumanReadableDiff(job.createdAt)} and deadline of application is on {formatDate(job.deadline)}</p>
                            </div>
                        </div>
                        <ul className="md:flex mt-2">
                            <li>
                                <div className="text-black hover:text-black visited:text-black text-md">
                                    <span>{job.city}, {job.country}</span>
                                </div>
                                <br />
                            </li>
                            <li className="md:list-disc md:ml-7">
                                <p className="text-black text-sm hover:text-black visited:text-black">{job.salary}</p>
                            </li>
                        </ul>
                        <div className="mt-4 mb-8 md:flex md:justify-between">
                            <button
                                onClick={() => !isAlreadyApplied && onSubmit(job.id, job, user.userId)}
                                className={`k-w-full md:k-w-auto md:k-inline-block k-btn-primary k-btn-lg k-mb-4 md:k-mb-0 p-4 rounded mb-2 lg:mb-0 ${isAlreadyApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400'}`}
                                disabled={isAlreadyApplied || loading}
                            >
                                {loading ? 'Loading...' : isAlreadyApplied ? 'Applied' : 'Apply'}
                            </button>

                            <div className="flex gap-4 justify-between">
                                <button className="btn-tertiary btn-lg flex items-center justify-center flex-1 md:flex-none p-4 bg-blue-400 rounded">
                                    <GiShare className="h-6 w-6 mr-1" /> Save
                                </button>
                                <button className="btn-tertiary btn-lg flex items-center justify-center flex-1 md:flex-none p-4 bg-blue-400 rounded">
                                    <FaShareAlt className="h-6 w-6 mr-1" /> Share
                                </button>
                            </div>
                        </div>
                        <div className="py-8 border-t border-tertiary-color md:flex md:justify-center">
                            <div className="md:w-full md:pr-4 p-space">
                                <h2 className="text-title font-semibold mb-2">Job Description :</h2>
                                <div className="mb-4 show-bullets">
                                    {job.description}
                                </div>
                                <div className="md:flex mt-8">
                                    <div className="md:mr-4">
                                        <div className="mb-4">
                                            <div className="text-overline text-subdued">Address :</div>
                                            <div className="inline-flex items-center justify-center">
                                                {job.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default JobDetailComp
