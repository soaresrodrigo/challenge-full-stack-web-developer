import { PrismaClient, User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { Messages } from '../constants/messages';

const prisma = new PrismaClient();

export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    const userRegistered = await this.isEmailAlreadyRegistered(data.email);

    if (data.email && userRegistered) {
      throw new Error(Messages.User.EMAIL_ALREADY_EXISTS);
    }

    return prisma.user.create({
      data,
    });
  }

  async getUsers(): Promise<User[]> {
    return prisma.user.findMany();
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
