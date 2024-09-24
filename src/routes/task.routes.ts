import { Router } from 'express';
import { check } from 'express-validator';

import { TaskPriority, TaskStatus } from '../models/task.model';
import { validateFields, validateTaskExists, validateTaskId, validateToken } from '../middlewares';

import {
	createNewTask,
	deleteTaskById,
	getAllTasks,
	getTaskById,
	updateTaskById,
} from '../controllers/task.controllers';

const router = Router();

router.get('/', [validateToken], getAllTasks);

router.get('/:taskId', [validateToken, validateTaskId, validateTaskExists], getTaskById);

router.post(
	'/',
	[
		validateToken,
		check('name', 'El nombre de la tarea es requerido').not().isEmpty(),
		check('due_date', 'La fecha de finalización de la tarea es requerida').not().isEmpty(),
		check('priority', 'La prioridad de la tarea es requerida').not().isEmpty(),
		check('priority', 'La prioridad de la tarea es requerida')
			.isIn(Object.values(TaskPriority))
			.withMessage(`La prioridad debe ser una de las siguientes: ${Object.values(TaskPriority).join(', ')}`),
		check('status', 'El estado de la tarea es requerido').not().isEmpty(),
		check('status', 'El estado de la tarea es requerido')
			.isIn(Object.values(TaskStatus))
			.withMessage(`El estado debe ser uno de las siguientes: ${Object.values(TaskStatus).join(', ')}`),

		validateFields,
	],
	createNewTask
);

router.put(
	'/:taskId',
	[
		validateToken,
		validateTaskId,
		validateTaskExists,
		check('name', 'El nombre de la tarea es requerido').optional().not().isEmpty(),
		check('description', 'La descrición de la tarea es requerida').optional().not().isEmpty(),
		check('image', 'La imagen de la tarea es requerida').optional().not().isEmpty(),
		check('due_date', 'La fecha de finalización de la tarea es requerida').optional().not().isEmpty(),
		check('priority', 'La prioridad de la tarea es requerida').optional().not().isEmpty(),
		check('priority', 'La prioridad de la tarea es requerida')
			.optional()
			.isIn(Object.values(TaskPriority))
			.withMessage(`La prioridad debe ser una de las siguientes: ${Object.values(TaskPriority).join(', ')}`),
		check('status', 'El estado de la tarea es requerido').optional().not().isEmpty(),
		check('status', 'El estado de la tarea es requerido')
			.optional()
			.isIn(Object.values(TaskStatus))
			.withMessage(`El estado debe ser uno de las siguientes: ${Object.values(TaskStatus).join(', ')}`),
		validateFields,
	],
	updateTaskById
);

router.delete('/:taskId', [validateToken, validateTaskId, validateTaskExists], deleteTaskById);

export default router;
