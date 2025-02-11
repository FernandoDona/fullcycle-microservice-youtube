import ITransactionRepository from "../../application/repositories/ITransactionRepository";
import Transaction from "../../domain/entities/Transaction";
import pgp from "pg-promise"

export default class TransactionRepository implements ITransactionRepository {
	connectionString: string

	constructor(config: { connectionString: string }) {
		this.connectionString = config.connectionString
	}

	async save(transaction: Transaction): Promise<void> {
		const connection = pgp()(this.connectionString);
		await connection.query("insert into fullcycle.transaction (transaction_id, ticket_id, event_id, tid, price, status) values ($1, $2, $3, $4, $5, $6)", [transaction.id, transaction.ticketId, transaction.eventId, transaction.tid, transaction.price, transaction.status]);
		await connection.$pool.end();
	}

}