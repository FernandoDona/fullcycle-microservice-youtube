import amqp from "amqplib";
import IQueueService from "../../application/integrations/IQueueService";

export default class RabbitMQAdapter implements IQueueService {
    url: string
    connection: amqp.Connection | undefined

    constructor(config: { url: string }){
        this.url = config.url;
    }
    
    async connect(): Promise<void> {
        if (this.connection == undefined)
            this.connection = await amqp.connect(this.url);
    }

    async publish(queue: string, content: any): Promise<void> {
        if (content == undefined) {
            console.error("no content");
        }
        
        await this.connect();
        const ch = await this.connection!.createChannel();

        await ch.assertQueue(queue);

        const json = JSON.stringify(content);
        await ch.sendToQueue(queue, Buffer.from(json));
    }

    async consume(queue: string, callback: Function): Promise<void> {
        await this.connect();
        const ch = await this.connection!.createChannel();

        await ch.assertQueue(queue);

        ch.consume(queue, (msg) => {
            if (msg == undefined) {
                console.error("empty message");
            }
            
            const content = JSON.parse(msg!.content.toString());
            callback(content);
            ch.ack(msg!);
        }, {
            noAck: false
        })
    }
}