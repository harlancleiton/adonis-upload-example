'use strict'

const Antl = use('Antl')

class Register {
  get rules() {
    return {
      first_name: 'required|string',
      last_name: 'required|string',
      email: 'required|email|unique:users',
      password: 'required',
      avatar: 'file|file_ext:png,jpg|file_size:2mb|file_types:image',
    }
  }

  get messages() {
    return Antl.list('validation')
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.status(400).send({ errors })
  }
}

module.exports = Register
