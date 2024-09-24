import { Request, Response } from 'express';

import UserService from '../services/user.service';

export const createNewUser = async (req: Request, res: Response) => {
	try {
		const { userId, email } = req.body;

		const userService = new UserService();

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
