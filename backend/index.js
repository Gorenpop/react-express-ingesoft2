import express from 'express';
import cors from 'cors';
import { postRecolecta } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server started');
});

process.on('SIGINT', async () => {
    await disconnect();
    process.exit();
});


app.post('/api/recolecta', async (req, res) => {
    const data = req.body; 
    console.log(data)
    try {
        const models = await postRecolecta(data);
        res.status(201).send({ success: true, data: models }); // Devuelve un código 201 (Created) y los datos insertados
    } catch (error) {
        console.error('Error adding recolecta:', error);
        res.status(500).send({ success: false, error: error.message }); // Devuelve un código 500 (Internal Server Error) y el mensaje de error
    }
});

