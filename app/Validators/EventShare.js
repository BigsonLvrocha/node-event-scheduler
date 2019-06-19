'use strict'

class EventShare {
  get rules () {
    return {
      email: 'required|email'
    }
  }
}

module.exports = EventShare
