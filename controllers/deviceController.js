import { v4 as uuidV4 } from "uuid";
import path from "path";

import { Device, DeviceInfo } from "../models/models.js";
import { ApiError } from "../error/ApiError.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class DeviceController {
	async create(req, res, next) {
		try {
			const { name, price, brandId, typeId, info } = req.body;
			const { img } = req.files;
			const imgFileName = uuidV4() + ".jpg";

			img.mv(path.resolve(__dirname, "..", "static", imgFileName));

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: imgFileName,
			});

			if (info) {
				info = JSON.parse(info);
				info.forEach((item) => {
					DeviceInfo.create({
						title: item.title,
						desctiption: item.desctiption,
						deviceId: item.deviceId,
					});
				});
			}

			return res.json(device);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		const { typeId, brandId, limit = 9, page = 1 } = req.query;
		const offset = (page - 1) * limit;
		const findOptions = { limit, offset };

		if (brandId && !typeId) {
			findOptions.where = { brandId };
		}
		if (!brandId && typeId) {
			findOptions.where = { typeId };
		}
		if (brandId && typeId) {
			findOptions.where = { brandId, typeId };
		}

		const devices = await Device.findAndCountAll(findOptions);

		return res.json(devices);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const device = await Device.findOne({
			where: { id },
			include: {
				model: DeviceInfo,
				as: "info",
			},
		});

		return res.json(device);
	}
}

export const deviceController = new DeviceController();
