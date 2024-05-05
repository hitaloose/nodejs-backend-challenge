import * as yup from "yup";

export const bodyValidator = async (body: unknown) => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const validatedBody = await schema.validate(body, { abortEarly: false });

  return validatedBody;
};
