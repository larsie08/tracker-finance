import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private readonly transactionRepository: Repository<Transaction>,
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) {}

	async create(userId: number, createTransactionDto: CreateTransactionDto) {
		const { title, amount, type, category } = createTransactionDto;

		const newTransaction = {
			title,
			amount,
			type,
			category: { id: +category },
			user: { id: userId },
		};

		if (!newTransaction)
			throw new BadRequestException('Something went wrong...');

		const currentCategory = await this.categoryRepository.findOne({
			where: { id: +category },
		});

		if (!currentCategory) throw new NotFoundException('Category not found');

		return await this.transactionRepository.save(newTransaction);
	}

	async findAll(id: number) {
		const transactions = await this.transactionRepository.find({
			where: { user: { id } },
			order: { createdAt: 'DESC' },
		});
		return transactions;
	}

	async findOne(id: number) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
			relations: {
				user: true,
				category: true,
			},
		});

		if (!transaction) throw new NotFoundException('Transaction not found');

		return transaction;
	}

	async update(id: number, updateTransactionDto: UpdateTransactionDto) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
		});

		if (!transaction) throw new NotFoundException('Transaction not found');

		return await this.transactionRepository.update(+id, updateTransactionDto);
	}

	async remove(id: number) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
		});

		if (!transaction) throw new NotFoundException('Transaction not found');

		return await this.transactionRepository.delete(id);
	}

	async findAllWithPagination(id: number, page: number, limit: number) {
		const transaction = await this.transactionRepository.find({
			where: {
				user: { id },
			},
			relations: { category: true, user: true },
			order: { createdAt: 'DESC' },
			take: limit,
			skip: (page - 1) * limit,
		});

		if (!transaction) throw new NotFoundException('Transaction not found');

		return transaction;
	}

	async findAllByType(id: number, type: string) {
		const transaction = await this.transactionRepository.find({
			where: { user: { id }, type },
		});

		if (!transaction) throw new NotFoundException('Transactions not found');

		const total = transaction.reduce((acc, obj) => acc + obj.amount, 0);

		return total;
	}
}
