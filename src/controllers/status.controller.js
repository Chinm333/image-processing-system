const Request = require('../models/productModel');

exports.getStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await Request.findOne({ requestId });

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};