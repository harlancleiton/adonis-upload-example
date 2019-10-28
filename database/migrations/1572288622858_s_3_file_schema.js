'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class S3FileSchema extends Schema {
  up() {
    this.create('s_3_files', table => {
      table.increments()
      table
        .string('key')
        .unique()
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('s_3_files')
  }
}

module.exports = S3FileSchema
