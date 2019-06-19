'use strict'

const UserHook = (exports = module.exports = {})
const ForbiddenException = use('App/Excpetions/ForbiddenException')

UserHook.forbidChangeEmail = async userInstance => {
  if (userInstance.dirty.email) {
    throw new ForbiddenException('You cannot edit your email')
  }
}
