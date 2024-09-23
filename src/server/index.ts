import express, { Application } from 'express';
import http from 'http';

class Server {
	private app: Application;
	private port: string;

	private serverApp!: http.Server;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '3000';
	}

	public run(): void {
		this.serverApp = this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

export default Server;
