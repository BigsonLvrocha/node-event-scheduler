'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['email', 'username', 'password'])
    const user = User.create(data)
    return user
  }

  async update ({ request, auth, params }) {
    const { user } = auth
    const username = request.input('username', user.username)
    const password = request.input('password', user.password)
    await auth.attempt(user.email, request.input('old_password'))
    user.merge({ username, password })
    user.save()
    return user
  }
}

module.exports = UserController
