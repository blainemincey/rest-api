/**
 * Created by bmincey on 6/16/17.
 *
 * Majority of code taken from
 * https://www.mongodb.com/blog/post/getting-started-with-mongodb-nodejs-and-restify
 */

'use strict'

/**
 * Module Dependencies
 */
const config  = require('./config')
const restify = require('restify')
const mongodb = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version
})

/**
 * Bundled Plugins (http://restify.com/#bundled-plugins)
 */
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())

/**
 * Lift Server, Connect to DB & Require Route File
 */
server.listen(config.port, () => {

    console.log('Connecting to MongoDB Atlas...')

    // establish connection to mongodb atlas
    mongodb.connect(config.db.uri, (err, db) => {

        if (err) {
            console.log('An error occurred while attempting to connect to MongoDB', err)
            process.exit(1)
        }

        console.log(
            '%s v%s ready to accept connections on port %s in %s environment.',
            server.name,
            config.version,
            config.port,
            config.env
        )

        require('./routes')({ db, server, ObjectID })

    })

})