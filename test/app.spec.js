const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Testing out the Noteful server!"', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, 'Testing out the Noteful server!')
  })
})