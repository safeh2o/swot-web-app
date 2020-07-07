const MongoClient = require('mongodb').MongoClient;
const mailer = require('./emailer');

const uri = process.env.MONGO_DB_CONNECTION_STRING.replace(`/${process.env.CMS_SOURCE_DB}?`, '/?');

/**
 * Update CMS Pages on other environments through MongoDB connections
 */
exports.updateOtherPages = async function (page) {
    if (process.env.CMS_DESTINATION_DBS && process.env.CMS_DESTINATION_DBS !== '') {
        process.env.CMS_DESTINATION_DBS.split(",").forEach(async (dbName) => {
            await updateOtherPage(page, dbName);
        });
    }
}

/**
 * Update CMS Blogs on other environments through MongoDB connections
 */
exports.updateOtherBlogs = async function (blog) {
    if (process.env.CMS_DESTINATION_DBS && process.env.CMS_DESTINATION_DBS !== '') {
        process.env.CMS_DESTINATION_DBS.split(",").forEach(async (dbName) => {
            await updateOtherBlog(blog, dbName);
        });
    }
}

async function updateOtherPage(page, dbName) {
    return MongoClient.connect(uri, {useUnifiedTopology: true}, async (err, client) => {
        if (err) {
            mailer.emailAdmin(errMessage(err, 'Page', dbName));
        }

        const dbo = client.db(dbName);
        const query = { slug: page.slug };
        const newValues = { $set: {content: page.content, state: page.state} };

        const pagesCollection = dbo.collection('pages');

        const pageExists = await pagesCollection.findOne(query);

        if (pageExists) {
            pagesCollection.updateOne(query, newValues, (err, res) => {
                if (err) {
                    mailer.emailAdmin(errMessage(err, 'Page', dbName));
                }

                console.log(`page "${page.title}" in ${dbName} updated`);
                client.close();
                return res;
            });
        }

        else {
            pagesCollection.insertOne(clonePage(page), function(err, res){
                if (err) {
                    mailer.emailAdmin(errMessage(err, 'Page', dbName));
                }

                console.log(`page "${page.title}" in ${dbName} created`);
                client.close();
                return res;
            });
        }
    });
}

async function updateOtherBlog(blog, dbName) {
    return MongoClient.connect(uri, {useUnifiedTopology: true}, async (err, client) => {
        if (err) {
            mailer.emailAdmin(errMessage(err, 'Blog', dbName));
        }

        const dbo = client.db(dbName);
        const query = { slug: blog.slug };
        const newBlog = cloneBlog(blog);
        await updateBlog(client, blog, newBlog, dbName);
        const newValues = { $set: newBlog };

        const blogCollection = dbo.collection('posts');

        const postExists = await blogCollection.findOne(query);

        if (postExists) {
            blogCollection.updateOne(query, newValues, (err, res) => {
                if (err) {
                    mailer.emailAdmin(errMessage(err, 'Blog', dbName));
                }

                console.log(`blog "${blog.title}" in ${dbName} updated`);
                client.close();
                return res;
            });
        }

        else {
            blogCollection.insertOne(newBlog, function(err, res){
                if (err) {
                    mailer.emailAdmin(errMessage(err, 'Blog', dbName));
                }

                console.log(`blog "${blog.title}" in ${dbName} created`);
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

function cloneBlog(blog) {
    const newBlog = {
        updatedAt: blog.updatedAt,
        slug: blog.slug,
        title: blog.title,
        state: blog.state,
        __v: 0,
        content: blog.content,
        categories: [],
        publishedDate: blog.publishedDate,
        author: null
    }

    return newBlog;
}

async function updateBlog(client, srcBlog, destBlog, dbname_dest) {
    const dbo_dest = client.db(dbname_dest);

    if (srcBlog.categories && srcBlog.categories.length) {
        const collectionName = 'postcategories';
        const postcategories_dest = dbo_dest.collection(collectionName);

        for (let i = 0; i < srcBlog.categories.length; i++) {
            const category = srcBlog.categories[i];
            const translation = await translateModel(client, process.env.CMS_SOURCE_DB, dbname_dest, collectionName, category, 'key');
            if (translation.dest) {
                destBlog.categories.push(translation.dest._id);
            }
            else {
                const newCat = await postcategories_dest.insertOne(translation.src);
                destBlog.categories.push(newCat.insertedId);
            }
        }
    }

    if (srcBlog.author) {
        const translation = await translateModel(client, process.env.CMS_SOURCE_DB, dbname_dest, 'users', srcBlog.author, 'email');
        if (translation.dest) {
            destBlog.author = translation.dest._id;
        }
    }
}

async function translateModel(client, dbname_src, dbname_dest, collectionName, id, keyName) {
    const dbo_src = client.db(dbname_src);
    const dbo_dest = client.db(dbname_dest);
    const collection_src = dbo_src.collection(collectionName);
    const collection_dest = dbo_dest.collection(collectionName);

    const doc_src = await collection_src.findOne({ _id: id }, { projection: { _id: 0 } });
    const doc_dest = await collection_dest.findOne({ [keyName]: doc_src[keyName] });

    return new ModelTranslation(doc_src, doc_dest);
}

function errMessage(err, collection, dbName){
    return `Error updating CMS ${collection} on ${dbName}. Message: ${err}`;
}

class ModelTranslation {
    constructor(src, dest) {
        this.src = src;
        this.dest = dest;
    }
}
