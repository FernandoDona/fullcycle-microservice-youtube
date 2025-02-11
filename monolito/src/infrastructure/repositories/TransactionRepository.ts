import ITransactionRepository from "../../application/repositories/ITransactionRepository";
import Transaction from "../../domain/entities/Transaction";
import pgp from "pg-promise"

export default class TransactionRepository implements ITransactionRepository {
	
	async save(transaction: Transaction): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into fullcycle.transaction (transaction_id, ticket_id, event_id, tid, price, status) values ($1, $2, $3, $4, $5, $6)", [transaction.id, transaction.ticketId, transaction.eventId, transaction.tid, transaction.price, transaction.status]);
		await connection.$pool.end();
	}

}