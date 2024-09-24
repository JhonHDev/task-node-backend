import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares';
import { createNewUser } from '../controllers/user.controller';

const router = Router();

router.post(
	'/',
	[
		check('userId', 'El userId es requerido').not().isEmpty(),
		check('email', 'El correo electrónico es requerido').not().isEmpty(),
		validateFields,
	],
	createNewUser
);

export default router;
