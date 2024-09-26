import generateToken from '../helpers/generateSessionToken';
import { User } from '../models';

class UserService {
	public async createNewUser(userId: string, email: string) {
		const user = await new User({ userId, email });
		await user.save();

		const token = await generateToken(userId);

		return { user, token };
	}

	public async getUserById(userId: string, email: string) {
		const user = await User.findOne({ userId, email });

		if (!user) {
			throw new Error('Credenciales de acceso no válidas');
		}

		const token = await generateToken(user.userId);

		return { user, token };
	}
}

export default UserService;
