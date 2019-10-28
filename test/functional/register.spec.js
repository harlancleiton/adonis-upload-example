'use strict'

const { test, trait } = use('Test/Suite')('Register')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should return an new user when user register', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').make()

  const response = await client
    .post('/v1/auth/register')
    .send({ ...user.toJSON(), password: 'password' })
    .end()

  response.assertStatus(201)
  assert.exists(response.body.data)
  assert.isUndefined(response.body.data.password)
})
