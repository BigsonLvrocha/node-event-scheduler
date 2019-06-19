'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class SameUserOnly {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ params, auth, response }, next) {
    // call next to advance the request
    if (auth.user.id !== Number(params.user_id)) {
      return response.status(401).send({
        error: {
          message: 'You cannot do this to someone else'
        }
      })
    }
    await next()
  }
}

module.exports = SameUserOnly
