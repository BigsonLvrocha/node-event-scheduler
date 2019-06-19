'use strict'

const Event = use('App/Models/Event')
const Kue = use('Kue')
const Job = use('App/Jobs/EventShare')

class EventShareController {
  async store ({ request, auth, params, response }) {
    const event = await Event.findOrFail(params.id)
    if (event.user_id !== auth.user.id) {
      return response.status(403).send({
        error: {
          message: "You cannot share another user's event"
        }
      })
    }
    Kue.dispatch(Job.key, {
      user: auth.user,
      email: request.input('email'),
      event
    })
  }
}

module.exports = EventShareController
