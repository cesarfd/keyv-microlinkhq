'use strict'

const KeyvSql = require('@keyvhq/sql')
const mysql = require('mysql2/promise')

class KeyvMysql extends KeyvSql {
  constructor (uri, options) {
    uri = uri || {}
    if (typeof uri === 'string') {
      uri = { uri }
    }

    if (uri.uri) {
      uri = Object.assign({ uri: uri.uri }, uri)
    }

    options = Object.assign(
      {
        dialect: 'mysql',
        uri: 'mysql://localhost'
      },
      uri,
      options
    )

    options.connect = () =>
      Promise.resolve()
        .then(() => mysql.createConnection(options.uri))
        .then(connection => {
          return sql => connection.execute(sql).then(data => data[0])
        })

    super(options)
  }
}

module.exports = KeyvMysql
