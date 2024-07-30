import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const discordWebhook = 'https://discord.com/api/webhooks/1252785363433422870/0YH-X_lm-F2lSKNyNmqO90DPmpnAjBs8dJ0A5wR6xgxB_1rbWue3Pk3UgXNNDW6xGMPZ';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/webhooks', async (req, res) => {
    const {sender, action, repository} = req.body;
    const event = req.headers['x-github-event'];
    console.log(`Received event: ${event} from ${sender.login} for ${action} on ${repository.full_name}`);
    try {
        await axios.post(discordWebhook, {
            content: `Received event: ${event} from ${sender.login} for ${action} on ${repository.full_name}`
        });
        // Do something with the event
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'error'}).send();

    }
    res.status(200).json({message: 'success'}).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});