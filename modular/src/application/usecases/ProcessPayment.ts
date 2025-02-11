import Transaction from "../../domain/entities/Transaction";
import PaymentApproved from "../../domain/events/PaymentApproved";
import Registry from "../../Registry";
import IPaymentGateway, {Input as PaymentInput, Output as PaymentOutput } from "../integrations/IPaymentGateway";
import IQueueService from "../integrations/IQueueService";
import ITransactionRepository from "../repositories/ITransactionRepository";

export default class ProcessPayment {
    transactionRepository: ITransactionRepository;
    paymentGateway: IPaymentGateway;
    queueService: IQueueService;

    constructor (readonly registry: Registry) {
        this.transactionRepository = this.registry.inject("ITransactionRepository");
        this.paymentGateway = this.registry.inject("IPaymentGateway");
        this.queueService = this.registry.inject("IQueueService");
    }

    async execute(input: Input): Promise<void> {
        const paymentInput: PaymentInput = {
            email: input.email,
            creditCardToken: input.creditCardToken,
            price: input.price
        };

        const paymentOutput = await this.paymentGateway.createTransaction(paymentInput);
        const transaction = Transaction.create(input.ticketId, input.eventId, paymentOutput.tid, input.price, paymentOutput.status);
        await this.transactionRepository.save(transaction);
        
        if (transaction.status === "approved") {
            const paymentApproved = new PaymentApproved(transaction.ticketId);
            await this.queueService.publish("PaymentApproved", paymentApproved);
        }
    }
}

export type Input = {
    ticketId: string,
    eventId: string
    email: string,
    creditCardToken: string,
    price: number,
}