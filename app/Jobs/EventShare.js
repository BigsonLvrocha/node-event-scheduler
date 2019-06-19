'use strict'

const Mail = use('Mail')

class EventShare {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'EventShare-job'
  }

  // This is where the work is done.
  async handle ({ user, event, email }) {
    await Mail.send(
      ['emails.eventshare'],
      {
        username: user.username,
        title: event.title,
        time: event.time,
        location: event.location
      },
      message => {
        message
          .to(email)
          .from(user.email, user.username)
          .subject('Um evento foi compartilhado com você')
      }
    )
    console.log('EventShare-job started')
  }
}

module.exports = EventShare
