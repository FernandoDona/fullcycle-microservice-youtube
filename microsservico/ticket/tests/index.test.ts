import axios from "axios";
import { test, expect, describe } from "@jest/globals"

const baseUrl = "http://localhost:3000";

test('Deve comprar o ticket do evento', async () => {
    const input = {
        eventId: 'bf6a9b3d-4d5c-4c9d-bf3b-4a091b05dc76',
        email: 'teste@email.com',
        creditCardToken: '34564509636456'
    }

    const purchaseResponse = await axios.post(`${baseUrl}/purchase_ticket`, input);
    const output = purchaseResponse.data;

    await delay(1000);

    const ticketResponse = await axios.get(`${baseUrl}/ticket/${output.ticketId}`);
    const ticket = ticketResponse.data;
    
    expect(ticket.status).toBe("paid");
})

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}