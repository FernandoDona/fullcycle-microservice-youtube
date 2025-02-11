import IQueueService from "../../../application/integrations/IQueueService";
import ApproveTicket, { Input } from "../../../application/usecases/ApproveTicket";
import PaymentApproved from "../../../domain/events/PaymentApproved";
import Registry from "../../../Registry";

export default class PaymentApprovedConsumer {
    queueService: IQueueService
    approveTicket: ApproveTicket

    constructor(readonly registry: Registry) {
        this.queueService = registry.inject("IQueueService");
        this.approveTicket = registry.inject("ApproveTicket");

        const callback = (event: PaymentApproved) => {
            const input: Input = {
                ticketId: event.ticketId
            } 

            this.approveTicket.execute(input);
        };

        this.queueService.consume("PaymentApproved", callback);
    }
}