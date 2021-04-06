const app = require("./app");
const request = require("supertest");
const UserSchema = require("./api/data/models/userModel");
const QuestionSchema = require("./api/data/models/questionModel");
const SurveySchema = require("./api/data/models/surveyModel");
const SurveyResultsSchema = require("./api/data/models/surveyResults");
const questionRoutes = require("./api/routes/questions");
const surveyRoutes = require("./api/routes/survey");
const surveyResultRoutes = require("./api/routes/survey-result");
const userRoutes = require("./api/routes/users");
const mongoose = require("mongoose");
const checkAuth = require("./api/middleware/check-auth");
const checkAccess = require("./api/middleware/check-access");
const {
  createQuestion,
  deleteQuestion,
} = require("./api/data/managers/questionModelManager");
const {
  createSurvey,
  deleteSurvey,
} = require("./api/data/managers/surveyModelManager");

afterAll(async (done) => {
  // Closing the DB connection allows Jest to exit successfully.
  await UserSchema.findOneAndDelete({ email: "test@testing.com" });
  await UserSchema.findOneAndDelete({ email: "user@testing.com" });

  await QuestionSchema.findOneAndDelete({
    question: "How you rate youself in cloud ",
  });
  await SurveySchema.findOneAndDelete({ name: "My testing survey " });
  await SurveySchema.findOneAndDelete({ name: "My testing survey2 " });
  mongoose.connection.close();
  done();
});

describe("Checking initilization", () => {
  it("App should be defined", (done) => {
    expect(app).toBeDefined();
    done();
  });

  it("QuestionModel should be defined", (done) => {
    expect(QuestionSchema).toBeDefined();
    done();
  });
  it("Question routes should be defined", (done) => {
    expect(questionRoutes).toBeDefined();
    done();
  });

  it("Survey model should be defined", (done) => {
    expect(SurveySchema).toBeDefined();
    done();
  });

  it("Survey routes should be defined", (done) => {
    expect(surveyRoutes).toBeDefined();
    done();
  });

  it("SurveyResults should be defined", (done) => {
    expect(SurveyResultsSchema).toBeDefined();
    done();
  });
  it("Survey result routes should be defined", (done) => {
    expect(surveyResultRoutes).toBeDefined();
    done();
  });

  it("UserModel should be defined", (done) => {
    expect(UserSchema).toBeDefined();
    done();
  });
  it("User routes should be defined", (done) => {
    expect(userRoutes).toBeDefined();
    done();
  });
  it("Check-auth should be defined", (done) => {
    expect(checkAuth).toBeDefined();
    done();
  });
  it("Check-access should be defined", (done) => {
    expect(checkAccess).toBeDefined();
    done();
  });
});


describe("Allow requests without token", () => {
  it("Is should Signup for admin", async (done) => {
    await request(app)
      .post("/api/users/signup")
      .send({ password: "demo123", email: "test@testing.com", role: "ADMIN" })
      .expect(201);
    done();
  });
  it("Is should not Signup if email not unique", async (done) => {
    await request(app)
      .post("/api/users/signup")
      .send({ password: "demo123", email: "test@testing.com" })
      .expect(403);
    done();
  });
  it("Is should Signup for user", async (done) => {
    await request(app)
      .post("/api/users/signup")
      .send({ password: "demo123", email: "user@testing.com", role: "USER" })
      .expect(201);
    done();
  });
  it("Is should login", async (done) => {
    await request(app)
      .post("/api/users/login")
      .send({ password: "demo123", email: "test@testing.com" })
      .expect(200);
    done();
  });

  it("Is should not login if password wrong", async (done) => {
    await request(app)
      .post("/api/users/login")
      .send({ password: "demo124", email: "test@testing.com" })
      .expect(401);
    done();
  });
});

describe("Dont Allow requests without token ", () => {
  it("Is should not access surveys without token", async (done) => {
    await request(app).get("/api/surveys").send().expect(498);
    done();
  });

  it("Is should not access questions without token", async (done) => {
    await request(app).get("/api/questions").send().expect(498);
    done();
  });

  it("Is should not access results without token", async (done) => {
    await request(app).get("/api/results").send().expect(498);
    done();
  });
});


