const MongoClient = require('mongodb').MongoClient;
const mailer = require('./emailer');

const uri = process.env.MONGO_DB_CONNECTION_STRING.replace(`/${process.env.CMS_SOURCE_DB}?`, '/?');

/**
 * Update CMS on other environments through MongoDB connections
 */
exports.updateOtherPages = async function (page) {
    if (process.env.CMS_DESTINATION_DBS && process.env.CMS_DESTINATION_DBS !== '') {
        process.env.CMS_DESTINATION_DBS.split(",").forEach(async (dbName) => {
            await updateOther(page, dbName);
        });
    }
}

async function updateOther(page, dbName) {
    return MongoClient.connect(uri, {useUnifiedTopology: true}, async (err, client) => {
        if (err) {
            mailer.emailAdmin(`Error occurred while updating CMS for ${dbName}, error is ${err}`);
        }

        const dbo = client.db(dbName);
        const query = { slug: page.slug };
        const newValues = { $set: {content: page.content, state: page.state} };

        const pagesCollection = dbo.collection('pages');

        const pageExists = await pagesCollection.findOne(query);

        if (pageExists) {
            pagesCollection.updateOne(query, newValues, (err, res) => {
                if (err) {
                    mailer.emailAdmin(`Error occurred while updating CMS for ${dbName}, error is ${err}`);
                }

                console.log(`page "${page.title}" in ${dbName} updated`);
                client.close();
                return res;
            });
        }

        else {
            pagesCollection.insertOne(clonePage(page), function(err, res){
                if (err) {
                    mailer.emailAdmin(`Error occurred while updating CMS for ${dbName}, error is ${err}`);
                }

                console.log(`page "${page.title}" in ${dbName} created`);
                client.close();
                return res;
            });
        }
    });
}

function clonePage(page) {
    const newPage = { 
        slug: page.slug,
        title: page.title,
        content: page.content,
        state: page.state,
        __v: 0
    }

    return newPage;
}
