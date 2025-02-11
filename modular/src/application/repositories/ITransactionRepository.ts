import Transaction from "../../domain/entities/Transaction";

export default interface ITransactionRepository {
    save(transaction: Transaction): Promise<void>;
}