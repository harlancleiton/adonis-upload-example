'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class RegisterController {
  /**
   * Create/save a new user.
   * POST registers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { first_name, last_name, email, password } = request.all()

    const s3file = request.body.$uploads[0]
    const s_3_file_id = s3file ? s3file.s3File.id : null

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      s_3_file_id,
    })

    return response.created({ data: user })
  }
}

module.exports = RegisterController
