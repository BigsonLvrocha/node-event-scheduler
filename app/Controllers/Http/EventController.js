'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event')
/**
 * Resourceful controller for interacting with events
 */
class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, params }) {
    const { date } = request.get()
    console.log(date)
    const events = await Event.query()
      .whereRaw('DATE(time) = ?', date)
      .where('user_id', params.user_id)
      .fetch()
    return events
  }

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params }) {
    const data = request.only(['title', 'location', 'time'])
    try {
      const event = await Event.create({
        ...data,
        user_id: params.user_id
      })
      return event
    } catch (err) {
      if (err.name === 'SaveException') {
        return response.status(err.status).send({
          error: {
            message: err.message
          }
        })
      } else {
        throw err
      }
    }
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    const event = await Event.findOrFail(params.id)
    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'You cannot see others event'
        }
      })
    }
    await event.load('user')
    return event
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const event = await Event.findOrFail(params.id)
    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'You cannot see others event'
        }
      })
    }
    try {
      const data = request.only(['title', 'time', 'location'])
      event.merge(data)
      await event.save()
      return event
    } catch (err) {
      console.log('oi')
      if (err.name === 'SaveException') {
        return response.status(err.status).send({
          error: {
            message: err.message
          }
        })
      } else {
        throw err
      }
    }
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const event = await Event.findOrFail(params.id)
    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'You cannot see others event'
        }
      })
    }
    await event.delete()
  }
}

module.exports = EventController
