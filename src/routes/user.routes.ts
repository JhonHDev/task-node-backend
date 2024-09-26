import { Router } from 'express';
import { check, query } from 'express-validator';

import { validateFields, validateUserExists } from '../middlewares';
import { createNewUser, getUserSessionByUserId } from '../controllers/user.controller';

const router = Router();

router.get(
	'/:userId',
	[
		validateUserExists,
		check('userId', 'El userId es requerido').not().isEmpty(),
		query('email', 'El correo electrónico es requerido').not().isEmpty(),
		query('email', 'El correo electrónico no es válido').isEmail(),
		validateFields,
	],
	getUserSessionByUserId
);

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
