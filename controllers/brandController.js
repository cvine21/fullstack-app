import { Brand } from "../models/models.js";

class BrandController {
	async create(req, res) {
		const { name } = req.body;

		const brand = await Brand.create({ name });

		return res.json(brand);
	}

	async getAll(req, res) {
		const Brands = await Brand.findAll();

		return res.json(Brands);
	}
}

export const brandController = new BrandController();
