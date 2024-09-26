import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';

const validateUserExists = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;
	const { email } = req.query;

	try {
		const dbUser = await User.findOne({ userId, email });

		if (!dbUser) {
			return res.status(404).json({
				message: 'Error en credenciales de acceso',
			});
		}

		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

export default validateUserExists;
