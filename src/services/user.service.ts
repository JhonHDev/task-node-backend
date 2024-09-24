import { User } from '../models';

class UserService {
	async createNewUser(userId: string) {
		const user = await new User({ userId });
		await user.save();

		return user;
	}
}

export default UserService;
