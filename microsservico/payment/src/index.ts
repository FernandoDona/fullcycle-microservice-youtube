import { config } from "./config";
import express, { Request, Response } from "express";
import Registry from "./Registry";
import RegisterInfrastructure from "./infrastructure/RegisterInfrastructure";
import RegisterApplication from "./application/RegisterApplication";

async function main() {
    const app = express();
    const registry = new Registry();

    var registerInfrastructure = new RegisterInfrastructure(registry, config);
    var registerApplication = new RegisterApplication(registry);
    await registerInfrastructure.register();
    registerApplication.register();

    registerInfrastructure.registerConsumers();
    
    app.use(express.json());
    
    app.listen(config.application.port, () => {
        console.log(`[server]: Server is running at http://localhost:${config.application.port}`);
    })
}

main();
