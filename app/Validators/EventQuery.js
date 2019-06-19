'use strict'

const Antl = use('Antl')
class EventQuery {
  get rules () {
    return {
      date: 'required|date|dateFormat:YYYY-MM-DD'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = EventQuery
