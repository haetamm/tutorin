import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaArrowLeft } from 'react-icons/fa';
import axiosInstance from '../utils/api';

const MessageDetailComp = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null); // Changed initial state to null
  const [tutors, setTutors] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const history = useNavigate();

  const handleBack = () => {
    history(-1);
  };

  const fetchJob = async () => {
    try {
      const { data } = await axiosInstance.get(`/jobs/${id}`);
      setJob(data);
      if (data.tutorIds) {
        fetchTutors(data.tutorIds);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const fetchTutors = async (tutorIds) => {
    try {
      const tutorPromises = tutorIds.map((tutorId) =>
        axiosInstance.get(`/users/${tutorId}`)
      );
      const tutorResponses = await Promise.all(tutorPromises);
      setTutors(tutorResponses.map((response) => response.data));
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (!job) return <div></div>; 

  return (
    <div className={`h-screen lg:block w-full`}>
      <div className="flex flex-col w-full max-h-full">
        <div className="flex p-2 h-16 bg-white justify-between">
          <div className="flex items-center">
            {isMobile && <FaArrowLeft onClick={handleBack} className="h-8 w-8 mr-2" />}
            <div>
              <div className="font-bold overflow-ellipsis">{job.title}</div>
              <div className="flex gap-1 text-caption">
                <button className="hover:underline">
                  {tutors.length} application{tutors.length !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="inline-block lg:flex lg:flex-grow overflow-hidden">
          <div className={`k-flex flex-col lg:w-full lg:flex`}>
            <div className={`overflow-y-auto w-full ${isMobile ? 'h-[calc(100vh-13rem)]' : ''}`}>
              <div className="h-full overflow-y-auto flex flex-col-reverse px-1">
                <div className="text-center py-2 text-caption"></div>
                <div className="px-4 py-5 w-full format-rich-text ml-auto">
                  {tutors.map((tutor) => (
                    <div key={tutor.id} className="flex w-full mb-4">
                      <div className="w-full mb-5">
                        <div className="ml-auto bg-white border-blue-200 border-2 rounded p-1">
                          <div className="flex p-2 gap-2 items-center">
                            <div className="w-[20%] justify-center items-center text-center">
                              <img
                                className="rounded-full w-36"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                alt="Profile"
                              />
                            </div>
                            <div className="k-w-4/5 text-start">
                              <button className="btn-outline border-primary-color w-full capitalize">
                                {tutor.name}
                              </button>
                              <p>Ulasan: {tutor.rating.length}</p>
                              <p>
                                Rating: {tutor.rating && tutor.rating.length > 0
                                  ? (tutor.rating.reduce((sum, { rate }) => sum + rate, 0) / tutor.rating.length).toFixed(2)
                                  : 'No ratings'}
                              </p>
                            </div>
                          </div>
                          <div className="p-2">
                            <Link to="#" className="w-full">
                              <button className="btn-outline p-1 w-full capitalize bg-black text-white">
                                View application
                              </button>
                            </Link>
                          </div>
                          <div className="p-2 pt-1">
                            <Link to="#" className="w-full">
                              <button className="btn-outline p-1 w-full capitalize bg-blue-500 text-white">
                                Confirmation
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <form className="p-2">
              <div className="p-2 w-full h-[5rem] border-t">
                <textarea
                  id="editor"
                  className="w-full h-full px-4 py-2 border-2 outline-none"
                />
              </div>
              <div className="p-2 flex text-white gap-1">
                <select
                  className={` bg-blue-500 text-black p-1 mb-1 mt-0 w-full sm:w-32 outline-none`}
                >
                  <option value="">Pilih Tutor</option>
                    {tutors.map((tutor) => (
                      <option key={tutor.id} value={tutor.name}>
                        {tutor.name}
                      </option>
                    ))}
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 p-1 mb-1 mt-0 w-full sm:w-32 sm:ml-auto"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailComp;
