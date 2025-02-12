import ITicketRepository from "../../application/repositories/ITicketRepository";
import Ticket from "../../domain/entities/Ticket";
import pgp from "pg-promise";

export default class TicketRepository implements ITicketRepository {
	
	async save(ticket: Ticket): Promise<void> {
		const connection = pgp()("postgres://postgres:12345678@database-2.cxg8oymmu9a4.us-east-2.rds.amazonaws.com:5432/app?ssl=true");
		await connection.query("insert into fullcycle.ticket (ticket_id, event_id, email, status) values ($1, $2, $3, $4)", [ticket.id, ticket.eventId, ticket.email, ticket.status]);
		await connection.$pool.end();
	}

	async update(ticket: Ticket): Promise<void> {
		const connection = pgp()("postgres://postgres:12345678@database-2.cxg8oymmu9a4.us-east-2.rds.amazonaws.com:5432/app?ssl=true");
		await connection.query("update fullcycle.ticket set status = $1 where ticket_id = $2", [ticket.status, ticket.id]);
		await connection.$pool.end();
	}

	async get(id: string): Promise<Ticket> {
		const connection = pgp()("postgres://postgres:12345678@database-2.cxg8oymmu9a4.us-east-2.rds.amazonaws.com:5432/app?ssl=true");
		const [ticketData] = await connection.query("select * from fullcycle.ticket where ticket_id = $1", [id]);
		await connection.$pool.end();
		return new Ticket(ticketData.ticket_id, ticketData.event_id, ticketData.email, ticketData.status);
	}

}