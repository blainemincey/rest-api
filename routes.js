/**
 * Created by bmincey on 6/16/17.
 */

'use strict'

module.exports = function(ctx) {


    // extract context from passed in object
    const db = ctx.db
    const server = ctx.server
    const ObjectID = ctx.ObjectID

    // assign collection to variable for further use
    const collection = db.collection('todos')

    /**
     * Test method
     */
    server.get('/', (req, res, next) => {

        res.send("Hello, Blaine!")
    })

    /**
     * Create
     */
    server.post('/todos', (req, res, next) => {

        console.log("Posting data...")

        // extract data from the body and add timestamps
        const data = Object.assign({}, req.body, {
            created : new Date(),
            updated : new Date()
        })

        // insert one object into todos collection
        collection.insertOne(data)
            .then(doc => res.send(200, doc.ops[0]))
            .catch(err => res.send(500, err))

        next()
    })

    /**
     * read
     */
    server.get('/todos', (req, res, next) => {

        console.log("Reading data...")

        let limit = parseInt(req.query.limit, 10) || 10 // limit to 10 docs
        let skip  = parseInt(req.query.skip, 10) || 0 // skip 0 docs
        let query = req.query || {}

        // remove skip and query limit from query to avoid false querying
        delete query.skip
        delete query.limit

        // find todos and convert to array (with optional query, skip, limit)
        collection.find(query).skip(skip).limit(limit).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))

        next()
    })

    /**
     * update
     */
    server.put('/todos/:id', (req, res, next) => {

        console.log("Updating data for id: " + req.params.id)

        //extract data from body and add timestamps
        const data = Object.assign({}, req.body, {
            updated : new Date()
        })

        //build out findOneAndUpdate variables to stay organized
        let query = { _id  : ObjectID(req.params.id) }
        let body  = { $set : data }
        let opts  = {

            returnOriginal : false,
            upsert : true
        }


        // find and update document on passed id (via route)
        collection.findOneAndUpdate(query, body, opts)
            .then(doc => res.send(204))
            .catch(err => res.send(500, err))

        next()
    })

    /**
     * delete
     */
    server.del('/todos/:id', (req, res, next) => {

        console.log("Deleting for id: " + req.params.id)

        // remove one document based on id
        collection.findOneAndDelete({ _id : ObjectID(req.params.id) })
            .then(doc => res.send(204))
            .catch(err => res.send(500, err))

        next()

    })

    /**
     * Get one
     */
    server.get('/todos/:id', (req, res, next) => {

        console.log("Get data for id: " + req.params.id)

        // get one
        collection.findOne({_id : ObjectID(req.params.id)})
            .then(doc => res.send(200, doc))
            .catch(err => res.send(500, err))

        next()

    })
}