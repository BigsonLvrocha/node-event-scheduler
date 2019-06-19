'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class SaveException extends LogicalException {
  handle (err, { response }) {
    console.log('oi')
    return response.status(409).send({
      error: {
        message: err.message
      }
    })
  }
}

module.exports = SaveException
