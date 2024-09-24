import jwt from 'jsonwebtoken';

const generateToken = (userId: string) => {
	return new Promise((resolve, reject) => {
		const payload = { userId };
		const secret = process.env.JWT_SECRET as string;
		const expiresIn = '1h';

		jwt.sign(payload, secret, { expiresIn }, (err, token) => {
			if (err) {
				reject(err);
			}

			resolve(token);
		});
	});
};

export default generateToken;
