import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function getModels() {
    try {
        const introspectionResult = await db.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = database();`;        
        if (introspectionResult) {
            const models = introspectionResult.map(row => row.TABLE_NAME);  // Accede a TABLE_NAME en mayúsculas
            return models;
        } else {
            throw new Error("introspectionResult is not available");
        }
    } catch (error) {
        throw new Error(`Error fetching models: ${error.message}`);
    }
}




export async function getUsers() {
    try {
        const users = await db.api_user.findMany();
        // Convertir BigInt a cadenas antes de enviarlos
        const formattedUsers = users.map(user => {
            const formattedUser = {
                ...user,
                id: user.id ? user.id.toString() : null,
                idUser: user.idUser ? user.idUser.toString() : null,
                idBuyer_id: user.idBuyer_id ? user.idBuyer_id.toString() : null,
                idOrder_id: user.idOrder_id ? user.idOrder_id.toString() : null
            };
            return formattedUser;
        });
        return formattedUsers;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}



export async function disconnect() {
    await db.$disconnect();
}
