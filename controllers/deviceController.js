import { v4 as uuidV4 } from "uuid";

class DeviceController {
	async create(req, res) {
		const { name, price, rating } = req.body;
		const { img } = req.files;
		let fileName = uuidV4() + ".jpg";

		img.mv(path.resolve(__dirname, "...", "static", fileName));
	}

	async getAll(req, res) {}

	async getOne(req, res) {
		res.json({ message: "All working!" });
	}
}

export const deviceController = new DeviceController();
