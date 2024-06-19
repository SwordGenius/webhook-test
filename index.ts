import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/webhooks', (req, res) => {
    console.log(req.body);
    res.status(200).json({message: 'success'}).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});