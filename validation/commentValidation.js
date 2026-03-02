const { z } = require("zod");

const createCommentSchema = z.object({
  message: z.string().min(2, "Message should be of min 2 character"),
  userId: z.coerce.number().int().positive(),
  postId: z.coerce.number().int().positive(),
  parentId: z.coerce.number().int().positive().nullable().optional(),
});


module.exports={
    createCommentSchema
}