## SurveyAPI
# How to setup
 Clone the repo and go inside project folder and do `npm i` 
 
# How to run
`npm start`
  
# How to test
`npm test`

# Jenkins job configuration
   1. Add Git Webhook on GitHub goto `settings >> Webhooks >> Add Webhooks`
   2. Enter your Jenkins webhook URL 
   3. Select the `Push Event option` and Click on the `Add webhook`
   4. Configure ssh from manage jenkins
   5. In Jenkins job Select sourcecode management as `git`
   6. In Build Triggers select option `GitHub hook trigger for GITScm polling`
   7. Select configured ssh settings
   8. Add Build Step: `Execute Shell`
   9. Add following commands to execute shell
        `npm install`
        `npm test`
        `./deploy`
   10. Save 

# How to use API
 
 # *********User Model **********
    

 ## login
 
    request- POST
    url:http://localhost:3000/api/users/login
    body: {
     "email":"amit.shinde@amdev.in",
     "password":"demo123"
     }
    
 ## Signup
    request- POST
    url:http://localhost:3000/api/users/signup
    body: {
     "email":"amit.shinde@amdev.in",
     "password":"demo123",
     "name":"test"
     }
    
    
 # *********Survey Model ********** 
    Authorization header required for all request
    Authorization : `jwt ${token}`
    
 ##  Create survey
    
    request- POST
    url:http://localhost:3000/api/surveys/
    body: {
    "name":"Demo Survey"
    }
    
    
 ## Get All survey
    
    request- GET
    url:http://localhost:3000/api/surveys/
   
 ## Get survey by Id
    
    request- GET
    url:http://localhost:3000/api/surveys/60641a7c7d30385f10eaac6f
    
 ## Delete survey 
    
    request- DELETE
    url:http://localhost:3000/api/surveys/60641a7c7d30385f10eaac6f
    
    
    
        
 # *********Question Model ********** 
    Authorization header required for all request
    Authorization : `jwt ${token}`
    
 ## Create question
    
    request- POST
    url:http://localhost:3000/api/questions/
    body: {
    "question":"Rate yourself in java",
    "survey":"60641a7c7d30385f10eaac6f"
    }
    
    
    
 ## Get All questions
    
    request- GET
    url:http://localhost:3000/api/questions/
   
   
   
 ## Get question by Id
    
    request- GET
    url:http://localhost:3000/api/questions/60641a7c7d30385f10eaac6f
    
    
  ## Delete question
    
    request- DELETE
    url:http://localhost:3000/api/questions/60641a7c7d30385f10eaac6f
    
         
 #  *********SurveyResult Model ********** 
    Authorization header required for all request
    Authorization : `jwt ${token}`
    
    
 ## Create SurveyResult
    
    request- POST
    url:http://localhost:3000/api/results/
    body: {
    "question":"60641a7c7d30385f10eaac6f",
    "survey":"60641a7c7d30385f10eaac6f"
     "user":"60641a7c7d30385f10eaac6f",
     "rating":5
    }
    
    
 ## Get All SurveyResults
    
    request- GET
    url:http://localhost:3000/api/results/
   
   
 ## Get Survey Result by Id
    
    request- GET
    url:http://localhost:3000/api/results/60641a7c7d30385f10eaac6f
    
 
  ## Delete Survey Result
    
    request- DELETE
    url:http://localhost:3000/api/results/60641a7c7d30385f10eaac6f
    
    
    
    
