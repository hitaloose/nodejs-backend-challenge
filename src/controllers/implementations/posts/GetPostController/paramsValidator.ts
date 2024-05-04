import * as yup from "yup";

export const paramsValidator = async (body: unknown) => {
  const schema = yup.object({
    postId: yup.string().uuid().required(),
  });

  const validatedParams = await schema.validate(body, { abortEarly: false });

  return validatedParams;
};
