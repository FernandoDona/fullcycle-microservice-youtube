import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Registry from "./Registry";
import PurchaseTicket from "./application/usecases/PurchaseTicket";
import TicketRepository from "./infrastructure/repositories/TicketRepository";
import EventRepository from "./infrastructure/repositories/EventRepository";
import TransactionRepository from "./infrastructure/repositories/TransactionRepository";
import FakePaymentGateway from "./infrastructure/integrations/FakePaymentGateway";

dotenv.config();

const app = express();
const port = process.env.PORT;
const registry = new Registry();

app.use(express.json());

app.post("/purchase_ticket", async (req: Request, res: Response) => {
    registry.register("ITicketRepository", new TicketRepository())
    registry.register("IEventRepository", new EventRepository())
    registry.register("ITransactionRepository", new TransactionRepository())
    registry.register("IPaymentGateway", new FakePaymentGateway())
    const purchaseTicket = new PurchaseTicket(registry);

    const output = await purchaseTicket.execute(req.body);

    res.json(output);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})