import { PrismaClient, User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { Messages } from '../constants/messages';
import { validateCreateUser, validateUpdateUser } from '../utils/validate';

const prisma = new PrismaClient();

export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    validateCreateUser(data);
    const userRegistered = await this.isEmailAlreadyRegistered(data.email);

    if (data.email && userRegistered) {
      throw new Error(Messages.User.EMAIL_ALREADY_EXISTS);
    }

    return prisma.user.create({
      data,
    });
  }

  async getUsers(
		currentPage: number,
		perPage: number
	): Promise<{ users: User[], total: number, currentPage: number, perPage: number, totalPages: number }> {
		const skip = (currentPage - 1) * perPage;
		const [users, total] = await Promise.all([
			prisma.user.findMany({
				skip,
				take: perPage,
				orderBy: [
					{ updatedAt: 'desc' },
					{ createdAt: 'desc' },
				],
			}),
			prisma.user.count(),
		]);
		const totalPages = Math.ceil(total / perPage);
		return { users, total, currentPage, perPage, totalPages };
	}

  async getUser(uuid: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) {
      throw new Error(Messages.User.NOT_FOUND);
    }

    return user;
  }

  async updateUser(uuid: string, data: UpdateUserDTO): Promise<User> {
    validateUpdateUser(data);
    const user = await this.getUser(uuid);

    if (!user) {
      throw new Error(Messages.User.NOT_FOUND);
    }

    if (data.email && (user.email !== data.email)) {
      const userRegistered = await this.isEmailAlreadyRegistered(data.email);

      if (userRegistered) {
        throw new Error(Messages.User.EMAIL_ALREADY_EXISTS);
      }
    }

    return prisma.user.update({
      where: { uuid },
      data,
    });
  }

  async deleteUser(uuid: string): Promise<User> {
    const user = await this.getUser(uuid);

    if (!user) {
      throw new Error(Messages.User.NOT_FOUND);
    }

    await prisma.user.delete({
      where: { uuid },
    });

    return user;
  }

  private async isEmailAlreadyRegistered(email: string): Promise<boolean> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    return !!existingUser;
  }
}
