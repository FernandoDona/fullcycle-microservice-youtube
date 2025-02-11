export default class Ticket {
    constructor(readonly id: string, readonly eventId: string, readonly email: string, public status: TicketStatus) {

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

export type TicketStatus = "reserved" | "paid" | "canceled";