/**
 * Created by bmincey on 6/16/17.
 *
 * Currently pointing to database on MongoDB Atlas
 */

'use strict'

module.exports = {

    name : 'rest-api',
    version : '0.0.1',
    env : process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3000,
    db : {
        uri : 'mongodb://<USERNAME>:<PASSWORD>@cluster0-shard-00-00-ymnbm.mongodb.net:27017,cluster0-shard-00-01-ymnbm.mongodb.net:27017,cluster0-shard-00-02-ymnbm.mongodb.net:27017/<DATABASENAME>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
    }

}
