'use strict'

class Event {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'string|required',
      time: `date|required`,
      location: 'string|required'
    }
  }
}

module.exports = Event
