import Registry from "../Registry";
import FakePaymentGateway from "./integrations/FakePaymentGateway";
import TicketReservedConsumer from "./queue/consumers/TicketReservedConsumer";
import RabbitMQAdapter from "./queue/RabbitMQAdapter";
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
        const ticketReservedConsumer = new TicketReservedConsumer(this.registry);
    }

    registerRepositories() {
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