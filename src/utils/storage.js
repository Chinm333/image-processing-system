const { getStorage } = require('../config/firebaseConfig');

async function uploadToStorage(buffer) {
    const bucket = getStorage().bucket();
    const filename = `processed-images/${Date.now()}.jpg`;
    const file = bucket.file(filename);

    await file.save(buffer, {
        metadata: { contentType: 'image/jpeg' },
    });

    return file.publicUrl();
}

module.exports = { uploadToStorage };