describe("Dont Allow requests with user token ", () => {
  let userToken = "";
  beforeAll(async (done) => {
    const user = await request(app)
      .post("/api/users/login")
      .send({ password: "demo123", email: "user@testing.com" });
    userToken = user.body.token;
    done();
  });
  it("Is should not access surveys without token", async (done) => {
    await request(app)
      .get("/api/surveys")
      .send()
      .set("Authorization", `jwt ${userToken}`)
      .expect(498);
    done();
  });

  it("Is should not access questions without token", async (done) => {
    await request(app)
      .get("/api/questions")
      .send()
      .set("Authorization", `jwt ${userToken}`)
      .expect(498);
    done();
  });

  it("Is should not access results without token", async (done) => {
    await request(app)
      .get("/api/results")
      .send()
      .set("Authorization", `jwt ${userToken}`)
      .expect(498);
    done();
  });
});

describe("Question CRUD ", () => {
  let adminToken = "";
  let question = {};
  let survey = {};
  beforeAll(async (done) => {
    const admin = await request(app)
      .post("/api/users/login")
      .send({ password: "demo123", email: "test@testing.com" });
    adminToken = admin.body.token;
    survey = await request(app)
      .post("/api/surveys/")
      .send({ name: "My testing survey2 " })
      .set("Authorization", `jwt ${adminToken}`);
    survey = await SurveySchema.findOne({ name: "My testing survey2 " });
    done();
  });

  it("Is should add question", async (done) => {
    question = await request(app)
      .post("/api/questions/")
      .send({ question: "How you rate youself in cloud ", survey: survey._id })
      .set("Authorization", `jwt ${adminToken}`)
      .expect(201);
    done();
  });
  it("Is should get questions", async (done) => {
    await request(app)
      .get("/api/questions/")
      .set("Authorization", `jwt ${adminToken}`)
      .expect(200);
    done();
  });
  it("Is should get one question", async (done) => {
    question = await createQuestion({
      question: "How you rate youself in cloud ",
      survey: survey._id,
    });

    await request(app)
      .get(`/api/questions/${question._id}`)
      .set("Authorization", `jwt ${adminToken}`)
      .expect(200);
    await deleteQuestion(question._id);
    done();
  });
  it("Is should update question", async (done) => {
    question = await createQuestion({
      question: "How you rate youself in cloud ",
      survey: survey._id,
    });

    await request(app)
      .put(`/api/questions/${question._id}`)
      .send({ question: "How you rate youself in cloud 2", survey: survey._id })
      .set("Authorization", `jwt ${adminToken}`)
      .expect(200);
    await deleteQuestion(question._id);

    done();
  });
  it("Is should delete question", async (done) => {
    question = await createQuestion({
      question: "How you rate youself in cloud ",
      survey: survey._id,
    });

    await request(app)
      .delete(`/api/questions/${question._id}`)
      .set("Authorization", `jwt ${adminToken}`)
      .expect(204);
    done();
  });
});
describe("Survey CRUD ", () => {
  let adminToken = "";
  let survey = {};
  beforeAll(async (done) => {
    const admin = await request(app)
      .post("/api/users/login")
      .send({ password: "demo123", email: "test@testing.com" });
    adminToken = admin.body.token;
    done();
  });

  it("Is should add survey", async (done) => {
    await request(app)
      .post("/api/surveys/")
      .send({ name: "My testing survey " })
      .set("Authorization", `jwt ${adminToken}`)
      .expect(201);
    done();
  });

  it("Is should get surveys", async (done) => {
    await request(app)
      .get("/api/surveys/")
      .set("Authorization", `jwt ${adminToken}`)
      .expect(200);
    done();
  });
  it("Is should get one survey", async (done) => {
    survey = await createSurvey({ name: "How you rate youself in cloud " });
    await request(app)
      .get(`/api/surveys/${survey._id}`)
      .set("Authorization", `jwt ${adminToken}`)
      .expect(200);
    await deleteSurvey(survey._id);
    done();
  });

  it("Is should update survey", async (done) => {
    survey = await createSurvey({ name: "How you rate youself in cloud " });

    await request(app)
      .put(`/api/surveys/${survey._id}`)
      .send({ name: "How you rate youself in cloud 2" })
      .set("Authorization", `jwt ${adminToken}`)
      .expect(200);
    await deleteSurvey(survey._id);

    done();
  });

  it("Is should delete survey", async (done) => {
    survey = await createSurvey({ name: "How you rate youself in cloudkjhjk " });
    await request(app)
      .delete(`/api/surveys/${survey._id}`)
      .set("Authorization", `jwt ${adminToken}`)
      .expect(204);
    done();
  });
});
