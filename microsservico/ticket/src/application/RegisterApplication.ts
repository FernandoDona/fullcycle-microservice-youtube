import Registry from "../Registry";
import ApproveTicket from "./usecases/ApproveTicket";
import ProcessPayment from "./usecases/ProcessPayment";

export default class RegisterApplication {
    readonly registry: Registry

    constructor (registry: Registry) {
        this.registry = registry;
    }

    register() {
        this.registry.register("ProcessPayment", new ProcessPayment(this.registry));
        this.registry.register("ApproveTicket", new ApproveTicket(this.registry));
    }
}