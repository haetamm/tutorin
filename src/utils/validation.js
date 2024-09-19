import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().trim().min(1, 'Password is required'),
})

export const registerFormWithGoogleSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  role: z.string().min(1, 'role is required')
})

export const forgotPasswordFormSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
})

export const resetPasswordFormSchema = z.object({
  password: z.string().trim().min(4, 'Minimum 4 characters').max(8, 'Maximum 8 characters').regex(/^[a-zA-Z0-9]+$/, "Password must contain only alphanumeric characters"),
  passwordConfirmation: z.string().trim().min(4, 'Minimum 4 characters').max(8, 'Maximum 8 characters'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ['passwordConfirmation'],
})

export const registerFormSchema = z.object({
  name: z.string().trim().min(4, 'Minimum 4 characters').max(23, 'Maximu, 23 characters').regex(/^[a-zA-Z ]+$/, "Name must contain only alphabet characters and spaces"),
  username: z.string().trim().min(3,'Minimum 3 characters').max(8, 'Maximum 8 characters').regex(/^[a-zA-Z0-9]+$/, "Username must contain only alphanumeric characters"),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().trim().min(4, 'Minimum 4 characters').max(8, 'Maximum 8 characters').regex(/^[a-zA-Z0-9]+$/, "Password must contain only alphanumeric characters"),
  passwordConfirmation: z.string().trim().min(4, 'Minimum 4 characters').max(8, 'Maximum 8 characters'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ['passwordConfirmation'],
})

export const profileFormSchema = z.object({
  name: z.string().trim().min(4, 'Minimum 4 characters').max(23, 'Maximu, 23 characters').regex(/^[a-zA-Z ]+$/, "Name must contain only alphabet characters and spaces"),
  username: z.string().trim().min(3,'Minimum 3 characters').max(8, 'Maximum 8 characters').regex(/^[a-zA-Z0-9]+$/, "Username must contain only alphanumeric characters"),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
  phone: z.string().trim().min(8,'Minimum 8 characters').max(15, 'Maximum 15 characters'),
  address: z.string().trim().min(1, 'Address is required').max(100, 'Maximum 100 characters'),
  city: z.string().trim().min(1, 'City is required').max(50, 'Maximum 50 characters'),
  country: z.string().trim().min(1, 'Country is required').max(50, 'Maximum 50 characters'),
  postcode: z.string().trim().min(1, 'Postcode is required').max(6, 'Maximum 6 characters'),
  resume: z.custom((value) => {
    if (!value || !(value instanceof File)) {
      return false
    }
    const allowedMimeType = 'application/pdf'
    if (value.type !== allowedMimeType) {
      return false
    }
    
    const maxSizeInBytes = 5 * 1024 * 1024
    if (value.size > maxSizeInBytes) {
      return false
    }
    return true
  }, {
    message: 'Please upload a valid PDF file with a maximum size of 5MB',
  })
})

export const securityFormSchema = z.object({
  password: z.string().trim().min(1, 'Password is required'),
  newPassword: z.string().trim().min(4, 'Minimum 4 characters').max(8, 'Maximum 8 characters').regex(/^[a-zA-Z0-9]+$/, "Password must contain only alphanumeric characters"),
  newPasswordConfirmation: z.string().trim().min(4, 'Minimum 4 characters').max(8, 'Maximum 8 characters'),
}).refine((data) => data.newPassword === data.newPasswordConfirmation, {
  message: "Passwords don't match",
  path: ['newPasswordConfirmation'],
})

const today = new Date()
today.setHours(0, 0, 0, 0)

export const createJobFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100, 'Maximum 100 characters'),
  subject: z.string().trim().min(1, 'Subject is required'),
  education: z.string().trim().min(1, 'Education is required').max(50, 'Maximum 50 characters'),
  address: z.string().trim().min(1, 'Address is required').max(100, 'Maximum 100 characters'),
  city: z.string().trim().min(1, 'City is required'),
  country: z.string().trim().min(1, 'Country is required'),
  deadline: z.string().refine(dateString => {
    const selectedDate = new Date(dateString)
    return selectedDate > today
  }, {
      message: 'Deadline must be a future date',
  }),
  gender: z.string().trim().min(1, 'Gender is required'),
  salary: z.string().optional(),
  currency: z.string().trim().min(1, 'Currency is required'),
  amount: z.preprocess((value) => parseFloat(value), z.number().min(1, 'price is required').max(1000000000, 'Max 1000000000')),
  frequency: z.string().trim().min(1, 'Frequency is required'),
  description: z.string().trim().min(1, 'Description is required').max(1000, 'Maximum 1000 characters')
})