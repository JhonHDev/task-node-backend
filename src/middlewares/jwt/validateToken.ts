import { Request, Response, NextFunction } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
	userId: string;
}
const validateToken = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers['authorization'];

	try {
		if (!authorization || !authorization.startsWith('Bearer ')) {
			return res.status(401).json({
				message: 'Debe registrarse o iniciar sesión',
			});
		}

		const authorizationArr = authorization.split(' ');
		const [bearer, token] = authorizationArr;

		if (authorizationArr.length > 2 || authorizationArr.length < 2 || !bearer || !token) {
			return res.status(401).json({
				message: 'Token de sesión no válido',
			});
		}

		const secret = process.env.JWT_SECRET as string;
		const jwtRes = jwt.verify(token, secret) as CustomJwtPayload;

		req.userId = jwtRes.userId;

		next();
	} catch (error) {
		res.status(400).json({ error });
	}
};

export default validateToken;
