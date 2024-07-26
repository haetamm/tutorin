import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate  } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaArrowLeft } from 'react-icons/fa';

const MessageDetailComp = ({ id }) => {
    const isMobile = useMediaQuery({ maxWidth: 1023 })
    const history = useNavigate();

    const handleBack = () => {
        history(-1);
    };

  return (
    <>
      <div className={`h-screen lg:block w-full`}>
        <div className="flex flex-col w-full max-h-full">
          <div className="flex p-2 h-16 bg-white justify-between">
            <div className="flex items-center">
                {isMobile && <FaArrowLeft onClick={handleBack} className="h-8 w-8 mr-2" />}
                <div>
                    <div className="font-bold overflow-ellipsis">Jendela Group {id}</div>
                    <div className="flex gap-1 text-caption">
                        <div>Online about 9 hours ago</div>
                        <button className="text-primary-color hover:underline">
                        1 application
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
                  <div className="text-center py-2 text-caption">
                    <div className="text-caption text-center py-2">
                      <p>You submitted an application for Frontend Web Developer.</p>
                      <p>Message the company if you wish to follow up or ask for more information.</p>
                    </div>
                    <div className="text-caption text-center py-2">
                      <p>You submitted an application for Frontend Web Developer.</p>
                      <p>Message the company if you wish to follow up or ask for more information.</p>
                    </div>
                    <div className="text-caption text-center py-2">
                      <p>You submitted an application for Frontend Web Developer.</p>
                      <p>Message the company if you wish to follow up or ask for more information.</p>
                    </div>

                    <div>
                      <span>
                        Application for Frontend Web Developer seen by recruiter 3 months ago.
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 w-4/5 format-rich-text ml-auto">
                    <div className="flex w-full">
                      <div className="w-full">
                        <div className="ml-auto bg-white border rounded p-1">
                          <div className="px-4 py-2 bg-primary-color rounded-t text-white font-semibold capitalize">
                            Application complete
                          </div>
                          <div className="flex p-2 gap-2">
                            <div className="w-1/5 justify-center items-center text-center py-2">
                              {/* <img
                                alt="Company logo"
                                className="object-contain mx-auto"
                                src="https://rec-data.kalibrr.com/www.kalibrr.com/logos/FM38QE7KJHWN3FARYB2KZWWDS89YCVYQPLLL75AR-65a8fb51.png"
                              /> */}
                            </div>
                            <div className="k-w-4/5 text-start">
                              {/* <Link
                                to="/candidate/applications"
                                target="_blank"
                                className="w-full"
                              > */}
                                <button className="btn-outline border-primary-color text-primary-color w-full capitalize">
                                  Frontend Web Developer
                                </button>
                              {/* </Link> */}
                              <p>Jendela Group</p>
                            </div>
                          </div>
                          <div className="p-2">
                            <Link
                              to="/candidate/applications"
                              target="_blank"
                              className="w-full"
                            >
                              <button className="btn-outline border-2 p-1 text-primary-color w-full capitalize">
                                View application
                              </button>
                            </Link>
                          </div>
                          <div className="text-end">3 Months ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form action="" className="p-2">
                <div className="p-2 w-full h-[5rem] border-t">
                  <textarea
                    id="editor"
                    className="w-full h-full px-4 py-2 border-2 outline-none"
                  />
                </div>
                <div className="p-2 flex">
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
    </>
  );
};

MessageDetailComp.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MessageDetailComp;
