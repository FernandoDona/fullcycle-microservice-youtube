import IEventRepository from "../../application/repositories/IEventRepository";
import Event from "../../domain/entities/Event";
import pgp from "pg-promise";

export default class EventRepository implements IEventRepository {
	
	async get(eventId: string): Promise<Event> {
		const connection = pgp()("postgres://postgres:12345678@database-2.cxg8oymmu9a4.us-east-2.rds.amazonaws.com:5432/app");
		const [eventData] = await connection.query("select * from fullcycle.event where event_id = $1", [eventId]);
		await connection.$pool.end();
		return new Event(eventData.event_id, eventData.description, parseFloat(eventData.price), eventData.capacity);
	}

}