import React from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaLinkedin, FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6'
import { IoNotificationsCircle } from 'react-icons/io5'

const Footer = () => {
  const footerLinks = [
    { label: 'Footerlink 1', href: '#' },
    { label: 'Footerlink 2', href: '#' },
    { label: 'Footerlink 3', href: '#' },
  ]

  const socialLinks = [
    { icon: FaSquareInstagram, href: 'https://instagram.com' },
    { icon: FaFacebookSquare, href: 'https://facebook.com' },
    { icon: FaLinkedin, href: 'https://linkedin.com' },
    { icon: FaSquareXTwitter, href: 'https://x.com' },
  ]

  return (
    <>
      <div className="w-full mx-auto mt-[12rem] relative background-footer">
        <svg
          className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-footer-custom"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            fill="currentColor"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          />
        </svg>
        <div className="px-5 pb-12 mt-5 rounded-t-3xl md:rounded-none">
          <div className="flex flex-col">
            <div className="text-3xl leading-10 text-blue-800 w-full text-center font-bold">
              Sign up to our newsletter to receive updates
            </div>
            <div className="text-base text-gray-500 w-full md:w-2/4 self-center text-center lg:pt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="flex flex-row justify-center space-x-1 py-4">
            <input className="bg-white rounded-lg text-sm px-2 sm:px-3 md:px-8 py-3" type="text" placeholder="email@email.com" />
            <button className="font-bold rounded-lg text-white bg-blue-700 hover:bg-blue-600 cursor-pointer px-3 py-1 md:px-6 md:py-3 focus:outline-none">
              <span className="hidden sm:block">subscribe</span>
              <IoNotificationsCircle className="block sm:hidden h-7 w-7" />
            </button>
          </div>
          <div className="font-bold text-blue-700 content-center">
            <ul className="flex flex-row space-x-6 py-4 justify-center">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:underline cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-row space-x-4 justify-center items-center">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank" rel="nofollow" className="stroke-current fill-current text-blue-700 w-7 h-7 hover:opacity-50 duration-300 ease-in-out">
                  <link.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer
