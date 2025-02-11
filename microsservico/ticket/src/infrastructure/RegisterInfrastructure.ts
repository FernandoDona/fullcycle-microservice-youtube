import Registry from "../Registry";
import PaymentApprovedConsumer from "./queue/consumers/PaymentApprovedConsumer";
import RabbitMQAdapter from "./queue/RabbitMQAdapter";
import EventRepository from "./repositories/EventRepository";
import TicketRepository from "./repositories/TicketRepository";

export default class RegisterInfrastructure {
    registry: Registry
    config: any

    constructor(registry: Registry, config: any) {
        this.registry = registry;
        this.config = config;
    }

    async register() {
        this.registerRepositories();
        await this.registerQueue();
    }

    registerConsumers() {
        const paymentApprovedConsumer = new PaymentApprovedConsumer(this.registry);
    }

    registerRepositories() {
        this.registry.register("ITicketRepository", new TicketRepository(this.config.postgres))
        this.registry.register("IEventRepository", new EventRepository(this.config.postgres))
    }

    async registerQueue() {
        const queueService = new RabbitMQAdapter(this.config.rabbitmq);
        await queueService.connect();

        this.registry.register("IQueueService", queueService);
    }
}