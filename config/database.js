'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

/** @type Import ClearDB URL parser for Heroku hosting */
const Url = require('url-parse')
const CLEARDB_ONYX_URL = new Url(Env.get('CLEARDB_ONYX_URL')) 

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',

    // Holding onto this object as it was here when the project worked locally.
    // This was here before I posted to Heroku.
    // connection: {
    //   host: Env.get('DB_HOST', 'localhost'),
    //   port: Env.get('DB_PORT', ''),
    //   user: Env.get('DB_USER', 'root'),
    //   password: Env.get('DB_PASSWORD', ''),
    //   database: Env.get('DB_DATABASE', 'adonis')
    // }

    // New connection object for Heroku
    // Env should look for this 
    connection: {
      host: Env.get('DB_HOST', CLEARDB_ONYX_URL.host),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', CLEARDB_ONYX_URL.username),
      password: Env.get('DB_PASSWORD', CLEARDB_ONYX_URL.password),
      database: Env.get('DB_DATABASE', CLEARDB_ONYX_URL.pathname.substr(1))
    }
  }, 

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    }
  }
}
