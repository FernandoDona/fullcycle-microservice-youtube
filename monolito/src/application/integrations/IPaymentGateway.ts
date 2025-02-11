export default interface IPaymentGateway {
    createTransaction(input: Input): Promise<Output>;
}

export type Input = {
    email: string,
    creditCardToken: string,
    price: number
}

export type Output = {
    tid: string
    status: string
}