import { z } from 'zod';

const passwordValidation = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  if (errors.length > 0) {
    return errors.join(', ');
  }
  
  return true;
};

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(4, {
      message: 'Username must be at least 4 characters',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .refine(passwordValidation, {
      message: (context) => context.customMessage,
    }),
});

export const loginSchema = z.object({
    usernameOrEmail: z
        .string({
            required_error: 'Username or Email is required'
        })
        .string({
            required_error: 'Password is required'
        }),
});