import { Request, Response, NextFunction } from 'express';
import { Task } from '../../models';

const validateTaskExists = async (req: Request, res: Response, next: NextFunction) => {
	const { taskId } = req.params;
	const { userId } = req;

	try {
		const dbTask = await Task.findOne({ _id: taskId, userId });

		if (!dbTask) {
			return res.status(404).json({
				message: 'No existe una tarea con ese identificador',
			});
		}

		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

export default validateTaskExists;
