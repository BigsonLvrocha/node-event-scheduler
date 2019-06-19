'use strict'

class EventQuery {
  get rules () {
    return {
      date: 'required|date|dateFormat:YYYY-MM-DD'
    }
  }
}

module.exports = EventQuery
