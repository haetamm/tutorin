import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { roles, urlPage } from "./constans";
import { PiBagFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { IoFolderOpen, IoLogOutSharp } from "react-icons/io5";

export const footerLinks = [
  { label: "Services", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

export const socialLinks = [
  { icon: FaSquareInstagram, href: "https://instagram.com" },
  { icon: FaFacebookSquare, href: "https://facebook.com" },
  { icon: FaLinkedin, href: "https://linkedin.com" },
  { icon: FaSquareXTwitter, href: "https://x.com" },
];

export const navbarLinks = [
  { path: urlPage.LOGIN, label: "Sign", extraClass: "" },
  {
    path: urlPage.REGISTER_STUDENT,
    label: "STUDENT",
    extraClass: "hidden md:block border-2 border-black py-1 rounded-md",
  },
  {
    path: urlPage.REGISTER_TUTOR,
    label: "TEACHER",
    extraClass: "hidden md:block border-2 border-black py-1 rounded-md",
  },
];

export const navbarStaticLinks = [
  { label: "Home", extraClass: "cursor-pointer" },
  { label: "Services", extraClass: "cursor-pointer" },
  { label: "Blog", extraClass: "cursor-pointer" },
  { label: "Contact us", extraClass: "cursor-pointer" },
];

export const sidebarLinks = [
  { path: urlPage.REGISTER_STUDENT, label: "Student" },
  { path: urlPage.REGISTER_TUTOR, label: "Teacher" },
  { path: "#", label: "Services" },
  { path: "#", label: "Blog" },
  { path: "#", label: "Contact Us" },
];

export const tabsProfilePage = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Security" },
];

export const getSidebarLinks = (role) => {
  return [
    {
      to: role === roles.STUDENT ? urlPage.STUDENT_CREATE_JOB : urlPage.HOME,
      label: role === roles.STUDENT ? "Request Tutor" : "Request",
      icon: <PiBagFill className="h-6 w-6" />,
    },
    {
      to:
        role === roles.STUDENT
          ? urlPage.STUDENT_PROFILE
          : urlPage.TUTOR_PROFILE,
      label: "Profile",
      icon: <FiUser className="h-6 w-6" />,
    },
    {
      to:
        role === roles.STUDENT
          ? urlPage.STUDENT_NOTIFICATION
          : urlPage.TUTOR_NOTIFICATION,
      label: "Notifications",
      icon: <IoMdNotifications className="h-6 w-6" />,
    },
    ...(role === roles.TUTOR
      ? [
          {
            to: urlPage.TUTOR_APPLICATIONS,
            label: "Applications",
            icon: <IoFolderOpen className="h-6 w-6" />,
          },
        ]
      : []),
    {
      to: "#",
      label: "Logout",
      icon: <IoLogOutSharp className="h-7 w-7" />,
    },
  ];
};
