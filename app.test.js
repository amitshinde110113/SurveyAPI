const app = require('./app')
const request = require('supertest');
const UserSchema = require('./models/userModel');
const QuestionSchema = require('./models/questionModel');
const SurveySchema = require('./models/surveyModel');




beforeAll(async () => {
    await UserSchema.findOneAndDelete({ email: "test@testing.com" })
    await QuestionSchema.findOneAndDelete({ question: "How you rate youself in cloud " })
})

describe("General", () => {
    it('App should be defined', () => {
        expect(app).toBeDefined()
    })
});
describe("Requests with token", () => {

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

    it('Is should add question', async () => {
        const survey = await SurveySchema.findOne();
        await request(app)
            .post('/questions/').send({ question: "How you rate youself in cloud ", survey: survey._id })
            .set('Authorization', 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtaXQuc2hpbmRlQGFtZGV2LmluIiwidXNlcklEIjoiNjA2NDE4NDM5NDg1M2Q1YWVlZjIwZDdmIiwiaWF0IjoxNjE3MTcyNjI2LCJleHAiOjE2MTcyNTkwMjZ9.KErjR-2uBCsIEtnmZ3a5nEKaLRwZwTN9v_278t8cPiI')
            .expect(201)
    })
});



describe("Requests without token", () => {
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
});


