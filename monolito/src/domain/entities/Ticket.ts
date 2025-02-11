export default class Ticket {
    constructor(readonly id: string, readonly eventId: string, readonly email: string, public status: string) {

    }

    static create(eventId: string, email: string) {
        const ticket = new Ticket(crypto.randomUUID(), eventId, email, "reserved");
        return ticket;
    }

    approve() {
        this.status = "paid";
    }

    cancel() {
        this.status = "canceled"
    }
}