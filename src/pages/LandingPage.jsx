import React from 'react'
import teacher from '../assets/Teacher1.png'
import student from '../assets/student1.png'
import HeaderLandingPage from '../component/landing-page/HeaderLandingPage'
import FeatureLandingPage from '../component/landing-page/FeatureLandingPage'
import FooterLandingPage from '../component/landing-page/FooterLandingPage'

const LandingPage = () => {
  return (
    <>
      <div>
        <HeaderLandingPage />

        <section id='teacher-section'>  
            <div className="relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
            <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
              <div className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left">
                <h1 className="relative mb-4 text-3xl font-black leading-tight text-purple-900 sm:text-6xl xl:mb-8">
                  Best Platform For You To Teach
                </h1>
                <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10 ml-80">
                  <div className="mr-40 container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
                        <img src={teacher}
                            className="w-full h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full lg:-ml-12" />
                  </div>
                </div>
                <p className="pr-0 mb-8 text-base text-purple-600 sm:text-lg xl:text-xl lg:pr-20">
                  Whether you’re an experienced teacher or just starting your journey, TutorIn empowers you to find your dream students and make a lasting impact. So, sign up, create your profile, and embark on an exciting teaching adventure!
                </p>
                <a
                  href="/auth/register/tutor"
                  className="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-base font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0 hover:bg-indigo-500"
                >
                  Become a Teacher!
                </a>
                <div className="flex-col hidden mt-12 sm:flex lg:mt-24">
                  <p className="mb-4 text-sm font-medium tracking-widest text-gray-500 uppercase">Integrates With</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-10" />
        
        <section id='student-section'>  
          <div className="relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
            <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0 ml-96">
              <div className=" relative z-50 flex flex-col items-end w-full justify-center max-w-xl pt-48 text-center lg:items-end lg:pt-20 xl:pt-40 lg:text-right lg:pr-20 ml-96">
                <h1 className="relative mb-4 text-3xl font-black leading-tight text-purple-900 sm:text-6xl xl:mb-8">
                  Best Education From Teacher You Can Choice
                </h1>
                <p className="pr-0 mb-8 text-base text-purple-600 sm:text-lg xl:text-xl">
                  TutorIn is more than just an online tutoring platform; it’s a pathway to achieving your academic goals. Whether you’re aiming for better grades, deeper understanding, or specialized guidance, TutorIn connects you with your dream tutor.
                </p>
                <a 
                  href='/auth/register/student'
                  className="w-auto px-8 py-4 font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 lg:mx-0 hover:bg-indigo-500"
                >
                  Become a Student!
                </a>

                <div className="flex-col hidden mt-12 sm:flex lg:mt-24">
                  <p className="mb-4 text-sm font-medium tracking-widest text-gray-500 uppercase">Integrates With</p>
                </div>
              </div>
              <div className="z-30 hidden  lg:flex flex-col items-end justify-center w-full h-full lg:w-1/2 lg:pl-10">
                <div className="mr-72 container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen ml-0">
                  <img
                    src={student}
                    className="w-3/5 h-full mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full"
                    alt="Student"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className='mb-20' />
        <FeatureLandingPage />
        <FooterLandingPage />
      </div>
    </>
  )
}

export default LandingPage