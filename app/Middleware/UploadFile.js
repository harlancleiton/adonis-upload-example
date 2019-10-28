'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const S3 = use('App/Services/S3')

class UploadFile {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next, args) {
    const files = []
    args.forEach(filename => {
      const file = request.file(filename)
      if (file) files.push(file)
    })

    const s3 = new S3()
    request.body.$uploads = []
    await Promise.all(
      await files.map(async file => {
        const s3File = await s3.putFile(file)
        request.body.$uploads.push({ name: file.fieldName, s3File })
      })
    )

    // call next to advance the request
    await next()
  }
}

module.exports = UploadFile
