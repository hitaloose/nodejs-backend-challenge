import * as yup from "yup";

export const queryValidator = async (body: unknown) => {
  const schema = yup.object({
    page: yup.number().min(1).required(),
  });

  const validatedQuery = await schema.validate(body, { abortEarly: false });

  return validatedQuery;
};
