/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

interface Model<T> {
	deleteMany(filter: FilterQuery<T>): Promise<{ n?: number }>;
	deleteOne(filter: FilterQuery<T>): Promise<{ n?: number }>;
	find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
	findById(id: string | number | Buffer, options?: QueryOptions): Promise<T | null>;
	findByIdAndDelete(id: string | number | Buffer, options?: QueryOptions): Promise<T | null>;
	findByIdAndRemove(id: string | number | Buffer, options?: QueryOptions): Promise<T | null>;
	findByIdAndUpdate(
		id: string | number | Buffer,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<T | null>;
	findOne(filter?: FilterQuery<T>, options?: QueryOptions): Promise<T | null>;
	findOneAndDelete(filter: FilterQuery<T>, options?: QueryOptions): Promise<T | null>;
	findOneAndRemove(filter: FilterQuery<T>, options?: QueryOptions): Promise<T | null>;
	findOneAndReplace(
		filter: FilterQuery<T>,
		replacement: DocumentDefinition<T>,
		options?: QueryOptions
	): Promise<T | null>;
	findOneAndUpdate(
		filter: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<T | null>;
	replaceOne(
		filter: FilterQuery<T>,
		replacement: DocumentDefinition<T>,
		options?: QueryOptions
	): Promise<{ n?: number }>;
	updateMany(
		filter: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<{ n?: number }>;
	updateOne(
		filter: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<{ n?: number }>;
}

export class ModelService<T> implements Model<T> {
	private model: any;

	constructor(keystoneList: { model: any }) {
		this.model = keystoneList.model;
	}

	async deleteMany(filter: FilterQuery<T>): Promise<{ n?: number }> {
		return this.model.deleteMany(filter);
	}
	async deleteOne(filter: FilterQuery<T>): Promise<{ n?: number }> {
		return this.model.deleteOne(filter);
	}
	async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
		return this.model.find(filter, options).then((res) => res.map((itm) => itm.toJSON()));
	}
	async findById(id: string | number | Buffer, options?: QueryOptions): Promise<T> {
		return this.model.findById(id, options);
	}
	async findByIdAndDelete(id: string | number | Buffer, options?: QueryOptions): Promise<T> {
		return this.model.findByIdAndDelete(id, options);
	}
	async findByIdAndRemove(id: string | number | Buffer, options?: QueryOptions): Promise<T> {
		return this.model.findByIdAndRemove(id, options);
	}
	async findByIdAndUpdate(
		id: string | number | Buffer,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<T> {
		return this.model.findByIdAndUpdate(id, update, options);
	}
	async findOne(filter?: FilterQuery<T>, options?: QueryOptions): Promise<T> {
		return this.model.findOne(filter, options);
	}
	async findOneAndDelete(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
		return this.model.findOneAndDelete(filter, options);
	}
	async findOneAndRemove(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
		return this.model.findOneAndRemove(filter, options);
	}
	async findOneAndReplace(
		filter: FilterQuery<T>,
		replacement: DocumentDefinition<T>,
		options?: QueryOptions
	): Promise<T> {
		return this.model.findOneAndReplace(filter, replacement, options);
	}
	async findOneAndUpdate(
		filter: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<T> {
		return this.model.findOneAndUpdate(filter, update, options);
	}
	async replaceOne(
		filter: FilterQuery<T>,
		replacement: DocumentDefinition<T>,
		options?: QueryOptions
	): Promise<{ n?: number }> {
		return this.model.replaceOne(filter, replacement, options);
	}
	async updateMany(
		filter: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<{ n?: number }> {
		return this.model.updateMany(filter, update, options);
	}
	async updateOne(
		filter: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<{ n?: number }> {
		return this.model.updateOne(filter, update, options);
	}
	async create(data: Partial<Omit<T, "_id">>): Promise<T> {
		return this.model.create(data);
	}
}
