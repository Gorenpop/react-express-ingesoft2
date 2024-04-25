import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function getModels() {
    const introspectionResult = await db.$executeRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = database();`;
    
    if (introspectionResult) {
        const models = [];
        for (let i = 0; i < introspectionResult.length; i++) {
            models.push(introspectionResult[i][0].table_name);
        }
        return models;
    } else {
        throw new Error("introspectionResult is not available");
    }
}

export async function getUsers() {
    try {
        return await db.persona.findMany();
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

export async function disconnect() {
    await db.$disconnect();
}
