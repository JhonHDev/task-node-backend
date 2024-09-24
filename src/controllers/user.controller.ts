import { Request, Response } from 'express';

import UserService from '../services/user.service';

export const createNewUser = async (req: Request, res: Response) => {
	const { userId } = req.body;

	const userService = new UserService();

	const userDb = await userService.createNewUser(userId);

	res.json({
		user: userDb,
		ok: true,
	});
};
