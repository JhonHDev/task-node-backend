import dotenv from 'dotenv';
import Server from './server';

dotenv.config();

export const server = new Server();

server.run();
