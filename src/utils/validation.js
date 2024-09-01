exports.validateCSV = (rows) => {
    if (!Array.isArray(rows) || rows.length === 0) {
        return false;
    }

    for (const row of rows) {
        if (!row['S.No'] || !row['Product Name'] || !Array.isArray(row['Input Image Urls'])) {
            return false;
        }

        for (const url of row['Input Image Urls']) {
            if (typeof url !== 'string' || !url.startsWith('http')) {
                return false;
            }
        }
    }

    return true;
};
