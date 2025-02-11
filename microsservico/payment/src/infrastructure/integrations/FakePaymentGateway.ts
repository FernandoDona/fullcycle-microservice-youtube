import IPaymentGateway, { Input, Output } from "../../application/integrations/IPaymentGateway";

export default class FakePaymentGateway implements IPaymentGateway {

    createTransaction(input: Input): Promise<Output> {
        const output: Output = {
            tid: "029456240596823452345",
            status: "approved"
        };
        
        return Promise.resolve(output);
    }
}