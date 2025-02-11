import IQueueService from "../../../application/integrations/IQueueService";
import ProcessPayment, { Input } from "../../../application/usecases/ProcessPayment";
import TicketReserved from "../../../domain/events/TicketReserved";
import Registry from "../../../Registry";

export default class TicketReservedConsumer {
    queueService: IQueueService
    processPayment: ProcessPayment

    constructor(readonly registry: Registry) {
        this.queueService = registry.inject("IQueueService");
        this.processPayment = registry.inject("ProcessPayment");

        const callback = (event: TicketReserved) => {
            const input: Input = {
                creditCardToken: event.creditCardToken,
                email: event.email,
                eventId: event.eventId,
                price: event.price,
                ticketId: event.ticketId
            } 

            this.processPayment.execute(input);
        };

        this.queueService.consume("TicketReserved", callback);
    }
}