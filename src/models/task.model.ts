import { Schema, model } from 'mongoose';

export enum TaskPriority {
	High = 'Alta',
	Medium = 'Media',
	Low = 'Baja',
}

export enum TaskStatus {
	Completed = 'Completada',
	InProgress = 'En progreso',
	ToDo = 'Por hacer',
}

const taskSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},

		due_date: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(TaskStatus),
			required: true,
		},
		priority: {
			type: String,
			enum: Object.values(TaskPriority),
			required: true,
		},
		image: {
			type: String,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

taskSchema.methods.toJSON = function () {
	const taskObj = this.toObject();
	const { _id, ...rest } = taskObj;

	return {
		id: _id,
		...rest,
	};
};

export default model('Task', taskSchema);
