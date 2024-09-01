const { Parser } = require('json2csv');

async function generateOutputCSV(request) {
    const fields = ['S. No.', 'Product Name', 'Input Image Urls', 'Output Image Urls'];
    const data = request.productData.map((product) => ({
        'S. No.': product.serialNumber,
        'Product Name': product.productName,
        'Input Image Urls': product.inputImageUrls.join(','),
        'Output Image Urls': product.outputImageUrls.join(','),
    }));

    const parser = new Parser({ fields });
    return parser.parse(data);
}

module.exports = { generateOutputCSV };