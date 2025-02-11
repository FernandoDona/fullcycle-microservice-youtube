import Ticket from "../../domain/entities/Ticket";
import Registry from "../../Registry"
import IEventRepository from "../repositories/IEventRepository";
import ITicketRepository from "../repositories/ITicketRepository";
import TicketReserved from "../../domain/events/TicketReserved";
import IQueueService from "../integrations/IQueueService";

export default class PurchaseTicket {
    ticketRepository: ITicketRepository;
    eventRepository: IEventRepository;
    queueService: IQueueService;

    constructor (readonly registry: Registry) {
        this.ticketRepository = this.registry.inject("ITicketRepository");
        this.eventRepository = this.registry.inject("IEventRepository");
        this.queueService = this.registry.inject("IQueueService");
    }

    async execute(input: Input): Promise<Output> {
        const event = await this.eventRepository.get(input.eventId);

        const ticket = Ticket.create(input.eventId, input.email);
        await this.ticketRepository.save(ticket);

        const ticketReserved = new TicketReserved(ticket.id, event.id, ticket.email, input.creditCardToken, event.price);
        await this.queueService.publish("TicketReserved", ticketReserved);

        return { ticketId: ticket.id };
    }
}

type Input = {
    eventId: string
    email: string
    creditCardToken: string
}

type Output = {
    ticketId: string
}