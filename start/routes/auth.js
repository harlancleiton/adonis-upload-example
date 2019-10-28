'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('register', 'RegisterController.store')
    .as('auth.register')
    .middleware(['upload:avatar'])
  // TODO validator
  // .validator('Auth/Register')
})
  .namespace('Auth')
  .prefix('v1/auth')
