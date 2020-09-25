const keystone = require('keystone');
const Dataset = keystone.list('Dataset');
const std = require('../../utils/standardize');

exports.raw = async function(req, res) {
    const success = await validateRequest(req, res);
    if (!success) {
        return;
    }
    
    const dataset = await Dataset.model.findOne({_id: req.query.datasetId}).exec();

    return await downloadFromAzure(dataset.file, res);
}

exports.standardized = async function(req, res) {
    const success = await validateRequest(req, res);
    if (!success) {
        return;
    }

    const dataset = await Dataset.model.findOne({_id: req.query.datasetId}).exec();

    if (!dataset) {
        res.status(404).send();
        return;
    }

    return await downloadFromAzure(dataset.stdFile, res);
}

async function downloadFromAzure(azureFile, res) {

    if (!azureFile) {
        res.status(404).send();
        return;
    }

    try {
        const stream = std.getBlobReadStream(azureFile.container, azureFile.filename);

        stream.on('error', (err) => {
            console.error("Invalid retrieval request for Azure", err);
            res.status(404).send();
            return;
        });
        stream.on('data', () => {
            res.header('Content-Disposition', `attachment; filename="${azureFile.filename}"`);
            res.header('Content-Type', azureFile.mimetype);
        });

        stream.pipe(res);
    } catch (err) {
        res.status(400).send(err.message);
    } finally {
        return;
    }
}

async function validateRequest(req, res) {
    if (!req.query.datasetId) {
        res.status(400).send('Invalid dataset id');
        return false;
    }

    if (!req.user) {
        res.redirect('/admin/signin', 302);
        return false;
    }

    if (!req.user.isAdmin) {
        res.status(403).send('Insufficient Privilleges');
        return false;
    }

    return true;
}
