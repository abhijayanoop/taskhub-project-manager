import z from "zod";

// const registerSchema = z.object({
//   name: z.string().min(3, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 6 characters"),
// });
const registerSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const workspaceSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 characters"),
  color: z.string().min(3, "Color should be atleast 3 characters"),
  description: z.string().optional(),
});

export {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resetPasswordSchema,
  emailSchema,
  workspaceSchema,
};
