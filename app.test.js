const app = require('./app')
const request = require('supertest');
const UserSchema = require('./models/userModel');
const QuestionSchema = require('./models/questionModel');
const SurveySchema = require('./models/surveyModel');
const SurveyResultsSchema = require('./models/surveyResults')
const questionRoutes = require('./routes/questions')
const surveyRoutes = require('./routes/survey')
const surveyResultRoutes = require('./routes/survey-result')
const userRoutes = require('./routes/users')
const mongoose = require('mongoose')






beforeAll(async (done) => {
    await UserSchema.findOneAndDelete({ email: "test@testing.com" })
    await QuestionSchema.findOneAndDelete({ question: "How you rate youself in cloud " })
    await SurveySchema.findOneAndDelete({ name: "My testing survey " })
    await SurveySchema.findOneAndDelete({ name: "My testing survey2 " })

    done()
})


afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})

describe("Checking initilization", () => {
    it('App should be defined', () => {
        expect(app).toBeDefined()
    })

    it('QuestionModel should be defined', () => {
        expect(QuestionSchema).toBeDefined()
    })
    it('Question routes should be defined', () => {
        expect(questionRoutes).toBeDefined()
    })

    it('Survey model should be defined', () => {
        expect(SurveySchema).toBeDefined()
    })

    it('Survey routes should be defined', () => {
        expect(surveyRoutes).toBeDefined()
    })

    it('SurveyResults should be defined', () => {
        expect(SurveyResultsSchema).toBeDefined()
    })
    it('Survey result routes should be defined', () => {
        expect(surveyResultRoutes).toBeDefined()
    })

    it('UserModel should be defined', () => {
        expect(UserSchema).toBeDefined()
    })
    it('User routes should be defined', () => {
        expect(userRoutes).toBeDefined()
    })
});

describe("Requests without token", () => {
    it('Is should Signup', async () => {
        await request(app)
            .post('/users/signup').send({ password: "demo123", email: "test@testing.com" })
            .expect(201)
    })
    it('Is should not Signup if email not unique', async () => {
        await request(app)
            .post('/users/signup').send({ password: "demo123", email: "test@testing.com" })
            .expect(403)
    })
    it('Is should login', async () => {
        await request(app)
            .post('/users/login').send({ password: "demo123", email: "test@testing.com" })
            .expect(200)
    })

    it('Is should not login if password wrong', async () => {
        await request(app)
            .post('/users/login').send({ password: "demo124", email: "test@testing.com" })
            .expect(401)
    })
});

describe("Requests with token ", () => {

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
    it('Is should add survey', async () => {
        const user =  await request(app)
            .post('/users/login').send({ password: "demo123", email: "test@testing.com" })
        await request(app)
            .post('/surveys/').send({ name: "My testing survey " })
            .set('Authorization', `jwt ${user.body.token}`)
            .expect(201)
    })
    it('Is should add question', async () => {
        const user =  await request(app)
        .post('/users/login').send({ password: "demo123", email: "test@testing.com" })
        let survey = await request(app)
        .post('/surveys/').send({ name: "My testing survey2 " })
        .set('Authorization', `jwt ${user.body.token}`)
         survey = await SurveySchema.findOne({ name: "My testing survey2 " });
        await request(app)
            .post('/questions/').send({ question: "How you rate youself in cloud ", survey: survey._id })
            .set('Authorization', `jwt ${user.body.token}`)
            .expect(201)
    })
});






