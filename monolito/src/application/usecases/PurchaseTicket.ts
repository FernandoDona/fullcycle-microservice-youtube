import Ticket from "../../domain/entities/Ticket";
import Transaction from "../../domain/entities/Transaction";
import Registry from "../../Registry"
import IPaymentGateway from "../integrations/IPaymentGateway";
import IEventRepository from "../repositories/IEventRepository";
import ITicketRepository from "../repositories/ITicketRepository";
import ITransactionRepository from "../repositories/ITransactionRepository";

export default class PurchaseTicket {
    ticketRepository: ITicketRepository;
    eventRepository: IEventRepository;
    transactionRepository: ITransactionRepository;
    paymentGateway: IPaymentGateway;

    constructor (readonly registry: Registry) {
        this.ticketRepository = this.registry.inject("ITicketRepository");
        this.eventRepository = this.registry.inject("IEventRepository");
        this.transactionRepository = this.registry.inject("ITransactionRepository");
        this.paymentGateway = this.registry.inject("IPaymentGateway");
    }

    async execute(input: Input): Promise<Output> {
        // PurchaseTicket
        const ticket = Ticket.create(input.eventId, input.email);
        await this.ticketRepository.save(ticket);
        // TicketReserved
        
        // ProcessPayment
        const event = await this.eventRepository.get(input.eventId);
        const paymentInput = {
            email: ticket.email,
            creditCardToken: input.creditCardToken,
            price: event.price
        }
        const paymentOutput = await this.paymentGateway.createTransaction(paymentInput);
        const transaction = Transaction.create(ticket.id, event.id, paymentOutput.tid, event.price, paymentOutput.status);
        await this.transactionRepository.save(transaction);
        // PaymentApproved
        // or
        // PaymentCanceled

        if (transaction.status === "approved") {
            // ApproveTicket
            ticket.approve();
        }
        else {
            // CancelTicket
            ticket.cancel();
        }

        return {
            ticketId: ticket.id,
            status: ticket.status
        };
    }
}

type Input = {
    eventId: string
    email: string
    creditCardToken: string
}

type Output = {
    ticketId: string
    status: string
}