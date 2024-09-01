const app = require('./app');
const processImages = require('./src/workers/imageProcessor');
const Request = require('./src/models/productModel');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

setInterval(() => {
    Request.find({ status: 'pending' }).then((requests) => {
        requests.forEach((request) => processImages(request.requestId));
    });
}, 60000);