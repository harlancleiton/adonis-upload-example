'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class S3File extends Model {
  static boot() {
    super.boot()

    this.addHook('afterFind', 'S3FileHook.getUrl')
  }
}

module.exports = S3File
