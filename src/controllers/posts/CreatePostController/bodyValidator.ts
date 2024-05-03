import { postSchema } from "@/schemas/postSchema";

export const bodyValidator = async (body: unknown) => {
  const validatedBody = await postSchema.validate(body, { abortEarly: false });

  return validatedBody;
};
