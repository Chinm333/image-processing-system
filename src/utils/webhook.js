const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function triggerWebhook(requestId) {
    try {
        await axios.post(process.env.WEBHOOK_URL, { requestId });
    } catch (error) {
        console.error('Error triggering webhook:', error);
    }
}

module.exports = { triggerWebhook };