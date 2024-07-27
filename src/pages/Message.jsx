import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urlPage } from '../utils/constans';
import axiosInstance from '../utils/api';
import { getHumanReadableDiff } from '../utils/helper';

const Messages = () => {
  const { userId } = useSelector((state) => state.user)
  const [jobs, setJobs] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const { pathname } = useLocation();
  const { role } = useSelector((state) => state.user);

  const getMessagePath = (index) => {
    if (role === 'student') {
      return isMobile
        ? `${urlPage.STUDENT_MESSAGE_MOBILE}/${index}`
        : `${urlPage.STUDENT_MESSAGE}/${index}`;
    } else if (role === 'tutor') {
      return isMobile
        ? `${urlPage.TUTOR_MESSAGE_MOBILE}/${index}`
        : `${urlPage.TUTOR_MESSAGE}/${index}`;
    }
    return '#';
  };

  const fetchJobs = async () => {
    try {
      const { data } = await axiosInstance.get('/jobs');
      const filteredJobs = data.filter((job) => job.studentId === userId)
      setJobs(filteredJobs)
    } catch (error) {
      setError('Error fetching jobs.');
      console.error('Error fetching jobs:', error);
    }
  }

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get('/users');
      setUsers(data); 
    } catch (error) {
      setError('Error fetching users.');
      console.error('Error fetching users:', error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchJobs();
      await fetchUsers();
      setLoading(false);
    };

    fetchData();
  }, [])

  const getTutorNames = (tutorIds) => {
    return users
      .filter(user => tutorIds.includes(user.id))
      .map(user => user.name)
      .join(', ');
  }

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen">
      <div className="ml-16 lg:ml-[210px]">
        <div className="flex">
          <div className="w-full lg:w-[30%] overflow-auto">
            <div className="flex-1 overflow-auto border-black border-r-2">
              <div className="flex flex-col h-screen w-full">
                <h1 className="p-4 bg-white text-xl">Messages</h1>
                <div className="bg-white p-4">
                  <input
                    type="text"
                    placeholder="Search message"
                    className="text-input-box text-input-box-filled border-2 w-full h-10 px-3"
                  />
                </div>

                <div className="flex-grow overflow-y-auto">
                  {jobs.map((job) => {
                    console.log(job.id)
                    const path = getMessagePath(job.id);
                    const isActive = pathname === path;

                    return (
                      <Link
                        to={path}
                        key={job.id}
                        className={`flex items-start border-b border-solid border-black bg-white p-3 text-normal ${
                          isActive ? 'border-l-4 border-blue-500' : ''
                        }`}
                        aria-selected={isActive}
                      >
                        <div className="flex border-b w-full py-2 px-4 gap-2">
                          <div className="whitespace-nowrap flex-grow overflow-hidden text-left">
                            <div className="truncate font-bold">{job.title}</div>
                            <div className="overflow-ellipsis overflow-hidden">
                              {job.tutorIds.length && `${getTutorNames(job.tutorIds)} applied for ${job.title}.`}
                            </div>
                            <p className="float-right text-caption">{getHumanReadableDiff(job.createdAt)}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-full lg:w-3/4 font-normal">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
