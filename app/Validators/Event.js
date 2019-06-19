'use strict'

const Antl = use('Antl')

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

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Event
