import axios from "axios";
import { test, expect, describe } from "@jest/globals"

const baseUrl = "http://localhost:3000";

test('Deve comprar o ticket do evento', async () => {
    const input = {
        eventId: 'bf6a9b3d-4d5c-4c9d-bf3b-4a091b05dc76',
        email: 'teste@email.com',
        creditCardToken: '34564509636456'
    }

    const response = await axios.post(`${baseUrl}/purchase_ticket`, input);

    const output = response.data;
    expect(output.status).toBe("paid");
})