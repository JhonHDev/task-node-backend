import { Task } from '../models';
import { TaskPriority, TaskStatus } from '../models/task.model';

interface CreateTaskParams {
	userId: string;
	name: string;
	due_date: string;
	status: TaskStatus;
	priority: TaskPriority;
	image: string | null;
	description: string | null;
}
interface UpdateTaskParams {
	name?: string;
	due_date?: string;
	status?: TaskStatus;
	priority?: TaskPriority;
	image?: string;
	description?: string;
}

class TaskService {
	public async createNewTask(params: CreateTaskParams) {
		const dbTask = await Task.create({ ...params });
		await dbTask.save();

		return dbTask;
	}

	public async getAllTasks(userId: string) {
		return await Task.find({ userId });
	}

	public async getTaskById(userId: string, taskId: string) {
		return await Task.findOne({ _id: taskId, userId });
	}

	public async updateTaskById(userId: string, taskId: string, newTask: UpdateTaskParams) {
		return await Task.findOneAndUpdate({ _id: taskId, userId }, newTask, {
			new: true,
		});
	}

	public async deleteTaskById(userId: string, taskId: string) {
		return await Task.findOneAndDelete({ _id: taskId, userId });
	}
}

export default TaskService;
