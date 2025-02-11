import Registry from "../../Registry";
import ITicketRepository from "../repositories/ITicketRepository";

export default class ApproveTicket {
    ticketRepository: ITicketRepository;

    constructor (readonly registry: Registry) {
        this.ticketRepository = this.registry.inject("ITicketRepository");
    }

    async execute (input: Input): Promise<void> {
        let ticket = await this.ticketRepository.get(input.ticketId);
        ticket.approve();

        await this.ticketRepository.update(ticket);
    }
}

export type Input = {
    ticketId: string
}