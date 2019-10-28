'use strict'

const { test, trait } = use('Test/Suite')('Register Validator')

trait('Test/ApiClient')

test('it should return a validation error', async ({ assert, client }) => {
  const response = await client
    .post('/v1/auth/register')
    .send({
      email: 'examplemail.com',
    })
    .end()

  response.assertStatus(400)
  assert.exists(response.body.errors)
})
