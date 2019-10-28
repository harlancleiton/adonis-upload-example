'use strict'

const { test, trait } = use('Test/Suite')('Register')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should return an new user when user register', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').make()

  const avatar = Helpers.appRoot('test/starter.jpg')

  const response = await client
    .post('/v1/auth/register')
    .attach('avatar', avatar)
    // .send({ ...user.toJSON(), password: 'password' })
    .field('first_name', user.first_name)
    .field('last_name', user.last_name)
    .field('email', user.email)
    .field('password', user.password)
    .end()

  response.assertStatus(201)
  assert.exists(response.body.data)
  assert.isUndefined(response.body.data.password)
})
