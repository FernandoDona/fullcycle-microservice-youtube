import Registry from "../Registry";
import FakePaymentGateway from "./integrations/FakePaymentGateway";
import PaymentApprovedConsumer from "./queue/consumers/PaymentApprovedConsumer";
import TicketReservedConsumer from "./queue/consumers/TicketReservedConsumer";
import RabbitMQAdapter from "./queue/RabbitMQAdapter";
import EventRepository from "./repositories/EventRepository";
import TicketRepository from "./repositories/TicketRepository";
import TransactionRepository from "./repositories/TransactionRepository";

export default class RegisterInfrastructure {
    registry: Registry
    config: any

    constructor(registry: Registry, config: any) {
        this.registry = registry;
        this.config = config;
    }

    async register() {
        this.registerRepositories();
        this.registerPayment();
        await this.registerQueue();
    }

    registerConsumers() {
        const paymentApprovedConsumer = new PaymentApprovedConsumer(this.registry);
        const ticketReservedConsumer = new TicketReservedConsumer(this.registry);
    }

    registerRepositories() {
        this.registry.register("ITicketRepository", new TicketRepository(this.config.postgres))
        this.registry.register("IEventRepository", new EventRepository(this.config.postgres))
        this.registry.register("ITransactionRepository", new TransactionRepository(this.config.postgres))
    }

    registerPayment() {
        this.registry.register("IPaymentGateway", new FakePaymentGateway())
    }

    async registerQueue() {
        const queueService = new RabbitMQAdapter(this.config.rabbitmq);
        await queueService.connect();

        this.registry.register("IQueueService", queueService);
    }
}