import { TicketStatus } from "../../domain/entities/Ticket";
import Registry from "../../Registry";
import ITicketRepository from "../repositories/ITicketRepository";

export default class GetTicket {
    readonly registry: Registry
    readonly ticketRepository: ITicketRepository

    constructor (registry: Registry) {
        this.registry = registry;
        this.ticketRepository = registry.inject("ITicketRepository");
    }

    async execute(ticketId: string) {
        const ticket = await this.ticketRepository.get(ticketId);

        return {
            ticketId: ticket.id,
            status: ticket.status
        }
    }

}

export type Output = {
    ticketId: string
    status: TicketStatus    
}