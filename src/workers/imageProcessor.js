const sharp = require('sharp');
const axios = require('axios');
const Request = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const processImage = async (imageUrl, outputDir) => {
    try {
        const urlParts = new URL(imageUrl);
        const fileName = path.basename(urlParts.pathname).replace(/[\/\\?%*:|"<>]/g, '_');
        const outputFileName = path.join(outputDir, fileName);

        const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        await sharp(buffer)
            .resize({ width: 800 })
            .png({ quality: 50 })
            .toFile(outputFileName);
        return outputFileName;
    } catch (error) {
        console.error(`Failed to process image from URL: ${imageUrl}`, error.message);
        throw error;
    }
};


const processImages = async (requestId) => {
    try {
        const request = await Request.findOne({ requestId });
        if (!request) {
            throw new Error('Request not found');
        }

        const outputDir = path.join(__dirname, 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        await Promise.all(request.productData.map(async (product) => {
            const outputImageUrls = await Promise.all(product.inputImageUrls.map(async (url) => {
                const outputFileName = await processImage(url, outputDir);
                return `https://storage.googleapis.com/pomodro-aa031.appspot.com/${path.basename(outputFileName)}`;
            }));

            await Request.updateOne(
                { requestId: requestId, 'productData._id': product._id },
                { $set: { 'productData.$.outputImageUrls': outputImageUrls } }
            );
        }));

        await Request.updateOne(
            { requestId: requestId },
            { status: 'completed' }
        );

    } catch (error) {
        console.error('Error processing images:', error.message);
    }
};


module.exports = processImages;
