import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { dbInstance } from "./db.js";
import { router } from "./routes/index.js";
import { errorHandlingMiddleware } from "./middleware/ErrorHandlingMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || `3333`;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
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
