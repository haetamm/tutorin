import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().trim().min(1, 'Password is required'),
});

export const registerFormSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(12, 'maximal 12 character'),
    email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().trim().min(4, 'minimal 4 character').max(8, 'maximal 4 character'),
});
