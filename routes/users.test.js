const userRoutes = require('./users')

it('User routes should be defined', () => {
    expect(userRoutes).toBeDefined()
})

// it('Is should throw error', async () => {
//     await request(userRoutes)
//         .get('/users')
//         .expect(498)
// })