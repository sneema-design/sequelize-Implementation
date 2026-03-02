const { z } = require("zod");

const createPostValidation = z.object({
  title: z
    .string()
    .min(2, "Title should be minimun 2 character")
    .max(100, "Title can be max 100 character"),
  caption: z.string().min(2, "Caption should be minimun 2 character"),
  userId: z.coerce.number(),
});
const updatePostValidation = z.object({
  title: z
    .string()
    .min(2, "Title should be minimun 2 character")
    .max(100, "Title can be max 100 character")
    .optional(),
  caption: z
    .string()
    .min(2, "Caption should be minimun 2 character")
    .optional(),
  userId: z.coerce.number().optional(),
});
module.exports = {
  createPostValidation,
  updatePostValidation,
};
