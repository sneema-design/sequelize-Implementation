const { z } = require("zod");

const createUserSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name should be of atleast 2 character")
    .max(50),
  lastName: z
    .string()
    .min(2, "last name should be of atlest 2  character")
    .max(50),
  email: z.string().trim().email("Please enter correct email format"),
  age:z.coerce.number()
    .int()
    .min(13, "Minimum age is 13")
    .max(100)
    .optional(),
  password: z
    .string()
    .min(8, "password should be atleast of 8 characters")
    .max(16, "password can be of max 16 character"),
  bio:z
  .string()
  .min(2,"Bio should be greater than 2 character")
  .max(100,"Bio can't be greater than 100 character")
});

const loginSchema=z.object({
    email:z.string().email("Please enter correct email formate"),
    password:z.string().min(8,"password should be minimun 8 characters").max(16,"password can be max 16 characters")
})

const updateUserSchema=z.object({
      firstName: z
    .string()
    .min(2, "First name should be of atleast 2 character")
    .max(50).optional(),
  lastName: z
    .string()
    .min(2, "last name should be of atlest 2  character")
    .max(50).optional(),
  email: z.string().trim().email("Please enter correct email format").optional(),
  age:z.coerce.number()
    .int()
    .min(13, "Minimum age is 13")
    .max(100)
    .optional(),
  password: z
    .string()
    .min(8, "password should be atleast of 8 characters")
    .max(16, "password can be of max 16 character").optional(),
  bio:z
  .string()
  .min(2,"Bio should be greater than 2 character")
  .max(100,"Bio can't be greater than 100 character").optional()
})
module.exports={
    createUserSchema,
    loginSchema,
    updateUserSchema
}