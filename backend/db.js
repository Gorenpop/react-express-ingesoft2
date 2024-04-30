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
    };
};

export async function getCollect() {
    try {
        const data = await db.$queryRaw`
        SELECT * FROM api_order WHERE activeOrder = 1; 
        `;
        return data; // Devolver los datos obtenidos de la base de datos
    } catch (error) {
        throw new Error(`Error getting active collects: ${error.message}`);
    }
}

export async function getAllCollect() {
    try {
        const data = await db.$queryRaw`
        SELECT * FROM api_order; 
        `;
        return data; // Devolver los datos obtenidos de la base de datos
    } catch (error) {
        throw new Error(`Error getting active collects: ${error.message}`);
    }
}

// Función para editar una recolecta
export async function editCollect(idOrder, newData) {
    try {
        // Ejecuta la consulta SQL utilizando queryRaw de Prisma para actualizar la recolecta
        const recolecta = await db.$queryRaw`
            UPDATE api_order
            SET
                quality = ${newData.quality},
                amount = ${newData.amount},
                price = ${newData.price},
                destiny = ${newData.destiny},
                type = ${newData.type},
            WHERE idOrder = ${idOrder}
        `;

        return { success: true };
    } catch (error) {
        console.error('Error editing collect:', error);
        throw new Error('Error editing collect');
    }
}




// Función para eliminar una recolecta
export async function deleteCollect(idOrder) {
    try {
        const data = await db.$queryRaw`UPDATE api_order SET activeOrder = 1 WHERE idOrder = ${idOrder}`;
        return { success: true };
    } catch (error) {
        console.error('Error deleting collect:', error);
        throw new Error('Error deleting collect');
    }
}

export async function disconnect() {
    await db.$disconnect();
}
