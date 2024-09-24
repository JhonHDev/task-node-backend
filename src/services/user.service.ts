import generateToken from '../helpers/generateSessionToken';
import { User } from '../models';

class UserService {
	public async createNewUser(userId: string, email: string) {
		const user = await new User({ userId, email });
		await user.save();

		const token = await generateToken(userId);

		return { user, token };
	}
}

export default UserService;
