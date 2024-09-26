import { Request, Response } from 'express';

import UserService from '../services/user.service';

const userService = new UserService();

export const createNewUser = async (req: Request, res: Response) => {
	const { userId, email } = req.body;

	try {
		const { user, token } = await userService.createNewUser(userId, email);

		res.status(201).json({
			user,
			token,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const getUserSessionByUserId = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { email } = req.query;

	try {
		const { user, token } = await userService.getUserById(userId, email as string);

		res.status(200).json({
			user,
			token,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};
