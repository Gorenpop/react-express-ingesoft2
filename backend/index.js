import express from 'express';
import cors from 'cors';
import { getCollect, postRecolecta, editCollect, deleteCollect,getAllCollect } from './db.js';

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
        res.status(201).send({ success: true, data: models }); 
    } catch (error) {
        console.error('Error adding recolecta:', error);
        res.status(500).send({ success: false, error: error.message }); 
    }
});


app.get('/api/recolectaActiva', async (req, res) => {
    try {
        const collects = await getCollect();
        // Convertir campos BigInt a cadena si no son null, de lo contrario, dejarlos como null
        const formattedCollects = collects.map(collect => ({
            idOrder: collect.idOrder !== null ? collect.idOrder.toString() : null,
            quality: collect.quality !== null ? collect.quality.toString() : null,
            amount: collect.amount !== null ? collect.amount.toString() : null,
            price: collect.price !== null ? collect.price.toString() : null,
            destiny: collect.destiny,
            type: collect.type,
            idUser_id: collect.idUser_id !== null ? collect.idUser_id.toString() : null,
            activeOrder: collect.activeOrder
        }));
        res.status(200).send({ success: true, collects: formattedCollects });
    } catch (error) {
        console.log('Error getting the active collects:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});


app.get('/api/recolectaAll', async (req, res) => {
    try {
        const collects = await getAllCollect();
        // Convertir campos BigInt a cadena si no son null, de lo contrario, dejarlos como null
        const formattedCollects = collects.map(collect => ({
            idOrder: collect.idOrder !== null ? collect.idOrder.toString() : null,
            quality: collect.quality !== null ? collect.quality.toString() : null,
            amount: collect.amount !== null ? collect.amount.toString() : null,
            price: collect.price !== null ? collect.price.toString() : null,
            destiny: collect.destiny,
            type: collect.type,
            idUser_id: collect.idUser_id !== null ? collect.idUser_id.toString() : null,
            activeOrder: collect.activeOrder
        }));
        res.status(200).send({ success: true, collects: formattedCollects });
    } catch (error) {
        console.log('Error getting the active collects:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});


// Ruta para editar una recolecta
app.put('/api/recolecta/edit/:idOrder', async (req, res) => {
    const idOrder = req.params.idOrder;
    const newData = req.body; // Datos actualizados de la recolecta

    try {
        const result = await editCollect(idOrder, newData);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error editing collect:', error);
        res.status(500).send({ success: false, error: 'Error editing collect' });
    }
});


// Ruta para eliminar una recolecta
app.delete('/api/recolecta/delete/:idOrder', async (req, res) => {
    const idOrder = req.params.idOrder;

    try {
        const result = await deleteCollect(idOrder);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error deleting collect:', error);
        res.status(500).send({ success: false, error: 'Error deleting collect' });
    }
});
