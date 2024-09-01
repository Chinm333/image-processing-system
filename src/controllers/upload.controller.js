const Request = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');
const { validateCSV } = require('../utils/validation');
const csv = require('csv-parser');
const fs = require('fs');
const processImages = require('../workers/imageProcessor');

exports.uploadCSV = async (req, res) => {
  try {
    const fileRows = [];

    fs.createReadStream(req.file.path)
      .pipe(csv({ separator: ',' })) 
      .on('data', (row) => {
        row['Input Image Urls'] = row['Input Image Urls']
          .replace(/^"|"$/g, '')  
          .split(',');             

        fileRows.push(row);
      })
      .on('end', async () => {
        const isValid = validateCSV(fileRows);
        if (!isValid) {
          return res.status(400).json({ error: 'Invalid CSV format' });
        }

        const requestId = uuidv4();
        await Request.create({
          requestId,
          status: 'pending',
          productData: fileRows.map((row) => ({
            serialNumber: row['S.No'],
            productName: row['Product Name'],
            inputImageUrls: row['Input Image Urls'],
          })),
        });
        await processImages(requestId);
        res.json({ requestId });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};