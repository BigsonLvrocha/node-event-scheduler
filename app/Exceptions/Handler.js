'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Youch = use('youch')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response, ...restArgs }) {
    switch (error.name) {
      case 'ValidationException':
        return response.status(error.status).send(error.messages)
      case 'ModelNotFoundException':
        return response.status(error.status).send({
          error: {
            message:
              "Looks like you are trying to do something to a thing that doesn't exists"
          }
        })
      case 'SaveException':
        return super.handle(error, { request, response, ...restArgs })
      case 'ForbiddenException':
        return super.handle(error, { request, response, ...restArgs })
      default:
        if (Env.get('NODE_ENV') === 'development') {
          const youch = new Youch(error, request.request)
          const errorJSON = await youch.toJSON()
          return response.status(error.status).send(errorJSON)
        }
        return response.status(error.status)
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {}
}

module.exports = ExceptionHandler
