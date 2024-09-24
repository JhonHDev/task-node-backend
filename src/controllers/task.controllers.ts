import { Request, Response } from 'express';

import TaskService from '../services/task.service';

const taskService = new TaskService();

export const getAllTasks = async (req: Request, res: Response) => {
	const { userId } = req;

	try {
		const tasks = await taskService.getAllTasks(userId as string);

		res.status(200).json({
			tasks,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const getTaskById = async (req: Request, res: Response) => {
	const { userId } = req;
	const { taskId } = req.params;

	try {
		const task = await taskService.getTaskById(userId as string, taskId);

		res.status(200).json({
			task,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const createNewTask = async (req: Request, res: Response) => {
	const { userId } = req;
	const { name, description, due_date, status, priority, image } = req.body;

	try {
		const newTask = await taskService.createNewTask({
			name,
			description,
			due_date,
			status,
			priority,
			image,
			userId: userId as string,
		});

		res.status(201).json({
			newTask,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const updateTaskById = async (req: Request, res: Response) => {
	const { userId } = req;
	const { taskId } = req.params;
	const { name, description, due_date, status, priority, image } = req.body;

	try {
		const updatedTask = await taskService.updateTaskById(userId as string, taskId, {
			name,
			description,
			due_date,
			status,
			priority,
			image,
		});

		res.status(200).json({
			updatedTask,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const deleteTaskById = async (req: Request, res: Response) => {
	const { userId } = req;
	const { taskId } = req.params;

	try {
		const deletedTask = await taskService.deleteTaskById(userId as string, taskId);

		res.status(200).json({
			deletedTask,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};
