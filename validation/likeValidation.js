const { z } = require("zod");

const createLikeSchema=z.object({
    userId: z.coerce.number().int().positive(),
    postId:  z.coerce.number().int().positive(),
})
module.exports={
    createLikeSchema
}