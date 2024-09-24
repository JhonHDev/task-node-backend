import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';

import connectToDB from '../db';
import userRoutes from '../routes/user.routes';
import taskRoutes from '../routes/task.routes';

class Server {
	private app: Application;
	private port: string;

	private serverApp!: http.Server;

	private apiBase = '/api/v1';

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '3000';

		this.setMiddlewares();
		this.setRoutes();

		connectToDB();
	}

	private setMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
	}

	private setRoutes(): void {
		this.app.use(`${this.apiBase}/users`, userRoutes);
		this.app.use(`${this.apiBase}/tasks`, taskRoutes);
	}

	public run(): void {
		this.serverApp = this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

export default Server;
