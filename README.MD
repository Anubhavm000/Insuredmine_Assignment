"# Insuredmine_Assignment" 

1. Clone the project using command in command prompt if git is already setup
  `git clone https://github.com/Anubhavm000/Insuredmine_Assignment.git`
2. Go inside the folder and run below command to install the dependencies
   `npm install`
3. Now start the project using:
  node app.js
4. TASK- 1
    1. Upload CSV file API
        POST API for Uploading csv - "http://localhost:3000/api/upload"
        Go to the "Body" and select "form-data" and inside it add the "key" with name file and select file instead of text in "key" and in the "value" column upload the stored in the                "uploads" folder in the project directory.  
    2. Search API to find policy info with the help of the username
        GET API for searching - "http://localhost:3000/api/policies/search/:userName"
    3. API to provide aggregated policy by each user
        GET API to retrieve aggregate - "http://localhost:3000/api/policies/aggregate" 
    4. Consider each info as a different collection in MongoDB (Agent, User, User's Account, LOB, Carrier, Policy). 
        In MongoDB, there are 6 collections created under the Database named policyDB
5. TASK-2

     1.Track real-time CPU utilization of the node server and on 70% usage restart the server.
      In the console you could see the logs after every 5 secoond for the CPU uasge.
      For restarting the server when usage is greate than 70%
      Stop the server and run command 
      pm2 app.js

    2. Create a post-service that takes the message, day, and time in body parameters and it inserts that message into DB at that particular day and time.
        POST API for scheduling message - "http://localhost:3000/api/messages/schedule"
        In Postman, go to Body and select "raw" and choose JSON in the last dropdown.
        and pass this data : 
                              {
                                "message": "YOUR_MESSAGE",
                                "day": "DATE",
                                "time": "TIME in 24 hrs format"
                              }
