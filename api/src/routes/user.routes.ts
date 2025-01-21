import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:uuid', UserController.getUser);
router.put('/:uuid', UserController.updateUser);
router.delete('/:uuid', UserController.deleteUser);

export default router;
