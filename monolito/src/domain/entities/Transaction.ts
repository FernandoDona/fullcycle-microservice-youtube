import crypto from "crypto"

export default class Transaction {
    constructor (readonly id: string, readonly ticketId: string, readonly eventId: string,readonly tid: string, readonly price: number, readonly status: string) {

    }

    static create(ticketId: string, eventId: string, tid: string, price: number, status: string): Transaction {
        const transaction = new Transaction(crypto.randomUUID(), ticketId, eventId, tid, price, status);
        return transaction;
    }
}