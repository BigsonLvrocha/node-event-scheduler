'use strict'

const Antl = use('Antl')
class UserEdit {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      old_password: 'required',
      password: 'confirmed'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserEdit
