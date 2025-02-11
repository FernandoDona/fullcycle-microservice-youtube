import IEventRepository from "../../application/repositories/IEventRepository";
import Event from "../../domain/entities/Event";
import pgp from "pg-promise";

export default class EventRepository implements IEventRepository {
	connectionString: string

	constructor(config: { connectionString: string }) {
		this.connectionString = config.connectionString
	}

	async get(eventId: string): Promise<Event> {
		const connection = pgp()(this.connectionString);
		const [eventData] = await connection.query("select * from fullcycle.event where event_id = $1", [eventId]);
		await connection.$pool.end();
		return new Event(eventData.event_id, eventData.description, parseFloat(eventData.price), eventData.capacity);
	}

}