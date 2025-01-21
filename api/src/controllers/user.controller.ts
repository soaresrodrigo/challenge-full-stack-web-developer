import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { validateCreateUser, validateUpdateUser } from '../utils/validate';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { Messages } from '../constants/messages';

const userService = new UserService();

interface HandlerResult<T = unknown> {
    status?: number;
    message?: string;
    data?: T;
}

export class UserController {
    static async handleRequest<T>(
        req: Request,
        res: Response,
        next: NextFunction,
        handler: (req: Request) => Promise<HandlerResult<T>>
    ): Promise<void> {
        try {
            const result = await handler(req);
            res.status(result?.status || 200).json(result?.data || result);
        } catch (error) {
            next(error);
        }
    }

    static createUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult> => {
            const data: CreateUserDTO = req.body;
            validateCreateUser(data);
            const user = await userService.createUser(data);
            return { status: 201, data: user };
        });
    }

    static getUsers(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (): Promise<HandlerResult> => {
            const users = await userService.getUsers();
            return { data: users };
        });
    }

    static getUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult> => {
            const user = await userService.getUser(req.params.uuid);
            return { data: user };
        });
    }

    static updateUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult> => {
            const data: UpdateUserDTO = req.body;
            validateUpdateUser(data);
            const user = await userService.updateUser(req.params.uuid, data);
            return { data: user };
        });
    }

    static deleteUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult<void>> => {
            await userService.deleteUser(req.params.uuid);
            return { message: Messages.User.DELETED, status: 200 };
        });
    }
}
