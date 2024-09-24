import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const validateTaskId = (req: Request, res: Response, next: NextFunction) => {
	const { taskId } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			return res.status(400).json({
				message: 'Identificador no válido',
			});
		}

		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

export default validateTaskId;
