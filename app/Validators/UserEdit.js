'use strict'

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
}

module.exports = UserEdit
