link of deployed website:

for rating:
https://frozen-ravine-40047.herokuapp.com/

for finding Aggregated rating
https://frozen-ravine-40047.herokuapp.com/Aggregatedrating


Github Link: https://github.com/vishalka98/Rating-System/tree/master

for checking cummulative rating 
0 - if you are driver,
1 - if you are customer



Step to run project"
  - clone repository
  - npm install
  - node server.js
  
  
database Schema:


const ratingSchema = {

    username: {
        type: String,
        required: true,
       unique: true
    },
    ratingCount:  {
        type: Number,
        required: true,
    },
    totalRating: {
        type: Number,
        required: true,
    }
      
}

*database is deployed at mongodb-Atlas

in this database ,2 collection (customerrating and driverrating)

Assumption:

user is not authenticated so we don't have username of customer and  driver
so manually enter the username of whom user is rating either customer or driver.

if user is rating to driver then input 0 in input field of rated to similarly 1 if driver is rating to customer
in second field input the username of whomw you rating
in third fild enter the rating out of 5


Approch:

Created 2 separate collectioin for store rating of customer and driver seperatly.
ignoring that user can't check who gives rating. Added a filed whom you rating according to that data will store in that collection and at time of fetch user can simply fetch data.



