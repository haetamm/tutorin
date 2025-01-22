import { MdEmail } from "react-icons/md";
import { FaUser, FaUserCircle } from "react-icons/fa";

export const registerFields = [
  { name: "name", type: "text", placeholder: "Name", icon: FaUser },
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    icon: FaUserCircle,
  },
  { name: "email", type: "email", placeholder: "Email", icon: MdEmail },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: null,
    isPasswordInput: true,
  },
  {
    name: "passwordConfirmation",
    type: "password",
    placeholder: "Password Confirmation",
    icon: null,
    isPasswordInput: true,
  },
];

export const loginFields = [
  {
    name: "username",
    type: "username",
    placeholder: "Username",
    icon: FaUserCircle,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: null,
    isPasswordInput: true,
  },
];

export const forgotPasswordFields = [
  { name: "email", type: "email", placeholder: "Email", icon: MdEmail },
];

export const resetPasswordFields = [
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: null,
    isPasswordInput: true,
  },
  {
    name: "passwordConfirmation",
    type: "password",
    placeholder: "Password Confirmation",
    icon: null,
    isPasswordInput: true,
  },
];

export const fieldsSecurityProfilePage = [
  {
    name: "newPassword",
    type: "password",
    placeholder: "New Password",
    icon: null,
    isPasswordInput: true,
  },
  {
    name: "newPasswordConfirmation",
    type: "password",
    placeholder: "New Password Confirmation",
    icon: null,
    isPasswordInput: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: null,
    isPasswordInput: true,
  },
];

export const createJobFieldsPart1 = [
  { name: "title", label: "Job Title" },
  { name: "subject", label: "Subject" },
  { name: "education", label: "Education" },
  { name: "address", label: "Address" },
];

export const createJobFieldsPart2 = [
  { name: "city", label: "City" },
  { name: "country", label: "Country" },
];

export const createJobFieldsPart3 = [
  { name: "gender", label: "Gender" },
  { name: "deadline", label: "Deadline" },
];

export const createJobFieldsPart4 = [
  { name: "currency", label: "Currency" },
  { name: "amount", label: "Amount" },
  { name: "frequency", label: "Frequency" },
];
