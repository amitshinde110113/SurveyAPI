## SurveyAPI
# How to setup
 Clone the repo and go inside project folder and do `npm i` 
 
# How to run
`npm start`
  
# How to test
`npm test`
# How to use API
 
 # *********User Model **********
    

 ## login
 
    request- POST
    url:http://localhost:3000/users/login
    body: {
     "email":"amit.shinde@amdev.in",
     "password":"demo123"
     }
    
 ## Signup
    request- POST
    url:http://localhost:3000/users/signup
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
    url:http://localhost:3000/surveys/
    body: {
    "name":"Demo Survey"
    }
    
    
 ## Get All survey
    
    request- GET
    url:http://localhost:3000/surveys/
   
 ## Get survey by Id
    
    request- GET
    url:http://localhost:3000/surveys/60641a7c7d30385f10eaac6f
    
 ## Delete survey 
    
    request- DELETE
    url:http://localhost:3000/surveys/60641a7c7d30385f10eaac6f
    
    
    
        
 # *********Question Model ********** 
    Authorization header required for all request
    Authorization : `jwt ${token}`
    
 ## Create question
    
    request- POST
    url:http://localhost:3000/questions/
    body: {
    "question":"Rate yourself in java",
    "survey":"60641a7c7d30385f10eaac6f"
    }
    
    
    
 ## Get All questions
    
    request- GET
    url:http://localhost:3000/questions/
   
   
   
 ## Get question by Id
    
    request- GET
    url:http://localhost:3000/questions/60641a7c7d30385f10eaac6f
    
    
  ## Delete question
    
    request- DELETE
    url:http://localhost:3000/questions/60641a7c7d30385f10eaac6f
    
         
 #  *********SurveyResult Model ********** 
    Authorization header required for all request
    Authorization : `jwt ${token}`
    
    
 ## Create SurveyResult
    
    request- POST
    url:http://localhost:3000/results/
    body: {
    "question":"60641a7c7d30385f10eaac6f",
    "survey":"60641a7c7d30385f10eaac6f"
     "user":"60641a7c7d30385f10eaac6f",
     "rating":5
    }
    
    
 ## Get All SurveyResults
    
    request- GET
    url:http://localhost:3000/results/
   
   
 ## Get Survey Result by Id
    
    request- GET
    url:http://localhost:3000/results/60641a7c7d30385f10eaac6f
    
 
  ## Delete Survey Result
    
    request- DELETE
    url:http://localhost:3000/results/60641a7c7d30385f10eaac6f
    
    
    
    
