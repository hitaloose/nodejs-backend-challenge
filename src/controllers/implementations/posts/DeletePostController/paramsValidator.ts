import * as yup from "yup";

export const paramsValidator = async (params: unknown) => {
  const schema = yup.object({
    postId: yup.string().uuid().required(),
  });

  const validatedParams = await schema.validate(params, { abortEarly: false });

  return validatedParams;
};
