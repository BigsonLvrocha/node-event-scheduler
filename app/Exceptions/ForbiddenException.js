'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ForbiddenException extends LogicalException {
  handle (err, { response }) {
    return response.status(403).send({
      error: {
        message: err.message
      }
    })
  }
}

module.exports = ForbiddenException
