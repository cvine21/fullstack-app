import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		const token = req.headers.authorization.split(" ")[1]; // Bearer ${token}

		if (!token) {
			return res.status(401).json({ message: "Не авторизован" });
		}

		req.user = jwt.verify(token, process.env.SECRET_KEY);

		next();
	} catch {
		res.status(401).json({ message: "Не авторизован" });
	}
};
