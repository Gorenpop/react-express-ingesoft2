import express from 'express';
import cors from 'cors';
import { getModels, getUsers, disconnect } from './db.js';

const app = express();

app.use(cors());

app.listen(3000, () => {
    console.log('Server started');
});

app.get('/api/models', async (req, res) => {
    try {
        const models = await getModels();
        res.send({ models });
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).send({ error: error.message });
    }
});

app.get('/api/personas', async (req, res) => {
    try {
        const users = await getUsers();
        res.send({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: error.message });
    }
});

process.on('exit', disconnect);
