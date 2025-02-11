import Event from "../../domain/entities/Event"

export default interface IEventRepository {
    get(eventId: string): Promise<Event>
}