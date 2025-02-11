export default interface IQueueService {
    connect(): Promise<void>;
    publish(queue: string, content: any): Promise<void>;
    consume(queue: string, callback: Function): Promise<void>;
}