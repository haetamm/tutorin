import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().trim().min(1, 'Password is required'),
})

export const registerFormSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(12, 'Maximum 12 characters'),
    email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().trim().min(4, 'Minimum 4 characters').max(8, 'Maximum 4 characters'),
})

export const createJobFormSchema = z.object({
    title: z.string().trim().min(1, 'Title is required').max(30, 'Maximum 30 characters'),
    subject: z.string().trim().min(1, 'Subject is required'),
    education: z.string().trim().min(1, 'Education is required'),
    address: z.string().trim().min(1, 'Address is required').max(100, 'Maximum 100 characters'),
    city: z.string().trim().min(1, 'City is required'),
    country: z.string().trim().min(1, 'Country is required'),
    deadline: z.string().min(1, 'Deadline is required'),
    gender: z.string().trim().min(1, 'Gender is required'),
    salary: z.string().optional(),
    currency: z.string().trim().min(1, 'Currency is required'),
    amount: z.preprocess((value) => parseFloat(value), z.number().min(1, 'price is required')),
    frequency: z.string().trim().min(1, 'Frequency is required'),
    description: z.string().trim().min(1, 'Description is required').max(1000, 'Maximum 1000 characters')
})

export const createFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(40, 'Maximum 40 characters'),
  surname: z.string().trim().min(1, 'Surname is required').max(20, 'Maximum 20 characters'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
  address: z.string().trim().min(1, 'Address is required').max(100, 'Maximum 100 characters'),
  city: z.string().trim().min(1, 'City is required'),
  country: z.string().trim().min(1, 'Country is required'),
  postcode: z.string().trim().min(1, 'Postcode is required').max(6, 'Maximum 6 characters'),
  resume: z.custom((value) => {
    if (!value || !(value instanceof File)) {
      return false;
    }
    // Check for PDF MIME type
    const allowedMimeType = 'application/pdf';
    if (value.type !== allowedMimeType) {
      return false;
    }
    // Optional: Check file size (example: max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (value.size > maxSizeInBytes) {
      return false;
    }
    return true;
  }, {
    message: 'Please upload a valid PDF file with a maximum size of 5MB',
  })
});
