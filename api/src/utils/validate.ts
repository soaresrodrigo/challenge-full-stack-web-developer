import { z } from "zod";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { Messages } from "../constants/messages";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

const createUserSchema = z.object({
  uuid: z
    .string({ required_error: "UUID is required" })
    .refine((uuid) => uuidValidate(uuid) && uuidVersion(uuid) === 4, {
      message: Messages.Validate.INVALID_UUID,
    }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: Messages.Validate.INVALID_EMAIL }),
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: Messages.Validate.LONG_NAME }),
});

const updateUserSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: Messages.Validate.INVALID_EMAIL })
      .optional(),
    name: z
      .string({ required_error: "Name is required" })
      .min(4, { message: Messages.Validate.LONG_NAME })
      .optional(),
  })
  .refine((data) => data.email || data.name, {
    message: Messages.Validate.REQUIRED_FIELD_UPDATE,
  });

export const validateCreateUser = (data: CreateUserDTO) => {
  try {
    return createUserSchema.parse(data);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return e.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));
    }
    throw e;
  }
};

export const validateUpdateUser = (data: UpdateUserDTO) => {
  try {
    return updateUserSchema.parse(data);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return e.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));
    }
    throw e;
  }
};
