'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/user', 'UserController.store').validator('User')
Route.post('/session', 'SessionController.store').validator('Session')
Route.group(() => {
  Route.patch('/user/:user_id', 'UserController.update').validator('UserEdit')
  Route.resource('user.event', 'EventController').validator(
    new Map([
      [['user.event.store', 'user.event.update'], ['Event']],
      [['user.event.index'], ['EventQuery']]
    ])
  )
  Route.post(
    '/user/:user_id/event/:id/share',
    'EventShareController.store'
  ).validator('EventShare')
}).middleware('auth', 'sameUserOnly')
