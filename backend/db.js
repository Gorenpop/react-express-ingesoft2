import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function postRecolecta(data) {
    try {
        const validQualities = ['super', 'alta', 'media'];
        const validTypes = ['vegetal', 'animal', 'semi-industrial', 'semi-procesado'];

        if (!validQualities.includes(data.quality)) {
            throw new Error(`Invalid quality: ${data.quality}`);
        }

        if (!validTypes.includes(data.type)) {
            throw new Error(`Invalid type: ${data.type}`);
        }

        const recolecta = await db.$queryRaw`
            INSERT INTO api_order (
                quality,
                amount,
                price,
                destiny,
                type,
                idUser_id
            )
            VALUES (
                ${data.quality},
                ${data.amount},
                ${data.price},
                ${data.destiny},
                ${data.type},
                ${data.idUser_id}
            )
        `;
        
        if (recolecta) {
            return recolecta;
        } else {
            throw new Error("recolecta is not available");
        }
    } catch (error) {
        throw new Error(`Error adding recolecta: ${error.message}`);
    }
}




export async function disconnect() {
    await db.$disconnect();
}
