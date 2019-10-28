'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddS3FileToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      table
        .integer('s_3_file_id')
        .unsigned()
        .unique()
      table
        .foreign('s_3_file_id')
        .references('id')
        .inTable('s_3_files')
        .onDelete('set null')
    })
  }

  down() {
    this.table('users', table => {
      table.dropColumn('s_3_file_id')
    })
  }
}

module.exports = AddS3FileToUserSchema
