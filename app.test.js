const app = require('./app')
const request = require('supertest');
const UerSchema = require('./models/userModel');


afterAll(() => {
    UerSchema.findOneAndDelete({ email: "test@testing.com" })
})
it('App should be defined', () => {
    expect(app).toBeDefined()
})



it('Is should not access surveys without token', async () => {
    await request(app)
        .get('/surveys').send()
        .expect(498)
})

it('Is should not access questions without token', async () => {
    await request(app)
        .get('/questions').send()
        .expect(498)
})

it('Is should not access results without token', async () => {
    await request(app)
        .get('/results').send()
        .expect(498)
})

it('Is should Signup', async () => {
    await request(app)
        .post('/users/signup').send({ password: "demo123", email: "test@testing.com" })
        .expect(201)
})
it('Is should login', async () => {
    await request(app)
        .post('/users/login').send({ password: "demo123", email: "test@testing.com" })
        .expect(200)
})
it('Is should not login', async () => {
    await request(app)
        .post('/users/login').send({ password: "demo124", email: "test@testing.com" })
        .expect(401)
})