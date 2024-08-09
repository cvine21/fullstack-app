import express from "express";
import jwt from "jsonwebtoken";
import { dbInstance } from "./db.js";
import cors from "cors";
import { router } from "./routes/index.js";
import { errorHandlingMiddleware } from "./middleware/ErrorHandlingMiddleware.js";

const PORT = process.env.PORT || `3333`;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

// Обработка ошибок, последний middleware
app.use(errorHandlingMiddleware);

const start = async () => {
	try {
		await dbInstance.authenticate();
		await dbInstance.sync();

		app.listen(PORT, (err) => {
			if (err) {
				console.log(err);
			}

			console.log(`Server start on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
