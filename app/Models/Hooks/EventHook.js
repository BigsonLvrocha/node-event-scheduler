'use strict'

const EventHook = (exports = module.exports = {})
const Event = use('App/Models/Event')
const Moment = require('moment')
const SaveException = use('App/Exceptions/SaveException')

EventHook.checkEventsWithSameTime = async modelInstance => {
  const { time, id, user_id: userId } = modelInstance
  const eventsWithSameTimeQuery = Event.query()
    .where('time', time)
    .where('user_id', userId)
  if (id !== null && id !== undefined) {
    eventsWithSameTimeQuery.where('id', '!=', id)
  }
  const eventsWithSameTime = await eventsWithSameTimeQuery.count()
  if (eventsWithSameTime > 0) {
    throw new SaveException('There cannot be two events at the same time')
  }
}

EventHook.checkIsPastEvent = async eventInstance => {
  const { time } = eventInstance.$originalAttributes
  if (Moment().isAfter(time)) {
    throw new SaveException('You cannot update or delete an event from the past')
  }
}
