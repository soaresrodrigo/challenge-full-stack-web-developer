import { z } from 'zod';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { Messages } from '../constants/messages';

const createUserSchema = z.object({
  email: z.string().email({ message: Messages.Validate.INVALID_EMAIL }),
  name: z.string().min(4, { message: Messages.Validate.LONG_NAME }),
});

const updateUserSchema = z.object({
  email: z.string().email({ message: Messages.Validate.INVALID_EMAIL }).optional(),
  name: z
    .string()
    .min(4, { message: Messages.Validate.LONG_NAME })
    .optional(),
}).refine(data => data.email || data.name, {
  message: Messages.Validate.REQUIRED_FIELD_UPDATE,
});

export const validateCreateUser = (data: CreateUserDTO) => {
  return createUserSchema.parse(data);
};

export const validateUpdateUser = (data: UpdateUserDTO) => {
  return updateUserSchema.parse(data);
};
