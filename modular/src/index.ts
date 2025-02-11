import { config } from "./config";
import express, { Request, Response } from "express";
import Registry from "./Registry";
import PurchaseTicket from "./application/usecases/PurchaseTicket";
import RegisterInfrastructure from "./infrastructure/RegisterInfrastructure";
import RegisterApplication from "./application/RegisterApplication";
import GetTicket from "./application/usecases/GetTicket";

async function main() {
    const app = express();
    const registry = new Registry();

    var registerInfrastructure = new RegisterInfrastructure(registry, config);
    var registerApplication = new RegisterApplication(registry);
    await registerInfrastructure.register();
    registerApplication.register();
    registerInfrastructure.registerConsumers();
    
    app.use(express.json());
    
    app.post("/purchase_ticket", async (req: Request, res: Response) => {
        const purchaseTicket = new PurchaseTicket(registry);
        const output = await purchaseTicket.execute(req.body);
        res.json(output);
    });

    app.get("/ticket/:ticketId", async (req: Request, res: Response) => {
        const getTicket = new GetTicket(registry);
        const output = await getTicket.execute(req.params.ticketId);
        res.json(output);
    });
    
    app.listen(config.application.port, () => {
        console.log(`[server]: Server is running at http://localhost:${config.application.port}`);
    })
}

main();
