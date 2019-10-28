'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')
const Drive = use('Drive')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const S3File = use('App/Models/S3File')

class S3Service {
  async getSignedUrl(key) {
    return Drive.disk('s3').getSignedUrl(key)
  }

  async putFile(file) {
    try {
      const filename = `${(await Hash.make(file.clientName)).replace(
        /[^a-zA-Z0-9]/g,
        ''
      )}.${file.extname}`

      const tmpPath = Helpers.tmpPath('uploads')
      await file.move(tmpPath, { name: filename })

      const stream = Drive.disk('local').getStream(`${tmpPath}/${filename}`)
      await Drive.disk('s3').put(filename, stream)
      await Drive.disk('local').delete(`${tmpPath}/${filename}`)

      const s3file = await S3File.create({ key: filename })
      await s3file.reload()
      return s3file
    } catch (e) {
      // TODO S3Exception
      throw new Error('S3 PutFile failed')
    }
  }
}

module.exports = S3Service
